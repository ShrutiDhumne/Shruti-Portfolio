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

/* One control spec. No vertical padding here: the single-line controls get an
   explicit h-13 (52px) so the input and the select next to it are the SAME
   height — previously the input's padding pushed it to 50.8px against the
   select's 50.0px and their bottom edges never lined up. The textarea adds its
   own py-3. 16px text, not 15px: it is on the scale and it stops iOS zooming
   the page on focus.

   No `focus:border-[var(--accent)]`: with the global 2px rust focus outline it
   produced a rust double-ring that reads as a validation error. */
const field =
  "w-full appearance-none rounded-md border bg-[var(--card)] px-4 text-base text-[var(--ink)] outline-none transition-colors duration-300 placeholder:text-[var(--ink-muted)]";

const control = `${field} h-13`;

/* Border colour is set inline, not by a utility: two `border-[var(--…)]` classes
   have identical specificity and the one that wins is whichever Tailwind happens
   to emit later — an error border that silently loses is not a risk worth taking. */
const edge = (bad?: boolean): React.CSSProperties => ({
  borderColor: bad ? "var(--accent)" : "var(--rule-strong)",
});

/* A designed caret, not the OS's. The select was the one control on the page
   that was defaulted rather than drawn. Colour is --ink-muted. */
const CHEVRON =
  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%236f6a61' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

const selectArt: React.CSSProperties = {
  backgroundImage: CHEVRON,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 16px center",
};

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
      <div role="status" className="card flex flex-col items-start gap-4 p-8">
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
          className="-my-3 mt-2 inline-flex items-center py-3 text-sm font-medium text-[var(--accent)] transition-opacity duration-300 hover:opacity-70"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    /* p-8: one card padding token across Work cards, the Experience sub-cards and
       this form. It was p-8 md:p-10 — 25% more generous than the Work cards for
       no reason, and the extra 8px is what pushed the first label out of line
       with the "Contact" eyebrow beside it. */
    <form onSubmit={onSubmit} noValidate className="card p-8">
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

      {/* Pairs of fields only when the card can hold them. The form lives in a
          6-of-12 column, so between 768 and 1280 that column is ~324–450px wide —
          `sm:grid-cols-2` was pairing fields inside it and squeezing every input
          to ~130px with the labels overlapping. One column until the card is
          wide enough, then two. */}
      <div className="grid gap-6 xl:grid-cols-2">
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
          {/* "What's this about?" + "(optional)" is 27 characters; set in the
              metadata face it wrapped to two lines, which dropped the select a
              whole line below the input beside it. Two words, one line, one row. */}
          <Label htmlFor={id("projectType")} optional>
            Project type
          </Label>
          <select
            id={id("projectType")}
            name="projectType"
            value={values.projectType}
            onChange={set("projectType")}
            className={`${control} pr-10`}
            style={{
              ...selectArt,
              ...edge(),
              // An empty select must look empty: the same --ink-muted every
              // sibling placeholder uses.
              color: values.projectType ? "var(--ink)" : "var(--ink-muted)",
            }}
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

      <div className="mt-6 flex flex-col gap-2">
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
          /* resize stays (it is useful) but the browser's diagonal grab-handle
             does not: it is the only un-drawn ornament left in the card. */
          className={`${field} resize-y py-3 [&::-webkit-resizer]:hidden`}
          style={edge(Boolean(errors.message))}
        />
        {errors.message && <ErrorText id={id("message-err")}>{errors.message}</ErrorText>}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--ink)] px-8 text-sm font-medium text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent)] disabled:pointer-events-none disabled:opacity-60"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <p className="text-base text-[var(--ink-soft)]">
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
          className="mt-6 rounded-md border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent-deep)]"
        >
          {failure}
        </p>
      )}
    </form>
  );
}

/* ── bits ─────────────────────────────────────────────────────────── */

/* One label system in this section. The <dl> beside the form already labels its
   rows in mono uppercase ("EMAIL", "LINKEDIN", "BASED IN"); the form's labels
   were Inter 14/600 sentence case, and "(optional)" was a third style again.
   All of it is short metadata — it belongs in the metadata face. */
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
    <label htmlFor={htmlFor} className="t-meta whitespace-nowrap">
      {children}
      {required && (
        <span className="ml-1 text-[var(--accent)]" aria-hidden>
          *
        </span>
      )}
      {optional && <span className="ml-1.5 text-[var(--ink-muted)]">(optional)</span>}
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
        className={control}
        style={edge(Boolean(error))}
        {...rest}
      />
      {error && <ErrorText id={`${id}-err`}>{error}</ErrorText>}
    </div>
  );
}
