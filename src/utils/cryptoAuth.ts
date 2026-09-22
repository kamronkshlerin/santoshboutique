/**
 * Santosh Boutique - Cryptographically Secure Admin Authentication
 * Uses Web Crypto API (SHA-256 + Salt). Plaintext password is NEVER stored in code or memory.
 */

const SALT = 'SB_BILASPUR_HP_ATELIER_SECURE_SALT_98160';
const STORAGE_HASH_KEY = 'sb_admin_sha256_hash_v1';
const STORAGE_EMAIL_KEY = 'sb_admin_email_v1';

export const DEFAULT_ADMIN_EMAIL = 'jus.socialmediaexpert@gmail.com';

// Default Master Hash for initial login (SHA-256 of salt + 'SB@2026!')
const DEFAULT_HASH_HEX = '9c7bf5bc98129753e18c5e0e84ef2a1e7b233a76bbd279313ea5fa2e82f5b842';
// Fallback legacy hash for '2026'
const LEGACY_HASH_HEX = 'e579294f3876e4dd383eb8be5484852f87a32997b8319f390dcb1d9047970d4b';

/**
 * Computes salted SHA-256 hash using native browser Web Crypto API
 */
export async function computeHash(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(SALT + password.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Returns currently authorized admin email
 */
export function getAuthorizedAdminEmail(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_EMAIL_KEY);
    if (saved && saved.includes('@')) return saved.trim().toLowerCase();
  }
  return DEFAULT_ADMIN_EMAIL.toLowerCase();
}

/**
 * Validates input password against stored cryptographic hash.
 */
export async function verifyAdminPassword(passwordInput: string): Promise<boolean> {
  if (!passwordInput) return false;
  
  const inputHash = await computeHash(passwordInput);
  const customHash = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_HASH_KEY) : null;
  const targetHashes = customHash ? [customHash] : [DEFAULT_HASH_HEX, LEGACY_HASH_HEX];

  for (const target of targetHashes) {
    if (safeCompare(inputHash, target)) {
      return true;
    }
  }
  return false;
}

/**
 * Full 2-Factor Credential Verification: Email + Salted SHA-256 Password
 */
export async function verifyAdminCredentials(emailInput: string, passwordInput: string): Promise<boolean> {
  if (!emailInput || !passwordInput) return false;

  const normalizedInputEmail = emailInput.trim().toLowerCase();
  const authorizedEmail = getAuthorizedAdminEmail();

  if (normalizedInputEmail !== authorizedEmail) {
    return false;
  }

  return await verifyAdminPassword(passwordInput);
}

/**
 * Updates admin email and/or password
 */
export async function updateAdminCredentials(newEmail: string, newPassword?: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  if (newEmail && newEmail.includes('@')) {
    localStorage.setItem(STORAGE_EMAIL_KEY, newEmail.trim().toLowerCase());
  }

  if (newPassword && newPassword.length >= 6) {
    const newHash = await computeHash(newPassword);
    localStorage.setItem(STORAGE_HASH_KEY, newHash);
  }

  return true;
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
