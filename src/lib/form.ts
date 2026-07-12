/**
 * The contact form has no backend, because the site has no backend — it's a
 * static export. Submissions go to Web3Forms, which takes a POST and emails it
 * to you. Free, no server, works on any static host.
 *
 * SETUP (2 minutes):
 *   1. Go to https://web3forms.com — enter your email, they send you an
 *      access key. No account, no password.
 *   2. Put the key in `.env.local` for local dev:
 *          NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
 *   3. On Render: Dashboard → your service → Environment → add the same
 *      variable, then redeploy.
 *
 * Until a key is set the form still renders and validates, but tells the visitor
 * to email directly rather than silently swallowing their message — a contact
 * form that quietly drops enquiries is worse than no contact form.
 */

export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const isFormConfigured = WEB3FORMS_KEY.length > 0;

export const PROJECT_TYPES = [
  "Backend / API development",
  "AI or LLM pipeline",
  "Data pipeline / scraping",
  "AI voice agent",
  "Automation workflow",
  "Full-time role",
  "Something else",
] as const;

export type FormValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;

/**
 * Validation is deliberately forgiving: a required name, an email that looks
 * like an email, and a message with something actually in it. Anything stricter
 * on a contact form just loses you leads.
 */
export function validate(v: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!v.name.trim()) errors.name = "Please tell me your name.";

  const email = v.email.trim();
  if (!email) errors.email = "I need an email to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "That doesn't look like a valid email.";

  const message = v.message.trim();
  if (!message) errors.message = "Tell me a bit about what you need.";
  else if (message.length < 10) errors.message = "A little more detail would help.";

  return errors;
}
