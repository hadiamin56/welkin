"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);

    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      e.currentTarget.reset();
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        Thanks for reaching out! We&rsquo;ll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input name="name" required placeholder="Your name" className="input" />
      <input name="email" type="email" required placeholder="Your email" className="input" />
      <input name="phone" placeholder="Phone number" className="input" />
      <textarea name="message" required placeholder="How can we help?" rows={5} className="input" />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-lg transition-transform hover:scale-105 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
