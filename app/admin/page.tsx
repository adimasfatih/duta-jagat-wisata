import React, { Suspense } from "react";
import { connection } from "next/server";
import { readPromos, isVercelBlobConfigured } from "@/app/lib/promos-store";
import { isAdminAuthenticated } from "@/app/lib/auth";
import AdminDashboardClient from "@/app/components/AdminDashboardClient";
import { COMPANY_INFO } from "@/app/lib/company-data";

export const metadata = {
  title: `Promo Admin Portal | ${COMPANY_INFO.name}`,
  description:
    "Protected Admin dashboard to add and remove dynamic promo images for Duta Jagat Wisata.",
};

async function AdminPortalLoader() {
  await connection();
  const [authenticated, promos] = await Promise.all([
    isAdminAuthenticated(),
    readPromos(),
  ]);
  const cloudStorageActive = isVercelBlobConfigured();

  return (
    <AdminDashboardClient
      initialAuthenticated={authenticated}
      initialPromos={promos}
      cloudStorageActive={cloudStorageActive}
    />
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC] text-sm text-slate-500">
          Loading Admin Portal...
        </div>
      }
    >
      <AdminPortalLoader />
    </Suspense>
  );
}
