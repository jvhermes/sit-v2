import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs"

export async function POST() {
    
    const user = await prisma.usuario.findMany()

    if(!user){

        const setor = await prisma.setor.create({
            data:{
                nome:"setor base"
            }
        })

        const cartorio = await prisma.cartorio.create({
            data:{
                nome:"cartorio1"
            }
        })
        const hashedSenha = await bcrypt.hash("123456", 10);

        const user = await prisma.usuario.create({
            data:{
                nome:"admin",
                senha:hashedSenha,
                email:"admin@admin.com",
                setor_id:setor.id,
                cartorio_id:cartorio.id,
                avatar:"1",
                perfil:"ADMIN"
            }
        })
        return NextResponse.json(user)

    }else{
        
        return NextResponse.json("usuario inicial já criado")
    }

}