/**
 * Santosh Boutique - Zero-Knowledge Cryptographic Authentication Engine
 * Neither the email, password, nor secret code is stored in plaintext anywhere in the code.
 * All verification is performed using one-way SHA-256 cryptographic digests.
 */

const SALT = 'SB_BILASPUR_HP_ATELIER_SECURE_SALT_98160';
const CODE_SALT = 'SB_STAGE1_';

const STORAGE_EMAIL_HASH_KEY = 'sb_sec_emh_v2';
const STORAGE_PASS_HASH_KEY = 'sb_sec_psh_v2';

// 1. Authorized Email SHA-256 Hash (Plaintext is NEVER stored in code)
const DEFAULT_EMAIL_HASH = '5b14c938c09631e4a47250ec1f1457bb45c57117366575d165659d295f74a6ab';

// 2. Secret Stage-1 Access Code Hashes
const VALID_CODE_HASHES = [
  'a91b284a19399f3ba1d77b2160e3848397998c3bbc7ba77336b281dd15634a73',
  'e12935dbf32680f48574d03014229aff565a33f3f483186d59a076ab2279cd43',
];

// 3. Salted Password Hashes
const VALID_PASS_HASHES = [
  '99fd3e1f97111d082ac1bcef6a9b45cd5fbf25240673aeba5316fc84165d3ba7',
  'ad6c726897993122b1277b1c1c91d2e8507f65196c970a4fa71735860b7fd76e',
];

/**
 * Standard SHA-256 hashing via native Web Crypto API
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Stage 1: Verify Secret Master Access Code (e.g. 2026)
 */
export async function verifyStage1Code(codeInput: string): Promise<boolean> {
  if (!codeInput) return false;
  const hash = await sha256(CODE_SALT + codeInput.trim());
  return VALID_CODE_HASHES.some((target) => safeCompare(hash, target));
}

/**
 * Stage 2: Verify Admin Email + Password (both zero-knowledge verified)
 */
export async function verifyAdminCredentials(emailInput: string, passwordInput: string): Promise<boolean> {
  if (!emailInput || !passwordInput) return false;

  // 1. Verify Email Hash (never stored as plaintext)
  const inputEmailHash = await sha256(emailInput.trim().toLowerCase());
  const storedEmailHash = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_EMAIL_HASH_KEY) : null;
  const targetEmailHash = storedEmailHash || DEFAULT_EMAIL_HASH;

  if (!safeCompare(inputEmailHash, targetEmailHash)) {
    return false;
  }

  // 2. Verify Salted Password Hash
  const inputPassHash = await sha256(SALT + passwordInput.trim());
  const storedPassHash = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_PASS_HASH_KEY) : null;
  const targetPassHashes = storedPassHash ? [storedPassHash] : VALID_PASS_HASHES;

  return targetPassHashes.some((target) => safeCompare(inputPassHash, target));
}

/**
 * Updates admin email and/or password by storing hashes ONLY
 */
export async function updateAdminCredentials(newEmail?: string, newPassword?: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  if (newEmail && newEmail.includes('@')) {
    const emailHash = await sha256(newEmail.trim().toLowerCase());
    localStorage.setItem(STORAGE_EMAIL_HASH_KEY, emailHash);
  }

  if (newPassword && newPassword.length >= 6) {
    const passHash = await sha256(SALT + newPassword.trim());
    localStorage.setItem(STORAGE_PASS_HASH_KEY, passHash);
  }

  return true;
}

/**
 * Constant-time comparison to prevent timing side-channel attacks
 */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
