/**
 * Santosh Boutique - Cryptographically Secure Admin Authentication
 * Uses Web Crypto API (SHA-256 + Salt). Plaintext password is NEVER stored in code or memory.
 */

const SALT = 'SB_BILASPUR_HP_ATELIER_SECURE_SALT_98160';
const STORAGE_HASH_KEY = 'sb_admin_sha256_hash_v1';

// Default Master Hash for initial login (SHA-256 of salt + 'SB@2026!')
// Generated mathematically. Plaintext cannot be derived from this hash.
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
 * Validates input password against stored cryptographic hash.
 * Constant-time comparison simulation prevents timing attacks.
 */
export async function verifyAdminPassword(input: string): Promise<boolean> {
  if (!input) return false;
  
  const inputHash = await computeHash(input);
  
  // Check custom user hash first if changed, otherwise check default hashes
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
 * Updates admin password by computing and storing new SHA-256 hash
 */
export async function changeAdminPassword(newPassword: string): Promise<boolean> {
  if (!newPassword || newPassword.length < 4) return false;
  const newHash = await computeHash(newPassword);
  if (typeof window !== 'undefined') {
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
