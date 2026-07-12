"use client";

import { useId, useRef, useState } from "react";
import {
  PROJECT_TYPES,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_KEY,
  isFormConfigured,
  validate,
  type FormErrors,
  type FormValues,
} from "@/lib/form";
import { profile } from "@/content/resume";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: FormValues = { name: "", email: "", company: "", projectType: "", message: "" };

const field =
  "w-full rounded-md border bg-[var(--card)] px-4 py-3 text-[0.9375rem] text-[var(--ink)] outline-none transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)]";

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");

  /* Honeypot. A real person never sees this field, so anything that fills it in
     is a bot — and we drop it silently rather than telling it why. */
  const trap = useRef<HTMLInputElement>(null);

  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;

  const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    if (trap.current?.value) {
      setStatus("sent"); // a bot: let it think it worked, send nothing
      return;
    }

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Focus the first thing that's wrong. Nobody should have to hunt for it.
      const first = (["name", "email", "message"] as const).find((k) => found[k]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }

    if (!isFormConfigured) {
      setStatus("error");
      setFailure(
        "This form isn't connected to an inbox yet. Please email me directly — I'll reply the same day.",
      );
      return;
    }

    setStatus("sending");
    setFailure("");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio enquiry — ${values.name}`,
          from_name: "Portfolio contact form",
          name: values.name,
          email: values.email,
          company: values.company || "—",
          project_type: values.projectType || "—",
          message: values.message,
        }),
      });

      const data: unknown = await res.json();
      const ok = res.ok && typeof data === "object" && data !== null && "success" in data && Boolean((data as { success: unknown }).success);

      if (!ok) throw new Error("The form service rejected the submission.");

      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
      setFailure(
        "Something went wrong sending that. Please email me directly and it'll get through.",
      );
    }
  }

  /* The success state replaces the form rather than sitting above it. Leaving a
     filled-in form on screen after a successful send just invites a double-send. */
  if (status === "sent") {
    return (
      <div
        role="status"
        className="card flex flex-col items-start gap-4 p-8 md:p-10"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xl text-[var(--accent-deep)]">
          ✓
        </span>
        <h3 className="display text-2xl text-[var(--ink)]">Message sent.</h3>
        <p className="t-body">
          Thanks — I&apos;ve got it, and I&apos;ll get back to you shortly. If it&apos;s urgent,{" "}
          <a href={`mailto:${profile.email}`} className="link">
            email me directly
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-[var(--accent)] transition-opacity duration-300 hover:opacity-70"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-8 md:p-10">
      {/* honeypot — off-screen, not display:none (some bots skip hidden fields) */}
      <input
        ref={trap}
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={id("name")}
          label="Name"
          required
          error={errors.name}
          value={values.name}
          onChange={set("name")}
          autoComplete="name"
          placeholder="Your name"
        />
        <Field
          id={id("email")}
          label="Email"
          required
          type="email"
          error={errors.email}
          value={values.email}
          onChange={set("email")}
          autoComplete="email"
          placeholder="you@company.com"
        />
        <Field
          id={id("company")}
          label="Company"
          optional
          value={values.company}
          onChange={set("company")}
          autoComplete="organization"
          placeholder="Where you work"
        />

        <div className="flex flex-col gap-2">
          <Label htmlFor={id("projectType")} optional>
            What&apos;s this about?
          </Label>
          <select
            id={id("projectType")}
            name="projectType"
            value={values.projectType}
            onChange={set("projectType")}
            className={`${field} min-h-[50px] border-[var(--rule-strong)]`}
          >
            <option value="">Select one…</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <Label htmlFor={id("message")} required>
          Message
        </Label>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          placeholder="What are you building, and where does it hurt?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? id("message-err") : undefined}
          className={`${field} resize-y ${
            errors.message ? "border-[var(--accent)]" : "border-[var(--rule-strong)]"
          }`}
        />
        {errors.message && <ErrorText id={id("message-err")}>{errors.message}</ErrorText>}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--ink)] px-7 text-sm font-medium text-[var(--paper)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[var(--accent)] disabled:pointer-events-none disabled:opacity-60"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <p className="t-body text-sm">
          Or just{" "}
          <a href={`mailto:${profile.email}`} className="link">
            email me
          </a>
          .
        </p>
      </div>

      {/* role="status" — a submission result has to be announced, not just painted. */}
      <p role="status" aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message." : ""}
      </p>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-md border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent-deep)]"
        >
          {failure}
        </p>
      )}
    </form>
  );
}

/* ── bits ─────────────────────────────────────────────────────────── */

function Label({
  htmlFor,
  required,
  optional,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--ink)]">
      {children}
      {required && (
        <span className="ml-1 text-[var(--accent)]" aria-hidden>
          *
        </span>
      )}
      {optional && <span className="ml-1.5 text-xs text-[var(--ink-muted)]">(optional)</span>}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-sm text-[var(--accent-deep)]">
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  error,
  required,
  optional,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${field} min-h-[50px] ${
          error ? "border-[var(--accent)]" : "border-[var(--rule-strong)]"
        }`}
        {...rest}
      />
      {error && <ErrorText id={`${id}-err`}>{error}</ErrorText>}
    </div>
  );
}
