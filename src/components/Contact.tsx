"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "AI Automation",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const servicesList = [
    "AI Automation",
    "Custom CRM Development",
    "Comprehensive IT Solutions",
    "Web Development",
    "App Development",
    "SEO & GMB Optimization",
    "Social Media Marketing",
    "Performance Digital Ads",
    "UGC / Cinematic Video Ads",
    "Branding & Design",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");

    const msg = `Hello Rahvix Technologies,

I would like to submit a project brief:
• Name: ${formData.name}
• Email: ${formData.email}
• Target Solution: ${formData.service}

Project Brief / Message:
${formData.message}`;

    const waNumber = "919139138170";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

    try {
      window.open(waUrl, "_blank");
      setStatus("success");
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#fa5a15", "#7c3aed", "#06b6d4"],
      });

      setFormData({
        name: "",
        email: "",
        service: "AI Automation",
        message: "",
      });
    } catch (err) {
      console.error("WhatsApp redirect failed", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden border-t border-slate-900">
      {/* Background blurs */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full glow-cyan -z-10 opacity-30" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full glow-blue -z-10 opacity-35" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-orange/15 bg-brand-orange/5 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest font-mono">
                Connect
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Ready to transform <br />
                your business? <br />
                <span className="text-gradient-gold-cyan">Let&apos;s build together.</span>
              </h2>

            <p className="text-slate-355 text-sm sm:text-base leading-relaxed mb-10 font-medium">
              Get in touch with our engineering and growth teams. We construct high-ticket automated pipelines designed to streamline your business operations and accelerate market share.
            </p>

            {/* Contact details list */}
            <div className="flex flex-col gap-6 mb-10 font-mono">
              {/* Phone numbers */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-4 h-4 text-brand-teal" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Call Engineering &amp; Sales</span>
                  <div className="flex flex-col gap-1.5 mt-1 text-sm text-slate-300 font-medium">
                    <a href="tel:+919139138170" className="hover:text-brand-orange transition-colors">
                      +91 913913 8170
                    </a>
                    <a href="tel:+917397818170" className="hover:text-brand-orange transition-colors">
                      +91 739781 8170
                    </a>
                    <a href="tel:+918999457290" className="hover:text-brand-orange transition-colors">
                      +91 899945 7290
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-4 h-4 text-brand-purple" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Email Address</span>
                  <p className="mt-1 text-sm text-slate-300 font-medium">
                    <a href="mailto:contact@rahvix.com" className="hover:text-brand-purple transition-colors">
                      contact@rahvix.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Corporate HQ</span>
                  <p className="mt-1 text-sm text-slate-300 leading-relaxed font-medium">
                    Udyog Vihar, Phase IV, Sector 18,<br />
                    Gurugram, Haryana, India — 122015
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic interactive form */}
          <div className="lg:col-span-7 w-full">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 shadow-2xl">
              {/* aria-live region announces form state changes to screen readers */}
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {status === "success" && "Your message has been sent successfully."}
                {status === "error" && "There was an error sending your message. Please try again."}
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">Transmission Confirmed!</h3>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
                      Your consultation brief has been successfully logged. An engineer will analyze your request and reach out within 12 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-5 py-2.5 rounded-lg border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange"
                    >
                      Submit Another Brief <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    noValidate
                    aria-label="Contact form"
                  >
                    {/* Name Field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full bg-slate-950/80 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:outline-none ${
                          errors.name
                            ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-950/50"
                            : "border-slate-800 focus:border-brand-orange"
                        }`}
                      />
                      {errors.name && (
                        <span id="name-error" role="alert" className="text-[10px] text-red-400 font-mono mt-1">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full bg-slate-950/80 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:outline-none ${
                          errors.email
                            ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-950/50"
                            : "border-slate-800 focus:border-brand-orange"
                        }`}
                      />
                      {errors.email && (
                        <span id="email-error" role="alert" className="text-[10px] text-red-400 font-mono mt-1">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Service Selection */}
                    <div className="flex flex-col gap-1.5 relative">
                      <label htmlFor="service" className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                        Target Solution
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-brand-orange transition-all cursor-pointer"
                        >
                          {servicesList.map((srv) => (
                            <option key={srv} value={srv} className="bg-slate-900 text-white">
                              {srv}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                        Project Brief / Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Briefly describe your systems requirement and scaling goals..."
                        rows={4}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`w-full bg-slate-950/80 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 transition-all resize-none focus:outline-none ${
                          errors.message
                            ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-950/50"
                            : "border-slate-800 focus:border-brand-orange"
                        }`}
                      />
                      {errors.message && (
                        <span id="message-error" role="alert" className="text-[10px] text-red-400 font-mono mt-1">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="mt-2 w-full py-4 rounded-lg bg-brand-orange text-white font-extrabold text-sm hover:shadow-[0_4px_20px_rgba(250,90,21,0.25)] hover:bg-brand-orange/95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Establishing Secure Connection...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Brief</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
