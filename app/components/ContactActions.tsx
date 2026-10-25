"use client";

import React, { useState } from "react";
import { COMPANY_INFO, getWhatsAppUrl } from "@/app/lib/company-data";

interface CopyEmailButtonProps {
  variant?: "primary" | "outline" | "card" | "compact";
  className?: string;
  email?: string;
}

export function CopyEmailButton({
  variant = "outline",
  className = "",
  email = COMPANY_INFO.email,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3200);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3200);
    }
  };

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={`group relative flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/90 p-4 text-left shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1542C8]/40 hover:shadow-md cursor-pointer ${className}`}
        title={`Click to copy ${email}`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[#1542C8]/10 text-[#1542C8] group-hover:bg-[#1542C8] group-hover:text-white"
            }`}
          >
            {copied ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email (Click to Copy)
              </span>
              {copied && (
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  Copied to clipboard!
                </span>
              )}
            </div>
            <p className="truncate text-base font-bold text-slate-900">
              {email}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-700 group-hover:bg-[#1542C8] group-hover:text-white"
          }`}
        >
          {copied ? "Copied ✓" : "Copy Email"}
        </span>
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-[#1542C8] hover:text-[#1542C8] cursor-pointer ${className}`}
        title={`Copy ${email}`}
      >
        {copied ? (
          <>
            <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-700">Copied: {email}</span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4 text-[#1542C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>{email}</span>
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
              Copy
            </span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-300/90 bg-white/90 px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1542C8] hover:bg-white hover:text-[#1542C8] hover:shadow-md cursor-pointer ${className}`}
      title={`Copy ${email} to clipboard`}
    >
      {copied ? (
        <>
          <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-700">
            Copied {email}!
          </span>
        </>
      ) : (
        <>
          <svg className="h-5 w-5 text-[#1542C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span>Copy Email: {email}</span>
        </>
      )}
    </button>
  );
}

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  sublabel?: string;
  variant?: "primary" | "card" | "compact" | "pill";
  className?: string;
}

export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  sublabel,
  variant = "primary",
  className = "",
}: WhatsAppButtonProps) {
  const href = getWhatsAppUrl(message);

  if (variant === "card") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex w-full items-center justify-between gap-4 rounded-2xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50/90 via-white to-emerald-50/60 p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#06B856] hover:shadow-md ${className}`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#06B856] text-white shadow-sm transition-transform group-hover:scale-105">
            <WhatsAppIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-700">
              {sublabel || "Direct WhatsApp (No Manual Input)"}
            </span>
            <p className="truncate text-base font-bold text-slate-900">
              {COMPANY_INFO.phoneDisplay}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-[#06B856] px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition group-hover:bg-emerald-700">
          Open Chat →
        </span>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full bg-[#06B856] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-700 ${className}`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-[#06B856] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/30 ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span>{label}</span>
    </a>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat directly on WhatsApp (${COMPANY_INFO.phoneDisplay})`}
        className="group flex items-center gap-3 rounded-full border border-white/40 bg-[#06B856] py-3 pl-4 pr-5 text-white shadow-xl shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-2xl"
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-35"></span>
          <WhatsAppIcon className="relative h-6 w-6" />
        </span>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-100">
            Instant WhatsApp
          </span>
          <span className="text-xs font-bold sm:text-sm">
            {COMPANY_INFO.phoneDisplay}
          </span>
        </div>
      </a>
    </div>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.459 3.473 1.328 4.988L2 22l5.184-1.359c1.461.797 3.105 1.219 4.844 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.82 14.129c-.242.684-1.406 1.309-1.953 1.391-.504.074-1.141.105-1.844-.117-.426-.137-.973-.316-1.676-.621-2.953-1.273-4.883-4.246-5.031-4.441-.148-.195-1.203-1.602-1.203-3.055 0-1.453.762-2.168 1.031-2.461.27-.293.59-.367.785-.367.195 0 .391.004.563.012.18.008.422-.066.66.504.242.586.824 2.012.895 2.16.074.148.121.32.023.516-.098.195-.148.316-.293.488-.148.172-.312.383-.445.516-.148.148-.301.309-.129.605.172.293.766 1.262 1.645 2.047 1.129 1.008 2.082 1.32 2.375 1.469.293.148.465.125.637-.074.172-.195.734-.855.93-1.148.195-.293.391-.242.66-.148.27.098 1.711.809 2.004.953.293.148.488.219.563.344.074.121.074.707-.168 1.391z" />
    </svg>
  );
}

