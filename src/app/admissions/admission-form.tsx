"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function AdmissionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);

    const supabase = createClient();
    const { error } = await supabase.from("admission_enquiries").insert({
      student_name: String(form.get("student_name") ?? ""),
      parent_name: String(form.get("parent_name") ?? ""),
      class_applying: String(form.get("class_applying") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
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
        Thank you! Your admission enquiry has been received. Our office will contact you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <input name="student_name" required placeholder="Student's full name" className="input" />
      <input name="parent_name" placeholder="Parent / guardian name" className="input" />
      <input name="class_applying" placeholder="Class applying for" className="input" />
      <input name="phone" placeholder="Phone number" className="input" />
      <input name="email" type="email" placeholder="Email address" className="input sm:col-span-2" />
      <textarea name="message" placeholder="Message (optional)" rows={4} className="input sm:col-span-2" />
      <button
        type="submit"
        disabled={status === "loading"}
        className="sm:col-span-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-lg transition-transform hover:scale-105 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Submit Enquiry"}
      </button>
      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-600">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
    </form>
  );
}
