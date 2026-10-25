import { NextResponse } from "next/server";
import { connection } from "next/server";
import { revalidatePath } from "next/cache";
import {
  readPromos,
  writePromos,
  saveUploadedPromoImage,
  resetPromosToDefault,
} from "@/app/lib/promos-store";
import { isAdminAuthenticated } from "@/app/lib/auth";
import type { PromoItem } from "@/app/lib/company-data";

export async function GET() {
  await connection();
  const promos = await readPromos();
  return NextResponse.json({ promos });
}

export async function POST(request: Request) {
  try {
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in at /admin first." },
        { status: 401 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const action = formData.get("action")?.toString();

      if (action === "reset") {
        const promos = await resetPromosToDefault();
        revalidatePath("/");
        revalidatePath("/admin");
        return NextResponse.json({ promos });
      }

      if (action === "clear") {
        await writePromos([]);
        revalidatePath("/");
        revalidatePath("/admin");
        return NextResponse.json({ promos: [] });
      }

      const file = formData.get("image");
      let imageUrl = formData.get("imageUrl")?.toString()?.trim() || "";

      if (file instanceof File && file.size > 0) {
        imageUrl = await saveUploadedPromoImage(file);
      }

      if (!imageUrl) {
        return NextResponse.json(
          { error: "Please upload a promo image or provide an image URL." },
          { status: 400 }
        );
      }

      const rawTitle = formData.get("title")?.toString()?.trim();
      const rawSubtitle = formData.get("subtitle")?.toString()?.trim();
      const rawBadge = formData.get("badge")?.toString()?.trim();
      const rawDuration = formData.get("durationOrPrice")?.toString()?.trim();
      const rawDescription = formData.get("description")?.toString()?.trim();

      const newPromo: PromoItem = {
        id: `promo-${Date.now()}`,
        title: rawTitle || "Special Travel Promo",
        subtitle: rawSubtitle || "Duta Jagat Wisata Exclusive Deal",
        badge: rawBadge || "LIMITED PROMO",
        durationOrPrice: rawDuration || "Special Offer",
        description:
          rawDescription ||
          "Contact Duta Jagat Wisata via WhatsApp for full itinerary, departure dates, and exclusive booking rates.",
        imageUrl,
        createdAt: new Date().toISOString(),
      };

      const existing = await readPromos();
      const updated = [newPromo, ...existing];
      await writePromos(updated);

      revalidatePath("/");
      revalidatePath("/admin");

      return NextResponse.json({ promos: updated, created: newPromo });
    } else {
      const body = await request.json();

      if (body.action === "reset") {
        const promos = await resetPromosToDefault();
        revalidatePath("/");
        revalidatePath("/admin");
        return NextResponse.json({ promos });
      }

      if (body.action === "clear") {
        await writePromos([]);
        revalidatePath("/");
        revalidatePath("/admin");
        return NextResponse.json({ promos: [] });
      }

      if (!body.imageUrl) {
        return NextResponse.json(
          { error: "imageUrl is required" },
          { status: 400 }
        );
      }

      const newPromo: PromoItem = {
        id: `promo-${Date.now()}`,
        title: body.title?.trim() || "Special Travel Promo",
        subtitle: body.subtitle?.trim() || "Duta Jagat Wisata Exclusive Deal",
        badge: body.badge?.trim() || "LIMITED PROMO",
        durationOrPrice: body.durationOrPrice?.trim() || "Special Offer",
        description:
          body.description?.trim() ||
          "Contact Duta Jagat Wisata via WhatsApp for full itinerary, departure dates, and exclusive booking rates.",
        imageUrl: body.imageUrl,
        createdAt: new Date().toISOString(),
      };

      const existing = await readPromos();
      const updated = [newPromo, ...existing];
      await writePromos(updated);

      revalidatePath("/");
      revalidatePath("/admin");

      return NextResponse.json({ promos: updated, created: newPromo });
    }
  } catch (error) {
    console.error("Failed to create promo:", error);
    return NextResponse.json(
      { error: "Failed to process promo request." },
      { status: 500 }
    );
  }
}

