import { redirect } from 'next/navigation';

/**
 * /signup → redirects to /register
 * Keeps both URLs working so external links and Vercel bot don't 404.
 */
export default function SignupPage() {
  redirect('/register');
}
