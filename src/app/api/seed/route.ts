import { NextResponse } from "next/server";
import { getAdminData } from "@/actions/data";

export async function GET() {
    return NextResponse.json(await getAdminData())
}
