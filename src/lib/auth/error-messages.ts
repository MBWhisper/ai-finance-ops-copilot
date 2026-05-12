/**
 * Maps Supabase auth error codes and messages to user-friendly, consistent messages.
 *
 * These are called during signup, login, and magic link flows.
 * Each returns a string safe to display directly in the UI.
 */

export function mapAuthError(
  error: { code?: string; message?: string; status?: number } | null
): string {
  if (!error) return ""

  const code = error.code?.toLowerCase() ?? ""
  const msg = error.message?.toLowerCase() ?? ""
  const status = error.status

  // ---- SignUp errors ----
  if (code === "user_already_exists" || msg.includes("already registered") || msg.includes("already exists")) {
    return "An account with this email already exists. Try signing in instead."
  }
  if (msg.includes("email") && (msg.includes("smtp") || msg.includes("send") || msg.includes("provider"))) {
    return "Account created! Please check your spam folder for the confirmation email. (We had trouble sending the email — you can also try the magic link below.)"
  }
  if (code === "signup_disabled" || msg.includes("signups") || msg.includes("disabled")) {
    return "Registration is temporarily unavailable. Please try again later."
  }
  if (msg.includes("rate limit") || msg.includes("too many") || status === 429) {
    return "Too many attempts. Please wait a few minutes and try again."
  }
  if (msg.includes("weak password") || msg.includes("password")) {
    return "Password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols."
  }

  // ---- SignIn errors ----
  if (code === "invalid_credentials" || msg.includes("invalid login credentials")) {
    return "Email or password is incorrect."
  }
  if (code === "email_not_confirmed" || msg.includes("email not confirmed") || msg.includes("email not verified")) {
    return "Please confirm your email before signing in. Check your inbox (and spam folder) for the confirmation link."
  }

  // ---- General / fallback ----
  return msg.charAt(0).toUpperCase() + msg.slice(1) || "An unexpected error occurred. Please try again."
}

/**
 * Returns a user-friendly heading / title for auth states.
 */
export function authStateLabel(state: string): string {
  const labels: Record<string, string> = {
    confirm_email: "Check your email",
    signed_in: "Welcome!",
    signing_in: "Signing in...",
    register_error: "Could not create account",
    login_error: "Could not sign in",
  }
  return labels[state] ?? state
}
