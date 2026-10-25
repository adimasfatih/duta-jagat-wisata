import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePromoById } from "@/app/lib/promos-store";
import { isAdminAuthenticated } from "@/app/lib/auth";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in at /admin first." },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const promos = await deletePromoById(id);

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({ promos });
  } catch (error) {
    console.error("Failed to delete promo:", error);
    return NextResponse.json(
      { error: "Failed to delete promo." },
      { status: 500 }
    );
  }
}

