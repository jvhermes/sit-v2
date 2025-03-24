import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs"

export async function GET() {

    const user = await prisma.usuario.findMany()

    if (user.length <= 0) {

        const setor = await prisma.setor.create({
            data: {
                nome: "setor base"
            }
        })

        const cartorio = await prisma.cartorio.create({
            data: {
                nome: "cartorio1"
            }
        })

        await prisma.tipoDeProcesso.create({
            data: {
                nome: "Desmembramento",
                tipo: "DESMEMBRAMENTO"
            }
        })
        await prisma.tipoDeProcesso.create({
            data: {
                nome: "Remembramento",
                tipo: "REMEMBRAMENTO"
            }
        })

        await prisma.tipoDeProcesso.create({
            data: {
                nome: "Outros",
                tipo: "OUTRO"
            }
        })
        const hashedSenha = await bcrypt.hash("123456", 10);

        const userCriado = await prisma.usuario.create({
            data: {
                nome: "admin",
                senha: hashedSenha,
                email: "admin@admin.com",
                setor_id: setor.id,
                cartorio_id: cartorio.id,
                avatar: "1",
                perfil: "ADMIN"
            }
        })
        return NextResponse.json(userCriado)

    } else {

        return NextResponse.json(user)
    }

}