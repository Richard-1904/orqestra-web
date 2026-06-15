import { useState } from "react";
import { motion } from "framer-motion";
import { ConfidenceMesh } from "../components/ConfidenceMesh";
import { supabase } from "../lib/supabase";

const ROLES = [
  "C-Level Executive (CEO, COO, CIO, CTO)",
  "VP / Director",
  "Head of AI / Innovation",
  "Enterprise Architect",
  "Product Manager",
  "Engineering Leader",
  "Software Engineer",
  "Data / AI Engineer",
  "Knowledge Management Lead",
  "Operations Leader",
  "Compliance / Risk Officer",
  "Legal Counsel",
  "Consultant",
  "Researcher / Academic",
  "Founder / Startup",
  "Other",
];

const INDUSTRIES = [
  "Technology / Software",
  "Financial Services",
  "Banking",
  "Insurance",
  "Healthcare",
  "Pharmaceuticals",
  "Legal Services",
  "Government / Public Sector",
  "Manufacturing",
  "Energy & Utilities",
  "Telecommunications",
  "Retail & E-Commerce",
  "Logistics & Supply Chain",
  "Education",
  "Consulting",
  "Media & Entertainment",
  "Cybersecurity",
  "AI / Machine Learning",
  "Enterprise Operations",
  "Other",
];

export function EarlyAccess() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      role: formData.get("role") as string,
      industry: formData.get("industry") as string,
    };

    try {
      setIsSubmitting(true);

      const { error } = await supabase
        .from("waitlist")
        .insert([payload]);

      if (error) {
        throw error;
      }

      form.reset();
      setSubmitted(true);
    } catch (error) {
      console.error("Waitlist submission failed:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="early-access"
      className="py-24 lg:py-36 border-t border-base-600/60 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <ConfidenceMesh
          variant="ambient"
          className="w-full h-full"
        />
      </div>

      <div className="max-w-content mx-auto container-px relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          <div>
            <div className="section-eyebrow mb-6">
              Early Access
            </div>

            <h2 className="font-display text-display-sm lg:text-display-md font-semibold text-ink-100 tracking-tight mb-6">
              Be among the first to build with confidence.
            </h2>

            <p className="text-ink-500 leading-relaxed text-lg">
              We're working closely with a small group of
              organizations to shape Orqestra's platform.
              Request early access to learn more and join
              the conversation.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-base-600 bg-base-850 p-8 lg:p-10"
          >
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-signal/10 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-signal" />
                </div>

                <h3 className="font-display text-xl font-semibold text-ink-100 mb-2">
                  Request received
                </h3>

                <p className="text-sm text-ink-500">
                  Thank you for your interest in Orqestra.
                  Our team will be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid sm:grid-cols-2 gap-5"
              >
                <Field
                  label="Name"
                  name="name"
                  type="text"
                  required
                  className="sm:col-span-1"
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  className="sm:col-span-1"
                />

                <Field
                  label="Organization"
                  name="organization"
                  type="text"
                  required
                  className="sm:col-span-2"
                />

                <SelectField
                  label="Role"
                  name="role"
                  options={ROLES}
                  className="sm:col-span-1"
                />

                <SelectField
                  label="Industry"
                  name="industry"
                  options={INDUSTRIES}
                  className="sm:col-span-1"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:col-span-2 mt-2 inline-flex items-center justify-center rounded-full bg-signal text-base-900 px-7 py-3.5 text-sm font-semibold hover:bg-signal-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Request Early Access"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  className = "",
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm text-ink-300">
        {label}
      </span>

      <input
        type={type}
        name={name}
        required={required}
        className="rounded-lg border border-base-600 bg-base-900 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-700 focus:border-signal/50 outline-none transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  className = "",
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm text-ink-300">
        {label}
      </span>

      <select
        name={name}
        required
        defaultValue=""
        className="rounded-lg border border-base-600 bg-base-900 px-4 py-3 text-sm text-ink-100 focus:border-signal/50 outline-none transition-colors appearance-none"
      >
        <option value="" disabled>
          Select
        </option>

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}