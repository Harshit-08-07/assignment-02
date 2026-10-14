"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, Send, Clock } from "lucide-react";
import { contactSchema } from "@/lib/validations";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const errMap: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        errMap[err.path[0] as string] = err.message;
      });
      setErrors(errMap);
      return;
    }

    setErrors({});
    setIsSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#5B755A]">
          Get in Touch
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1D2B1F] mt-1">
          Contact Our Conscious Living Team
        </h1>
        <p className="text-xs sm:text-sm text-[#5C635E] mt-2 leading-relaxed">
          Have inquiries about our materials, bulk gifting, or artisan partnerships? Send us a note below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm">
          {isSent ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#5B755A] mx-auto" />
              <h3 className="text-lg font-serif font-bold text-[#1D2B1F]">
                Thank you! Your message has been received.
              </h3>
              <p className="text-xs text-[#5C635E] max-w-sm mx-auto">
                Our team responds to all conscious queries within 24 business hours.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-2 text-xs text-[#5B755A] font-semibold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#202421]">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Diya Sen"
                    className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                  />
                  {errors.name && <p className="text-[11px] text-rose-600">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#202421]">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                  />
                  {errors.email && <p className="text-[11px] text-rose-600">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#202421]">Subject *</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Inquiring about Borosilicate Jars thermal limits"
                  className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                />
                {errors.subject && <p className="text-[11px] text-rose-600">{errors.subject}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#202421]">Message *</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we assist your conscious living journey?"
                  className="w-full bg-[#FAF7F2] border border-[#E5DFD4] rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5B755A]"
                />
                {errors.message && <p className="text-[11px] text-rose-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="bg-[#1D2B1F] hover:bg-[#2F4232] text-white px-6 py-3 rounded-xl font-semibold text-xs transition shadow-sm flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Conscious Note</span>
              </button>
            </form>
          )}
        </div>

        {/* Store Info Cards */}
        <div className="lg:col-span-5 space-y-4 text-xs">
          <div className="p-5 bg-white rounded-2xl border border-[#E5DFD4] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#1D2B1F]">
              <Mail className="w-4 h-4 text-[#5B755A]" />
              <span>Email Support</span>
            </div>
            <p className="text-[#5C635E]">care@earthly.store &bull; hello@earthly.store</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E5DFD4] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#1D2B1F]">
              <Phone className="w-4 h-4 text-[#5B755A]" />
              <span>Phone / WhatsApp</span>
            </div>
            <p className="text-[#5C635E]">+91 98765 43210 (Mon-Sat, 9:30 AM to 6:30 PM IST)</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E5DFD4] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#1D2B1F]">
              <MapPin className="w-4 h-4 text-[#5B755A]" />
              <span>Studio & Dispatch Center</span>
            </div>
            <p className="text-[#5C635E]">
              EARTHLY Studio, Indiranagar, Bengaluru, Karnataka — 560038
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
