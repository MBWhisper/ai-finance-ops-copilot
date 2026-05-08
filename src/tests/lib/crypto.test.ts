import { describe, it, expect } from "vitest";

describe("crypto.encrypt/decrypt", () => {
  it("round-trips a string", async () => {
    process.env.ENCRYPTION_KEY = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    const { encrypt, decrypt } = await import("@/lib/crypto");
    const original = "sk_test_abc123";
    const encrypted = encrypt(original);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(original);
  });

  it("produces different ciphertexts for same plaintext", async () => {
    process.env.ENCRYPTION_KEY = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    const { encrypt } = await import("@/lib/crypto");
    const e1 = encrypt("same_key");
    const e2 = encrypt("same_key");
    expect(e1).not.toBe(e2);
  });

  it("includes IV and auth tag in ciphertext", async () => {
    process.env.ENCRYPTION_KEY = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    const { encrypt } = await import("@/lib/crypto");
    const encrypted = encrypt("test");
    const parts = encrypted.split(":");
    expect(parts).toHaveLength(3);
  });
});
