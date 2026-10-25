import React, { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import {
  COMPANY_INFO,
  IDENTITY_CONTENT,
  PHILOSOPHY_CONTENT,
  LEADERSHIP_CONTENT,
  TOUR_ARRANGEMENTS,
  DESTINATIONS,
  OTHER_SERVICES,
  getWhatsAppUrl,
} from "@/app/lib/company-data";
import { readPromos } from "@/app/lib/promos-store";
import { isAdminAuthenticated } from "@/app/lib/auth";
import {
  CopyEmailButton,
  WhatsAppButton,
  FloatingWhatsAppButton,
  WhatsAppIcon,
} from "@/app/components/ContactActions";
import DynamicPromoSection from "@/app/components/DynamicPromoSection";
import PortfolioSection from "@/app/components/PortfolioSection";

async function PromoSectionLoader() {
  await connection();
  const [promos, isAdmin] = await Promise.all([
    readPromos(),
    isAdminAuthenticated(),
  ]);
  return <DynamicPromoSection initialPromos={promos} isAdmin={isAdmin} />;
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAFAFC] text-slate-900 selection:bg-[#1542C8] selection:text-white">
      {/* =====================================================================
          STICKY NAVBAR
         ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3 group">
            <img
              src="/images/compro/logo-suitcases.png"
              alt="Duta Jagat Wisata Logo"
              className="h-9 w-auto transition-transform duration-200 group-hover:scale-105"
            />
            <div className="leading-tight">
              <span className="block text-base font-extrabold tracking-tight text-slate-950">
                Duta Jagat Wisata
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#D94E1F]">
                Walking Together
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <a href="#promos" className="hover:text-[#1542C8] transition-colors">
              Promos
            </a>
            <a href="#identity" className="hover:text-[#1542C8] transition-colors">
              Identity
            </a>
            <a href="#philosophy" className="hover:text-[#1542C8] transition-colors">
              Philosophy
            </a>
            <a href="#leadership" className="hover:text-[#1542C8] transition-colors">
              Leadership
            </a>
            <a href="#why-djw" className="hover:text-[#1542C8] transition-colors">
              Why DJW?
            </a>
            <a href="#portfolio" className="hover:text-[#1542C8] transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-[#1542C8] transition-colors">
              Contact
            </a>
            <Link
              href="/admin"
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-700 hover:border-[#1542C8] hover:text-[#1542C8] transition-colors"
            >
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block">
              <CopyEmailButton variant="compact" />
            </div>
            <WhatsAppButton
              variant="compact"
              label="WhatsApp Us"
            />
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* =====================================================================
            HERO SECTION (Page 1 of Compro PDF)
           ===================================================================== */}
        <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
          {/* Ambient Pastel Aura Gradients */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#D8B4FE]/35 blur-3xl" />
            <div className="absolute top-1/4 right-0 h-[460px] w-[460px] rounded-full bg-[#BAE6FD]/45 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-[340px] w-[340px] rounded-full bg-[#FBCFE8]/35 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Page 1 Typography & Direct Potential Client Actions */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-white/80 px-7 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-900 shadow-2xs">
                  COMPANY PROFILE
                </div>

                <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950 sm:text-7xl lg:text-[5.25rem] leading-[1.03]">
                  Duta Jagat
                  <span className="block">Wisata</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-700 font-normal">
                  Guided by our core philosophy of{" "}
                  <span className="font-bold text-[#1542C8]">
                    &ldquo;Walking Together,&rdquo;
                  </span>{" "}
                  we partner with travelers and global counterparts to create
                  thoughtfully planned, safe, and unforgettable journeys across
                  Indonesia and the world.
                </p>

                {/* Primary Client Contact Buttons (WhatsApp Direct Swap + Copy Email) */}
                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
                  <WhatsAppButton
                    label={`WhatsApp: ${COMPANY_INFO.phoneDisplay}`}
                  />
                  <CopyEmailButton />
                </div>

                {/* Quick Client Info Strip */}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#06B856]" />
                    Instant WhatsApp redirect (no manual number input)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#1542C8]" />
                    One-click email copy for your mail app
                  </span>
                </div>

                {/* Key Trust Badges from PDF */}
                <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-8 max-w-xl">
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                      2023
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      Founded &amp; Growing Globally
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#1542C8]">
                      BNSP
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      Certified Tour Leadership
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#06B856]">
                      5+ Continents
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      Outbound &amp; Inbound Tours
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Iconic Page 1 Cover Card with 3 Suitcases & Pastel Aura */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-[#D2F2F4] via-[#E4E3FE] to-[#DDD5FE] p-7 sm:p-9 shadow-2xl shadow-indigo-950/10">
                  {/* Soft internal glow */}
                  <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-purple-300/40 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-200/50 blur-2xl" />

                  {/* Three Suitcases Logo Illustration */}
                  <div className="relative z-10 flex justify-center py-4">
                    <img
                      src="/images/compro/logo-suitcases.png"
                      alt="Duta Jagat Wisata 3 Suitcases Palm Tree Logo"
                      className="w-full max-w-[340px] h-auto drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>

                  {/* Page 1 Bottom Row: Outlined "Walking Together" + Contact Stack */}
                  <div className="relative z-10 mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="leading-[0.95] select-none">
                      <span className="block text-4xl sm:text-5xl font-extrabold tracking-tight text-outline-white drop-shadow-xs">
                        Walking
                      </span>
                      <span className="block text-4xl sm:text-5xl font-extrabold tracking-tight text-outline-white drop-shadow-xs">
                        Together
                      </span>
                    </div>

                    <div className="flex flex-col items-start sm:items-end text-xs font-semibold text-slate-900 space-y-1">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#1542C8] transition-colors font-bold"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                      <span className="text-slate-700">{COMPANY_INFO.website}</span>
                      <a
                        href={COMPANY_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 underline decoration-slate-900/50 hover:text-[#EC00A8]"
                      >
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-[9px] text-white">
                          IG
                        </span>
                        <span>{COMPANY_INFO.instagramHandle}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            DYNAMIC PROMO SECTION (Adapts automatically to 0, 1, 2, 3, 4, 5+ promos)
           ===================================================================== */}
        <Suspense
          fallback={
            <section className="py-20 text-center text-sm text-slate-500">
              Loading current travel promos...
            </section>
          }
        >
          <PromoSectionLoader />
        </Suspense>

        {/* =====================================================================
            OUR IDENTITY SECTION (Page 2 of Compro PDF)
           ===================================================================== */}
        <section
          id="identity"
          className="relative py-20 sm:py-28 overflow-hidden bg-white/75"
        >
          {/* Pastel Lavender & Cyan Aura matching Page 2 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute top-12 -left-20 h-[450px] w-[450px] rounded-full bg-[#D8B4FE]/40 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#BAE6FD]/35 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-flex items-center rounded-full border border-slate-900 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900">
                About Us • Est. 2023
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                Our Identity
              </h2>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Visual Composition: Tilted Chongqing Photo + 3-Suitcases Badge (Just like Page 2) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 items-center gap-6">
                <div className="sm:col-span-6">
                  <div className="group relative mx-auto max-w-[300px] sm:max-w-none overflow-hidden rounded-3xl border-4 border-white bg-slate-900 shadow-xl transition-transform duration-300 -rotate-2 hover:rotate-0">
                    <img
                      src={IDENTITY_CONTENT.featuredImage}
                      alt={IDENTITY_CONTENT.featuredCaption}
                      className="aspect-[4/5] w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                      <p className="text-xs font-medium leading-snug">
                        {IDENTITY_CONTENT.featuredCaption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right half of Page 2 visual: Suitcases + Orange/Ice-Blue Badge */}
                <div className="sm:col-span-6 flex flex-col items-center text-center">
                  <img
                    src="/images/compro/logo-suitcases.png"
                    alt="Duta Jagat Wisata Suitcases"
                    className="w-56 sm:w-full max-w-[260px] h-auto"
                  />
                  <div className="mt-3 w-full max-w-[270px] rounded-2xl bg-[#E3F1FC] px-4 py-2.5 shadow-xs border border-sky-200/60">
                    <span className="block text-base sm:text-lg font-black tracking-wide text-[#D94E1F]">
                      DUTA JAGAT WISATA
                    </span>
                  </div>
                  <span className="mt-1.5 text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#D94E1F]">
                    WALKING TOGETHER
                  </span>
                </div>
              </div>

              {/* Right Text Column: Exact Page 2 Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <p className="text-xl sm:text-2xl font-semibold leading-relaxed text-slate-950">
                  {IDENTITY_CONTENT.lead}
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                  {IDENTITY_CONTENT.body}
                </p>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1542C8]">
                      Global Connections
                    </span>
                    <p className="mt-1 text-sm text-slate-600">
                      Trusted partnerships across Europe, Asia, Australia, USA,
                      Africa, and the Indonesian archipelago.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#06B856]">
                      Seamless Adventure
                    </span>
                    <p className="mt-1 text-sm text-slate-600">
                      End-to-end itinerary design, ticketing, visa support, and
                      personal tour leadership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            CORE PHILOSOPHY SECTION (Page 3 of Compro PDF)
           ===================================================================== */}
        <section
          id="philosophy"
          className="relative py-20 sm:py-28 overflow-hidden"
        >
          {/* Top-right pastel aura matching Page 3 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-[#BAE6FD]/45 blur-3xl" />
            <div className="absolute top-10 right-10 h-80 w-80 rounded-full bg-[#FBCFE8]/45 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-slate-900 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900">
                Our Promise
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl leading-[1.08]">
                Core Philosophy
              </h2>
              <p className="mt-6 text-xl sm:text-2xl font-semibold leading-snug text-slate-900">
                {PHILOSOPHY_CONTENT.headline}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Page 3 Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                  {PHILOSOPHY_CONTENT.body}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EC00A8]/15 text-xs font-bold text-[#EC00A8]">
                      01
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        A Trusted Friend in Every Journey
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Every tour is thoughtfully planned, safe, and filled with
                        joy from departure to return.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1542C8]/15 text-xs font-bold text-[#1542C8]">
                      02
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Cheerful Spirit &amp; Steadfast Professionalism
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Services that are both reliable and personalized to your
                        group&apos;s pace and preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Colorful Framed Collage Mosaic matching Page 3 */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-12 gap-3.5 sm:gap-4">
                  {PHILOSOPHY_CONTENT.mosaicImages.map((img, i) => (
                    <div
                      key={i}
                      className={`${img.span} group overflow-hidden rounded-2xl border-[3.5px] ${img.borderColor} bg-slate-100 shadow-md transition-transform duration-300 hover:scale-[1.02]`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-40 sm:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            LEADERSHIP & EXPERTISE SECTION (Page 4 of Compro PDF)
           ===================================================================== */}
        <section
          id="leadership"
          className="relative py-20 sm:py-28 overflow-hidden bg-white/80"
        >
          {/* Top-left cyan/lavender aura matching Page 4 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#BAE6FD]/50 blur-3xl" />
            <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-[#D8B4FE]/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-slate-900 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900">
                Founder &amp; Certified Tour Leader
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl leading-[1.08]">
                Leadership &amp; Expertise
              </h2>
              <p className="mt-6 text-xl sm:text-2xl font-semibold text-slate-900">
                {LEADERSHIP_CONTENT.headline}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Mrs. Tio Wijaya Oval Cyan-Framed Portrait (Matching Page 4) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative p-2 rounded-[50%] bg-gradient-to-tr from-[#21B2DD] via-[#5BC0BE] to-[#1542C8] shadow-2xl">
                  <div className="overflow-hidden rounded-[50%] border-4 border-white w-72 h-92 sm:w-84 sm:h-[430px] bg-slate-100">
                    <img
                      src={LEADERSHIP_CONTENT.photo}
                      alt="Mrs. Tio Wijaya — Founder and Owner of Duta Jagat Wisata"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-xl font-bold text-slate-950">
                    Mrs. Tio Wijaya
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1542C8]">
                    Founder, Owner &amp; BNSP-Certified Tour Leader
                  </p>
                </div>
              </div>

              {/* Right Column: Credentials & Direct Contact */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {LEADERSHIP_CONTENT.intro}
                </p>

                <div className="space-y-4">
                  {LEADERSHIP_CONTENT.credentials.map((cred, idx) => (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:shadow-md"
                    >
                      <div
                        className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${cred.accent}`}
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-slate-950">
                          {cred.title}
                        </h3>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {cred.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
                        {cred.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Direct Contact Bar for Mrs. Tio Wijaya */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <WhatsAppButton
                    label={`Chat with Mrs. Tio (${COMPANY_INFO.phoneDisplay})`}
                    message="Hello Mrs. Tio Wijaya (Duta Jagat Wisata), I would love to consult with you about planning a tour."
                  />
                  <CopyEmailButton />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            WHY DJW? — SERVICES & DESTINATIONS SECTION (Page 5 of Compro PDF)
           ===================================================================== */}
        <section
          id="why-djw"
          className="relative py-20 sm:py-28 overflow-hidden"
        >
          {/* Pastel Aura matching Page 5 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute top-1/4 -left-20 h-[440px] w-[440px] rounded-full bg-[#BAE6FD]/45 blur-3xl" />
            <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-[#FBCFE8]/35 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <span className="inline-flex items-center rounded-full border border-slate-900 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900">
                Comprehensive Travel Suite
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                Why DJW?
              </h2>
              <p className="mt-6 text-lg sm:text-xl font-medium leading-relaxed text-slate-800">
                We provide a comprehensive suite of travel services, tailored to
                meet the diverse needs of both individuals and groups. Our goal is
                to simplify travel planning and we are committed to making every
                trip well-planned and enjoyable so our clients can focus on
                enjoying their journey.
              </p>
            </div>

            {/* 1. Tour Arrangements (4 Pillars) */}
            <div className="mt-14">
              <h3 className="text-lg font-bold text-slate-900">
                We specialize in arranging tours and every itinerary is carefully
                crafted for a unique and memorable experience:
              </h3>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {TOUR_ARRANGEMENTS.map((tour) => (
                  <div
                    key={tour.title}
                    className={`flex flex-col justify-between rounded-3xl border ${tour.borderLight} ${tour.bgLight} p-6 shadow-xs backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg`}
                  >
                    <div>
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: tour.color }}
                      >
                        {tour.tag}
                      </span>
                      <h4 className="mt-4 text-xl font-bold text-slate-950">
                        {tour.title}
                      </h4>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                        {tour.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/60">
                      <a
                        href={getWhatsAppUrl(
                          `Hello Duta Jagat Wisata, I would like to inquire about arranging a ${tour.title} package.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#1542C8]"
                      >
                        <span>Ask about {tour.title} on WhatsApp</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Destinations Covered (Outbound & Inbound) */}
            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Outbound International */}
              <div className="rounded-3xl border border-slate-200/90 bg-white/90 p-7 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1542C8]">
                      Global Reach
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-slate-950">
                      {DESTINATIONS.outbound.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {DESTINATIONS.outbound.subtitle}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1542C8]/10 text-[#1542C8] font-bold">
                    🌍
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {DESTINATIONS.outbound.places.map((place) => (
                    <a
                      key={place}
                      href={getWhatsAppUrl(
                        `Hello Duta Jagat Wisata, I am interested in Outbound Tours to ${place}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-blue-200 bg-blue-50/70 px-4 py-2 text-sm font-bold text-[#1542C8] transition hover:bg-[#1542C8] hover:text-white"
                    >
                      {place}
                    </a>
                  ))}
                </div>
              </div>

              {/* Inbound Domestic */}
              <div className="rounded-3xl border border-slate-200/90 bg-white/90 p-7 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#06B856]">
                      Explore Indonesia
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-slate-950">
                      {DESTINATIONS.inbound.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {DESTINATIONS.inbound.subtitle}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#06B856]/10 text-[#06B856] font-bold">
                    🏝️
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {DESTINATIONS.inbound.places.map((place) => (
                    <a
                      key={place}
                      href={getWhatsAppUrl(
                        `Hello Duta Jagat Wisata, I am interested in Inbound Domestic Tours to ${place}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-emerald-200 bg-emerald-50/70 px-4 py-2 text-sm font-bold text-emerald-800 transition hover:bg-[#06B856] hover:text-white"
                    >
                      {place}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Other Travel Services (Ticketing, Visa, Merchandise, Bike Park) */}
            <div className="mt-14">
              <h3 className="text-lg font-bold text-slate-900">
                Aside from tour arrangements, we also have other services to ease
                your need for travelling:
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {OTHER_SERVICES.map((srv) => (
                  <div
                    key={srv.title}
                    className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-2xs transition hover:border-[#21B2DD] hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-[#21B2DD] font-bold text-lg">
                      {srv.iconName === "ticket" && "✈️"}
                      {srv.iconName === "passport" && "🛂"}
                      {srv.iconName === "gift" && "🎁"}
                      {srv.iconName === "bike" && "🚴"}
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-slate-950">
                      {srv.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {srv.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Page 5 Banner: "Walking by djw Together" */}
            <div className="mt-16 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-center select-none">
              <span className="text-4xl sm:text-6xl font-black tracking-tight text-[#FF47B5]">
                Walking
              </span>
              <span className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                by djw
              </span>
              <span className="text-4xl sm:text-6xl font-black tracking-tight text-[#0A2FB6]">
                Together
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================================
            PORTFOLIO GALLERY SECTION (Pages 6, 7, 8, 9 of Compro PDF)
           ===================================================================== */}
        <PortfolioSection />

        {/* =====================================================================
            THANK YOU & POTENTIAL CLIENT CONTACT SECTION (Page 10 of Compro PDF)
           ===================================================================== */}
        <section
          id="contact"
          className="relative py-20 sm:py-28 overflow-hidden"
        >
          {/* Dreamy Pastel Aura Blob from Page 10 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-[#FBCFE8]/50 via-[#D8B4FE]/45 to-[#BAE6FD]/50 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2.5rem] border border-white/90 bg-white/80 p-8 sm:p-14 shadow-xl backdrop-blur-md">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
                {/* Left Column: Page 10 Thank You Message */}
                <div className="lg:col-span-6">
                  <span className="inline-flex items-center rounded-full border border-slate-900 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900">
                    Let&apos;s Walk Together
                  </span>
                  <h2 className="mt-5 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                    Thank you!
                  </h2>
                  <p className="mt-6 text-lg sm:text-xl font-medium leading-relaxed text-slate-800">
                    Thank you for taking the time to explore our company profile.
                    If you have any questions or would like to discuss your next
                    journey any further, please don&apos;t hesitate to reach out to
                    us.
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src="/images/compro/logo-suitcases.png"
                      alt="Duta Jagat Wisata"
                      className="h-14 w-auto"
                    />
                    <div>
                      <p className="text-base font-bold text-slate-950">
                        {COMPANY_INFO.name}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        Led by {COMPANY_INFO.founder} • BNSP Certified Tour Leader
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Potential Client Contact Cards */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="rounded-2xl bg-slate-900 px-5 py-3 text-white flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      Direct Client Inquiry Channels
                    </span>
                    <span className="text-xs text-slate-300">
                      Fast Response
                    </span>
                  </div>

                  {/* 1. Direct WhatsApp Swap Button (No manual number input) */}
                  <WhatsAppButton
                    variant="card"
                    sublabel="WhatsApp (Click to Open Chat Directly)"
                  />

                  {/* 2. Copy Email Function Card (Copies tiowijaya.djw@gmail.com to clipboard) */}
                  <CopyEmailButton
                    variant="card"
                    email={COMPANY_INFO.email}
                  />

                  {/* 3. Instagram & Office Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <a
                      href={COMPANY_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 transition hover:border-[#EC00A8] hover:shadow-sm"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white font-bold text-xs">
                        IG
                      </span>
                      <div className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Instagram
                        </span>
                        <span className="truncate block text-sm font-bold text-slate-900">
                          {COMPANY_INFO.instagramHandle}
                        </span>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#21B2DD] font-bold text-sm">
                        🌐
                      </span>
                      <div className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Official Website
                        </span>
                        <span className="truncate block text-sm font-bold text-slate-900">
                          {COMPANY_INFO.website}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          FOOTER
         ===================================================================== */}
      <footer className="border-t border-slate-200/80 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/compro/logo-suitcases.png"
              alt="Duta Jagat Wisata"
              className="h-8 w-auto"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">
                {COMPANY_INFO.name} — &ldquo;{COMPANY_INFO.slogan}&rdquo;
              </p>
              <p className="text-xs text-slate-500">
                Telp/WA: {COMPANY_INFO.phoneDisplay} • Email: {COMPANY_INFO.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#06B856] hover:underline"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>WhatsApp Direct</span>
            </a>
            <span>•</span>
            <Link href="/admin" className="hover:text-[#1542C8] underline">
              Admin Promo Manager
            </Link>
            <span>•</span>
            <span className="text-slate-400">
              © {COMPANY_INFO.foundedYear}–2026 {COMPANY_INFO.name}
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Direct WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
