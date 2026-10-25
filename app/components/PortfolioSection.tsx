"use client";

import React, { useState } from "react";
import { PORTFOLIO_PHOTOS, PortfolioPhoto } from "@/app/lib/company-data";

const CATEGORIES = [
  "All",
  "Europe & Türkiye",
  "East Asia",
  "Southeast Asia",
  "Domestic & Group",
] as const;

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioPhoto | null>(null);

  const filteredPhotos =
    activeCategory === "All"
      ? PORTFOLIO_PHOTOS
      : PORTFOLIO_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-24 overflow-hidden bg-white/60"
    >
      {/* Subtle Pastel Aura matching PDF Pages 6-9 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -bottom-28 right-10 h-96 w-96 rounded-full bg-[#BAE6FD]/45 blur-3xl" />
        <div className="absolute top-12 left-10 h-80 w-80 rounded-full bg-[#D8B4FE]/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900">
              <span>Our Journey Together</span>
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Portfolio
            </h2>
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-600">
              Real moments from our global Outbound and domestic Inbound tours across
              Europe, Türkiye, Japan, China, Southeast Asia, and Indonesia.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-slate-950 text-white shadow-sm"
                      : "border border-slate-200 bg-white/90 text-slate-700 hover:border-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry-style Responsive Photo Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                photo.aspect === "wide"
                  ? "sm:col-span-2 aspect-[16/9]"
                  : "aspect-[4/3]"
              }`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-85 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white translate-y-1 sm:translate-y-2 transition-transform duration-300 group-hover:translate-y-0 opacity-100 sm:opacity-0 group-hover:opacity-100">
                <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {photo.category}
                </span>
                <h3 className="mt-1.5 text-sm font-bold leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-200">{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-xs"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-950 flex items-center justify-center max-h-[75vh]">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white">
              <div>
                <span className="inline-block rounded-full bg-blue-50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#1542C8]">
                  {selectedPhoto.category}
                </span>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  {selectedPhoto.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
              >
                Close Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

