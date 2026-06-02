# Information Security Policy
**AI Finance Ops — aifinanceops.app**
*Version 1.0 | Effective Date: June 02, 2026*
*Owner: security@aifinanceops.app*

---

## 1. Purpose

This policy establishes the security framework for AI Finance Ops to protect consumer financial data, ensure system integrity, and maintain compliance with applicable regulations including Plaid's security requirements.

---

## 2. Scope

This policy applies to all systems, personnel, contractors, and third-party services that access, store, process, or transmit consumer data on behalf of AI Finance Ops.

---

## 3. Governance & Accountability

- The Founder/CEO serves as the primary information security officer.
- Security incidents are reported to: security@aifinanceops.app
- This policy is reviewed annually or after any significant security incident.
- All contractors and vendors must agree to this policy before accessing production systems.

---

## 4. Identity & Access Management

### 4.1 Access Controls
- Access to production systems is granted on a **least-privilege** basis.
- Each team member has a unique account — no shared credentials are permitted.
- Access is revoked immediately upon termination or role change.
- Role-based access control (RBAC) is enforced across all systems.

### 4.2 Multi-Factor Authentication (MFA)
- MFA is **mandatory** for all access to:
  - Vercel (hosting & deployments)
  - Supabase (database & auth)
  - GitHub (source code)
  - AWS / cloud infrastructure (if applicable)
- Consumer-facing MFA is available and encouraged for all users.

### 4.3 Password Policy
- Minimum 12 characters, mixed case, numbers, and symbols.
- Passwords are never stored in plaintext — bcrypt hashing is enforced.
- Credentials are never committed to source code repositories.

---

## 5. Infrastructure & Network Security

### 5.1 Data in Transit
- All data transmitted between clients and servers uses **TLS 1.2 or higher**.
- HTTPS is enforced on all endpoints via Vercel's automatic SSL/TLS.
- HTTP connections are permanently redirected to HTTPS.

### 5.2 Data at Rest
- Consumer financial data is encrypted at rest using **AES-256** via Supabase.
- Database backups are encrypted and stored securely.
- Plaid tokens and API keys are stored as encrypted environment variables — never in source code.

### 5.3 Network Segmentation
- Production and development environments are fully separated.
- Database access is restricted to application servers only — no public database exposure.

---

## 6. Development & Vulnerability Management

### 6.1 Secure Development Practices
- Code changes require review before merging to the main branch.
- Sensitive data (API keys, secrets) is managed via environment variables (Vercel).
- Dependency vulnerabilities are monitored via **GitHub Dependabot** and `npm audit`.

### 6.2 Vulnerability Scanning
- Automated dependency scans run on every pull request.
- Critical vulnerabilities are patched within **72 hours** of discovery.
- High vulnerabilities are patched within **7 days**.

### 6.3 Incident Response
- Security incidents are logged and investigated within **24 hours**.
- Affected users are notified within **72 hours** of a confirmed data breach.
- Plaid is notified immediately of any breach involving Plaid-sourced data.

---

## 7. Third-Party Risk Management

All third-party integrations (Plaid, PayPal, LemonSqueezy, Supabase) are evaluated for:
- SOC 2 Type II compliance or equivalent
- Encryption standards
- Data processing agreements (DPA)

---

## 8. Data Classification

| Classification | Examples | Controls |
|---|---|---|
| **Confidential** | API keys, Plaid tokens, passwords | Encrypted storage, restricted access |
| **Sensitive** | Financial data, user PII | Encrypted at rest and in transit |
| **Internal** | Logs, analytics | Access-controlled |
| **Public** | Marketing content | No restriction |

---

## 9. Compliance

AI Finance Ops operates in accordance with:
- **Plaid Developer Policy**
- **GDPR** (EU users)
- **CCPA** (California users)
- **PCI DSS** principles (no raw card data stored)

---

## 10. Policy Review

This policy is reviewed and updated:
- Annually (minimum)
- After any significant security incident
- When new regulations or Plaid requirements apply

*Last reviewed: June 02, 2026*
*Next review: June 02, 2027*
