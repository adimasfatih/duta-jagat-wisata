"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { PromoItem, COMPANY_INFO, getWhatsAppUrl } from "@/app/lib/company-data";
import { WhatsAppIcon } from "./ContactActions";

interface DynamicPromoSectionProps {
  initialPromos: PromoItem[];
  defaultAdminOpen?: boolean;
  isStandaloneAdminPage?: boolean;
  isAdmin?: boolean;
}

const SAMPLE_PRESETS = [
  {
    title: "Chongqing & Ancient China Expedition",
    subtitle: "Chongqing • Chiyou Jiuli • Kaifeng",
    badge: "HOT ASIA DEAL",
    durationOrPrice: "8D6N Special Offer",
    description:
      "Explore Jiefangbei CBD, cyberpunk skyline views, Millennium City Park, and traditional Miao cultural attire with direct escort by DJW Tour Leader.",
    imageUrl: "/uploads/promos/promo-china-chongqing.jpg",
  },
  {
    title: "Türkiye Ottoman & Cappadocia Wonder",
    subtitle: "Istanbul • Bursa • Cappadocia • Erciyes",
    badge: "BEST SELLER",
    durationOrPrice: "10D7N All-In",
    description:
      "Visit historic Cumalıkızık village in Bursa, snow-capped Mount Erciyes, and iconic Turkish heritage sites with Muslim-friendly dining.",
    imageUrl: "/images/compro/page7_img2_xref331_640x480.jpeg",
  },
  {
    title: "3-Countries Southeast Asia Holiday",
    subtitle: "Singapore • Malaysia • Thailand",
    badge: "FAMILY FAVORITE",
    durationOrPrice: "7D6N Group Tour",
    description:
      "Discover Batu Caves Kuala Lumpur, historic Red Square Melaka, Singapore Merlion, and Thailand's vibrant night markets.",
    imageUrl: "/images/compro/page6_img6_xref312_561x420.jpeg",
  },
];

export default function DynamicPromoSection({
  initialPromos,
  defaultAdminOpen = false,
  isStandaloneAdminPage = false,
  isAdmin = false,
}: DynamicPromoSectionProps) {
  const [promos, setPromos] = useState<PromoItem[]>(initialPromos);
  const [adminOpen, setAdminOpen] = useState(defaultAdminOpen && isAdmin);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form states for adding a new promo image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("SPECIAL PROMO");
  const [durationOrPrice, setDurationOrPrice] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lightbox modal state
  const [lightboxPromo, setLightboxPromo] = useState<PromoItem | null>(null);

  // View mode when >= 5 promos
  const [multiViewMode, setMultiViewMode] = useState<"carousel" | "grid">("grid");
  const carouselRef = useRef<HTMLDivElement>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    if (!title) {
      // Suggest clean title from filename if user left it empty
      const baseName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setTitle(baseName);
    }
  };

  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast("error", "Please select a promo image file to upload.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title.trim() || "Special Travel Promo");
      formData.append("subtitle", subtitle.trim() || "Duta Jagat Wisata Exclusive");
      formData.append("badge", badge.trim() || "LIMITED PROMO");
      formData.append("durationOrPrice", durationOrPrice.trim() || "Ask via WhatsApp");
      formData.append(
        "description",
        description.trim() ||
          "Exclusive travel package curated by Duta Jagat Wisata. Click to inquire directly via WhatsApp for full itinerary and dates."
      );

      const res = await fetch("/api/promos", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload promo");
      }

      setPromos(data.promos);
      setSelectedFile(null);
      setPreviewUrl(null);
      setTitle("");
      setSubtitle("");
      setBadge("SPECIAL PROMO");
      setDurationOrPrice("");
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      showToast(
        "success",
        `Promo image added! Website adjusted to ${data.promos.length} promo(s).`
      );
    } catch (err) {
      showToast(
        "error",
        err instanceof Error ? err.message : "Error adding promo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickAddPreset = async () => {
    setIsSubmitting(true);
    try {
      const preset = SAMPLE_PRESETS[promos.length % SAMPLE_PRESETS.length];
      const res = await fetch("/api/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preset),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add sample promo");
      setPromos(data.promos);
      showToast(
        "success",
        `Added "${preset.title}"! Layout automatically adjusted for ${data.promos.length} promo(s).`
      );
    } catch {
      showToast("error", "Could not add sample promo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemovePromo = async (id: string, promoTitle: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/promos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove promo");
      setPromos(data.promos);
      showToast(
        "success",
        `Removed "${promoTitle}". Website adjusted to ${data.promos.length} promo(s).`
      );
    } catch {
      showToast("error", "Failed to remove promo image.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleResetOrClear = async (action: "reset" | "clear") => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (res.ok) {
        setPromos(data.promos);
        showToast(
          "success",
          action === "clear"
            ? "All promos cleared! Showing 0-promo adaptive layout."
            : "Restored 3 default promos! Showing 3-column adaptive layout."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const count = promos.length;

  const getLayoutModeLabel = (n: number) => {
    if (n === 0) return "0 Promos • Compact Custom-Inquiry Banner";
    if (n === 1) return "1 Promo • Full Spotlight Hero Showcase";
    if (n === 2) return "2 Promos • Centered 2-Column Duo Grid";
    if (n === 3) return "3 Promos • Balanced 3-Column Bento Grid";
    if (n === 4) return "4 Promos • 4-Column Poster Showcase";
    return `${n} Promos • Multi-Card Adaptive Grid & Carousel`;
  };

  return (
    <section
      id="promos"
      className="relative py-20 sm:py-24 overflow-hidden"
    >
      {/* Soft Pastel Aura Background matching Compro PDF */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#D8B4FE]/35 blur-3xl" />
        <div className="absolute top-1/3 right-10 h-96 w-96 rounded-full bg-[#BAE6FD]/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-[#FBCFE8]/35 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-white/80 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900 shadow-2xs backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-[#EC00A8]" />
              <span>Special Offers & Packages</span>
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Current Travel Promos
            </h2>
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-600">
              Explore our latest curated Open Trips, Outbound Series, and Domestic
              Packages. Click any promo to view the full poster or book directly via
              WhatsApp.
            </p>
          </div>

          {isAdmin && (
            <div className="flex flex-wrap items-center gap-3">
              {/* Dynamic Layout Status Indicator (Visible to Admin) */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-4 py-2 text-xs font-semibold text-[#1542C8]">
                <span className="h-2 w-2 rounded-full bg-[#1542C8] animate-pulse" />
                <span>{getLayoutModeLabel(count)}</span>
              </div>

              {!isStandaloneAdminPage && (
                <button
                  type="button"
                  onClick={() => setAdminOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                    adminOpen
                      ? "bg-slate-900 text-white shadow-md"
                      : "border border-slate-300 bg-white/90 text-slate-800 hover:border-slate-900"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  <span>{adminOpen ? "Close Promo Admin" : "Manage Promos (Admin)"}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Status Toast Notification */}
        {statusMessage && (
          <div
            className={`mb-8 flex items-center justify-between gap-4 rounded-2xl border px-5 py-3.5 text-sm font-medium shadow-sm transition-all ${
              statusMessage.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-white text-xs ${
                  statusMessage.type === "success" ? "bg-emerald-600" : "bg-rose-600"
                }`}
              >
                {statusMessage.type === "success" ? "✓" : "!"}
              </span>
              <span>{statusMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-xs font-semibold underline opacity-75 hover:opacity-100 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Admin Promo Management Panel (Add & Remove Promo Images) */}
        {adminOpen && (
          <div className="mb-12 rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="rounded-lg bg-[#1542C8] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Admin Panel
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Add or Remove Promo Images
                  </h3>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Upload a new promo flyer/poster image or remove outdated promos.
                  The website grid automatically adapts to 0, 1, 2, 3, 4, or 5+ promos!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleQuickAddPreset}
                  className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-[#1542C8] border border-indigo-200 transition hover:bg-indigo-100 disabled:opacity-50 cursor-pointer"
                >
                  <span>+ Add Sample Promo</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleResetOrClear("reset")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 disabled:opacity-50 cursor-pointer"
                >
                  <span>Reset (3 Default)</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting || promos.length === 0}
                  onClick={() => handleResetOrClear("clear")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 border border-rose-200 transition hover:bg-rose-100 disabled:opacity-40 cursor-pointer"
                >
                  <span>Clear All (Test 0)</span>
                </button>
                {!isStandaloneAdminPage && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-slate-900"
                  >
                    <span>Full Admin Page ↗</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Left Column: Upload New Promo Image Form */}
              <form
                onSubmit={handleAddPromo}
                className="lg:col-span-5 flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5"
              >
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  1. Upload New Promo Image
                </h4>

                {/* Drag & Drop / File Picker */}
                <label className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-5 text-center transition hover:border-[#1542C8] hover:bg-blue-50/20 cursor-pointer">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  {previewUrl ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={previewUrl}
                        alt="Promo preview"
                        className="h-44 w-auto rounded-xl object-contain shadow-sm"
                      />
                      <span className="text-xs font-semibold text-[#1542C8]">
                        Click to change selected image
                      </span>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#1542C8] group-hover:bg-[#1542C8] group-hover:text-white transition-colors">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">
                        Click to choose a Promo Poster / Image
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Supports JPG, PNG, WEBP (Flyer or Destination Photo)
                      </p>
                    </div>
                  )}
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Promo Title <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Autumn Korea 6D4N"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1542C8] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Destinations <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. Seoul • Nami Island"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1542C8] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Badge Tag
                    </label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="e.g. OPEN TRIP PROMO"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1542C8] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Duration / Offer Label
                    </label>
                    <input
                      type="text"
                      value={durationOrPrice}
                      onChange={(e) => setDurationOrPrice(e.target.value)}
                      placeholder="e.g. 6D4N All-In Deal"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1542C8] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Highlights <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief details about flights, hotels, or dates..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1542C8] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedFile}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1542C8] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Uploading Promo Image...</span>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add Promo Image to Website</span>
                    </>
                  )}
                </button>
              </form>

              {/* Right Column: Active Promo Images List with Remove Function */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    2. Active Promo Images ({promos.length}) — Click Remove to Delete
                  </h4>
                </div>

                {promos.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <p className="text-sm font-semibold text-slate-700">
                      No promo images currently active (0 Promos).
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Upload an image on the left or click &ldquo;+ Add Sample Promo&rdquo; above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-h-[460px] overflow-y-auto pr-1">
                    {promos.map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs transition hover:border-slate-300"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-20 w-16 shrink-0 rounded-xl object-cover border border-slate-100"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                            #{idx + 1} • {item.badge}
                          </span>
                          <p className="mt-1 truncate text-sm font-bold text-slate-900">
                            {item.title}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {item.subtitle}
                          </p>
                          <button
                            type="button"
                            disabled={deletingId === item.id}
                            onClick={() => handleRemovePromo(item.id, item.title)}
                            className="mt-2 inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:opacity-50 cursor-pointer"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span>
                              {deletingId === item.id ? "Removing..." : "Remove Image"}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            ADAPTIVE PROMO DISPLAY (Adjusts dynamically based on promos.length!)
           ===================================================================== */}

        {/* CASE 0: 0 Promos Available */}
        {count === 0 && (
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#DDF4F5]/70 via-white to-[#EAE8FF]/70 p-8 sm:p-12 text-center shadow-sm">
            <span className="inline-flex items-center rounded-full border border-slate-900 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-slate-900">
              Custom Tour Arrangements Available
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900">
              Planning Your Next Group or Private Trip?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-slate-600">
              New seasonal promo posters are being updated. Contact Mrs. Tio Wijaya
              directly on WhatsApp for custom Private Tours, Open Trips, or Corporate
              Incentive packages tailored to your schedule!
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl(
                  "Hello Duta Jagat Wisata, I would like to ask about your latest travel promos and custom tour packages."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#06B856] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-600"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Ask for Latest Promos on WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
              </a>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => handleResetOrClear("reset")}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-xs font-semibold text-slate-700 hover:border-slate-900 cursor-pointer"
                >
                  <span>Restore Sample Promos</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* CASE 1: Exactly 1 Promo Available -> Full-Width Featured Spotlight Hero Card */}
        {count === 1 && (
          <div className="mx-auto max-w-5xl">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl transition hover:shadow-2xl grid grid-cols-1 md:grid-cols-12"
              >
                <div
                  onClick={() => setLightboxPromo(promo)}
                  className="relative md:col-span-6 bg-slate-950 overflow-hidden cursor-pointer min-h-[380px] sm:min-h-[460px]"
                >
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-black/65 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
                    Click Poster to Enlarge 🔍
                  </div>
                </div>
                <div className="md:col-span-6 flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-br from-white via-white to-[#EAE8FF]/40">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-[#1542C8]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1542C8]">
                        {promo.badge}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                        {promo.durationOrPrice}
                      </span>
                    </div>
                    <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#21B2DD]">
                      {promo.subtitle}
                    </p>
                    <h3 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                      {promo.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                      {promo.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col gap-3">
                    <a
                      href={getWhatsAppUrl(
                        `Hello Duta Jagat Wisata! I am interested in the "${promo.title}" (${promo.durationOrPrice}) promo. Could you share the full itinerary & details?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#06B856] px-6 py-4 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-600"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      <span>Book / Ask via WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
                    </a>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setLightboxPromo(promo)}
                        className="text-xs font-semibold text-slate-600 hover:text-[#1542C8] cursor-pointer"
                      >
                        View Full Promo Image ↗
                      </button>
                      {adminOpen && (
                        <button
                          type="button"
                          onClick={() => handleRemovePromo(promo.id, promo.title)}
                          className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
                        >
                          Remove Promo Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CASE 2, 3, 4, or 5+ Promos Available -> Dynamic Responsive Grid / Carousel */}
        {count >= 2 && (
          <div>
            {count >= 5 && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Showing {count} Available Promos
                </p>
                <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setMultiViewMode("grid")}
                    className={`rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
                      multiViewMode === "grid"
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Adaptive Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setMultiViewMode("carousel")}
                    className={`rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
                      multiViewMode === "carousel"
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Horizontal Slider
                  </button>
                </div>
              </div>
            )}

            {count >= 5 && multiViewMode === "carousel" ? (
              <div className="relative">
                <div
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
                >
                  {promos.map((promo) => (
                    <div
                      key={promo.id}
                      className="w-[310px] sm:w-[350px] shrink-0 snap-start"
                    >
                      <PromoCard
                        promo={promo}
                        adminOpen={adminOpen}
                        deletingId={deletingId}
                        onViewLightbox={() => setLightboxPromo(promo)}
                        onRemove={() => handleRemovePromo(promo.id, promo.title)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={`grid gap-7 ${
                  count === 2
                    ? "mx-auto max-w-4xl grid-cols-1 md:grid-cols-2"
                    : count === 3
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : count === 4
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {promos.map((promo) => (
                  <PromoCard
                    key={promo.id}
                    promo={promo}
                    adminOpen={adminOpen}
                    deletingId={deletingId}
                    onViewLightbox={() => setLightboxPromo(promo)}
                    onRemove={() => handleRemovePromo(promo.id, promo.title)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Full Promo Poster Inspection */}
      {lightboxPromo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setLightboxPromo(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 bg-slate-950 flex items-center justify-center max-h-[70vh] md:max-h-[88vh]">
              <img
                src={lightboxPromo.imageUrl}
                alt={lightboxPromo.title}
                className="max-h-[68vh] md:max-h-[85vh] w-auto object-contain"
              />
            </div>
            <div className="flex w-full md:w-80 flex-col justify-between p-6 bg-white">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1542C8]">
                    {lightboxPromo.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxPromo(null)}
                    className="rounded-full bg-slate-100 p-1.5 text-slate-600 hover:bg-slate-200 cursor-pointer"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {lightboxPromo.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#21B2DD]">
                  {lightboxPromo.subtitle}
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {lightboxPromo.description}
                </p>
                <div className="mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="block text-[10px] font-semibold uppercase text-slate-400">
                    Package Offer
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {lightboxPromo.durationOrPrice}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href={getWhatsAppUrl(
                    `Hello Duta Jagat Wisata! I saw the "${lightboxPromo.title}" (${lightboxPromo.durationOrPrice}) promo on your website and would like to inquire.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06B856] px-4 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-600"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Book on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxPromo(null)}
                  className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PromoCard({
  promo,
  adminOpen,
  deletingId,
  onViewLightbox,
  onRemove,
}: {
  promo: PromoItem;
  adminOpen: boolean;
  deletingId: string | null;
  onViewLightbox: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Poster Image Container */}
      <div
        onClick={onViewLightbox}
        className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={promo.imageUrl}
          alt={promo.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100">
          View Poster 🔍
        </div>
      </div>

      {/* Card Footer Info & Direct WhatsApp Swap Button */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1542C8]">
              {promo.badge}
            </span>
            <span className="text-xs font-bold text-emerald-700">
              {promo.durationOrPrice}
            </span>
          </div>
          <h3 className="mt-2.5 text-lg font-bold text-slate-900 line-clamp-1">
            {promo.title}
          </h3>
          <p className="text-xs font-medium text-slate-500 line-clamp-1">
            {promo.subtitle}
          </p>
          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {promo.description}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2">
          <a
            href={getWhatsAppUrl(
              `Hello Duta Jagat Wisata! I am interested in the "${promo.title}" (${promo.durationOrPrice}) promo. Please send me more info.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#06B856] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-600"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>Inquire via WhatsApp</span>
          </a>

          {adminOpen && (
            <button
              type="button"
              disabled={deletingId === promo.id}
              onClick={onRemove}
              title="Remove Promo Image"
              className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:opacity-50 cursor-pointer"
            >
              {deletingId === promo.id ? "..." : "Remove"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

