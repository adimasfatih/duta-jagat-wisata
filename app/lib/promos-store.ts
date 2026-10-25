import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { put, del, get } from "@vercel/blob";
import type { PromoItem } from "./company-data";

const LOCAL_DATA_FILE = path.join(process.cwd(), "data", "promos.json");
const TMP_DATA_FILE = path.join(os.tmpdir(), "djw-promos.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "promos");
const BLOB_DB_PATHNAME = "promos/promos-db.json";

export const DEFAULT_PROMOS: PromoItem[] = [
  {
    id: "promo-1",
    title: "Scenic Europe Alpine & Heritage",
    subtitle: "Austria • Germany • Belgium",
    badge: "OUTBOUND SERIES",
    durationOrPrice: "10D7N All-In Package",
    description:
      "Experience the fairy-tale alpine village of Hallstatt, Imperial Vienna's Schönbrunn Palace, Cologne Cathedral, and Brussels with full visa assistance and a BNSP-certified DJW tour leader.",
    imageUrl: "/uploads/promos/promo-europe-winter.jpg",
    createdAt: "2026-10-25T10:00:00.000Z",
  },
  {
    id: "promo-2",
    title: "Japan Golden Route & Mt. Fuji",
    subtitle: "Tokyo • Mt. Fuji • Kyoto • Osaka",
    badge: "OPEN TRIP PROMO",
    durationOrPrice: "7D5N Best Value",
    description:
      "Journey through Japan's iconic highlights including Mount Fuji 5th Station, traditional kimono strolling in Kyoto, bullet train experience, and vibrant Osaka culinary tours.",
    imageUrl: "/uploads/promos/promo-japan-fuji.jpg",
    createdAt: "2026-10-25T10:05:00.000Z",
  },
  {
    id: "promo-3",
    title: "Wonderful Bali & Nusa Islands Escape",
    subtitle: "Bali • Lombok • Labuan Bajo",
    badge: "INBOUND & INCENTIVE",
    durationOrPrice: "4D3N / Custom Trip",
    description:
      "Tailor-made domestic private tours and corporate incentive gatherings across Bali and Indonesia's finest islands, complete with curated resorts, transport, and exclusive DJW merchandise.",
    imageUrl: "/uploads/promos/promo-bali-nusapenida.jpg",
    createdAt: "2026-10-25T10:10:00.000Z",
  },
];

const PROTECTED_SAMPLE_FILES = new Set([
  "promo-europe-winter.jpg",
  "promo-japan-fuji.jpg",
  "promo-bali-nusapenida.jpg",
  "promo-china-chongqing.jpg",
]);

/**
 * Finds the Vercel Blob read-write token or store ID regardless of whether
 * Vercel used the default BLOB_READ_WRITE_TOKEN name or a custom prefix
 * (e.g., DUTA_JAGAT_WISATA_BLOB_READ_WRITE_TOKEN).
 */
export function resolveBlobCredentials(): {
  token?: string;
  storeId?: string;
  configured: boolean;
} {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      token: process.env.BLOB_READ_WRITE_TOKEN,
      configured: true,
    };
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (!value) continue;
    if (
      value.startsWith("vercel_blob_rw_") ||
      key.endsWith("_READ_WRITE_TOKEN")
    ) {
      return { token: value, configured: true };
    }
  }

  if (process.env.BLOB_STORE_ID) {
    return { storeId: process.env.BLOB_STORE_ID, configured: true };
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (!value) continue;
    if (key.endsWith("_STORE_ID") && value.startsWith("store_")) {
      return { storeId: value, configured: true };
    }
  }

  return { configured: false };
}

export function isVercelBlobConfigured(): boolean {
  return resolveBlobCredentials().configured;
}

export async function readPromos(): Promise<PromoItem[]> {
  const creds = resolveBlobCredentials();

  // 1. If Vercel Blob is connected, read the live promos list from Vercel Blob origin storage
  if (creds.configured) {
    try {
      const result = await get(BLOB_DB_PATHNAME, {
        access: "public",
        useCache: false,
        ...(creds.token ? { token: creds.token } : {}),
        ...(creds.storeId ? { storeId: creds.storeId } : {}),
      });
      if (result && result.statusCode === 200 && result.stream) {
        const text = await new Response(result.stream).text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      // First run on a fresh Blob store: initialize with DEFAULT_PROMOS
      await writePromos(DEFAULT_PROMOS);
      return DEFAULT_PROMOS;
    } catch (err) {
      console.error("Vercel Blob read fallback:", err);
    }
  }

  // 2. Check if tmp override exists (serverless fallback when Blob isn't connected yet)
  try {
    const tmpRaw = await fs.readFile(TMP_DATA_FILE, "utf-8");
    const parsed = JSON.parse(tmpRaw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Ignore
  }

  // 3. Read from local project data/promos.json
  try {
    const raw = await fs.readFile(LOCAL_DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_PROMOS;
  } catch {
    return DEFAULT_PROMOS;
  }
}

export async function writePromos(promos: PromoItem[]): Promise<void> {
  const payload = JSON.stringify(promos, null, 2);
  const creds = resolveBlobCredentials();

  // 1. Save permanently to Vercel Blob when configured
  if (creds.configured) {
    await put(BLOB_DB_PATHNAME, payload, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0,
      ...(creds.token ? { token: creds.token } : {}),
      ...(creds.storeId ? { storeId: creds.storeId } : {}),
    });
    return;
  }

  // 2. Local development: save to data/promos.json
  try {
    await fs.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
    await fs.writeFile(LOCAL_DATA_FILE, payload, "utf-8");
  } catch {
    await fs.writeFile(TMP_DATA_FILE, payload, "utf-8");
  }
}

export async function saveUploadedPromoImage(file: File): Promise<string> {
  const ext = path.extname(file.name || ".jpg").toLowerCase() || ".jpg";
  const safeBase = path
    .basename(file.name || "promo", ext)
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .slice(0, 40);
  const fileName = `${Date.now()}-${safeBase || "promo"}${ext}`;
  const creds = resolveBlobCredentials();

  // 1. Upload directly to Vercel Blob CDN when configured (works permanently from phone on live website!)
  if (creds.configured) {
    const blob = await put(`promos/images/${fileName}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type || "image/jpeg",
      ...(creds.token ? { token: creds.token } : {}),
      ...(creds.storeId ? { storeId: creds.storeId } : {}),
    });
    return blob.url;
  }

  // 2. Local development: save to public/uploads/promos/
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fullPath = path.join(UPLOADS_DIR, fileName);

  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.writeFile(fullPath, buffer);
    return `/uploads/promos/${fileName}`;
  } catch {
    const mime = file.type || "image/jpeg";
    return `data:${mime};base64,${buffer.toString("base64")}`;
  }
}

export async function deletePromoById(id: string): Promise<PromoItem[]> {
  const promos = await readPromos();
  const target = promos.find((p) => p.id === id);
  const remaining = promos.filter((p) => p.id !== id);
  await writePromos(remaining);

  const creds = resolveBlobCredentials();

  // Clean up Vercel Blob image if it was uploaded to Blob storage
  if (
    target?.imageUrl &&
    target.imageUrl.includes(".blob.vercel-storage.com/") &&
    creds.configured
  ) {
    const stillUsed = remaining.some((p) => p.imageUrl === target.imageUrl);
    if (!stillUsed) {
      try {
        await del(target.imageUrl, {
          ...(creds.token ? { token: creds.token } : {}),
          ...(creds.storeId ? { storeId: creds.storeId } : {}),
        });
      } catch (err) {
        console.error("Failed to delete blob image:", err);
      }
    }
  }

  // Clean up local uploaded file if in local dev mode
  if (target?.imageUrl?.startsWith("/uploads/promos/")) {
    const fileName = path.basename(target.imageUrl);
    if (!PROTECTED_SAMPLE_FILES.has(fileName)) {
      const stillUsed = remaining.some((p) => p.imageUrl === target.imageUrl);
      if (!stillUsed) {
        try {
          await fs.unlink(path.join(UPLOADS_DIR, fileName));
        } catch {
          // Ignore
        }
      }
    }
  }

  return remaining;
}

export async function resetPromosToDefault(): Promise<PromoItem[]> {
  await writePromos(DEFAULT_PROMOS);
  try {
    await fs.unlink(TMP_DATA_FILE);
  } catch {
    // Ignore
  }
  return DEFAULT_PROMOS;
}
