"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COMPANY_INFO, PromoItem } from "@/app/lib/company-data";
import DynamicPromoSection from "./DynamicPromoSection";

interface AdminDashboardClientProps {
  initialAuthenticated: boolean;
  initialPromos: PromoItem[];
  cloudStorageActive?: boolean;
}

export default function AdminDashboardClient({
  initialAuthenticated,
  initialPromos,
  cloudStorageActive = false,
}: AdminDashboardClientProps) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials");
      } else {
        setAuthenticated(true);
        setPassword("");
      }
    } catch {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/images/compro/logo-suitcases.png"
              alt="Duta Jagat Wisata Logo"
              className="h-9 w-auto"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-950">
                  {COMPANY_INFO.name}
                </span>
                <span className="rounded-md bg-[#1542C8] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Protected Promo Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {authenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-600 hover:text-white cursor-pointer"
              >
                <span>Sign Out</span>
              </button>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              <span>← Back to Website</span>
            </Link>
          </div>
        </div>
      </header>

      {!authenticated ? (
        /* ===============================================================
           ADMIN LOGIN SCREEN
           =============================================================== */
        <div className="relative flex flex-1 items-center justify-center px-4 py-16 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#D8B4FE]/40 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#BAE6FD]/45 blur-3xl" />
          </div>

          <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white/95 p-8 shadow-xl backdrop-blur-md">
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/compro/logo-suitcases.png"
                alt="Duta Jagat Wisata"
                className="h-16 w-auto"
              />
              <span className="mt-4 inline-flex items-center rounded-full border border-slate-900 bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-900">
                Admin Access Only
              </span>
              <h1 className="mt-3 text-2xl font-bold text-slate-950">
                Sign In to Manage Promos
              </h1>
              <p className="mt-1.5 text-xs text-slate-500">
                Enter your admin credentials to add or remove promo images.
              </p>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 focus:border-[#1542C8] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 pr-16 text-sm text-slate-900 focus:border-[#1542C8] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#1542C8] py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-800 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Signing In..." : "Sign In to Admin Panel"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* ===============================================================
           AUTHENTICATED ADMIN DASHBOARD
           =============================================================== */
        <div className="flex-1">
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-[#DDF4F5]/60 via-[#EAE8FF]/60 to-[#FBCFE8]/40 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                      <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      Authenticated as Admin
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        cloudStorageActive
                          ? "bg-blue-100 text-[#1542C8]"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          cloudStorageActive ? "bg-[#1542C8]" : "bg-amber-600"
                        }`}
                      />
                      {cloudStorageActive
                        ? "Vercel Blob Cloud Storage Active (Live Phone Uploads Enabled)"
                        : "Local Disk Mode (Connect Vercel Blob in Vercel Dashboard for Live Phone Uploads)"}
                    </span>
                  </div>
                  <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950">
                    Dynamic Promo Image Manager
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Tap the upload box below on your phone or computer to add a new
                    promo flyer from your gallery, or tap <strong>Remove Image</strong>{" "}
                    to take down an expired promo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DynamicPromoSection
            initialPromos={initialPromos}
            defaultAdminOpen={true}
            isStandaloneAdminPage={true}
            isAdmin={true}
          />
        </div>
      )}
    </div>
  );
}

