import { vi, describe, it, expect } from "vitest";

vi.hoisted(() => {
  process.env.ENCRYPTION_KEY = "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789";
});

import { encrypt, decrypt } from "@/lib/crypto";

describe("crypto", () => {
  it("encrypts and decrypts a string", () => {
    const original = "sk_test_abc123def456";
    const encrypted = encrypt(original);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(original);
  });

  it("produces different ciphertexts for same input", () => {
    const input = "sk_test_same";
    const a = encrypt(input);
    const b = encrypt(input);
    expect(a).not.toBe(b);
  });

  it("decrypts to original empty string", () => {
    const original = "";
    const encrypted = encrypt(original);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(original);
  });
});
