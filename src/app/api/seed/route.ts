import { NextResponse } from "next/server";
import api from "@/lib/api";

export async function GET() {

    const user = await api.post('/data')

    return NextResponse.json(user)


}