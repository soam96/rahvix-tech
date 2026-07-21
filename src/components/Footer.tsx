"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/rahvix-technologies",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: "Twitter / X",
      href: "https://twitter.com/rahvix_tech",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/rahvix.tech",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      name: "GitHub",
      href: "https://github.com/rahvix-tech",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        </svg>
      )
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-slate-950 border-t border-slate-900 py-12 px-6 overflow-hidden"
    >
      {/* Subtle background flow overlay */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full glow-blue opacity-15 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="#" className="flex items-center gap-3 mb-3 group">
            <div className="relative h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.jpg"
                alt="Rahvix Technologies Logo"
                width={120}
                height={40}
                className="h-full w-auto object-contain rounded-lg"
              />
            </div>
          </a>
          <p className="text-[11px] text-slate-400 font-mono max-w-[260px]">
            Next-Gen AI Automation, Elite Software Engineering, &amp; Scale Marketing.
          </p>
        </div>

        {/* Center: Quick Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono" aria-label="Footer navigation">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-brand-orange transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2 rounded"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Social icons and Scroll to Top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComp = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-350 hover:text-brand-orange hover:border-slate-700 hover:bg-slate-850 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange"
                  aria-label={`Follow Rahvix on ${social.name}`}
                >
                  <IconComp className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <button
            onClick={handleScrollToTop}
            className="w-8 h-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-350 hover:text-brand-orange hover:border-slate-700 hover:bg-slate-850 transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto w-full mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-450 font-mono">
        <p>© {currentYear} Rahvix Technologies. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
        </div>
      </div>
    </motion.footer>
  );
}
