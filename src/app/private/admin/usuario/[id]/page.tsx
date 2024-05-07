
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import prisma from '@/utils/db'
import { Title } from '@/components/Title'
import UserForm from './components/userForm'
import { Cartorio, Perfil, Setor } from '@prisma/client'

export type UserFetch = {
    id:string
    nome: string,
    perfil: Perfil,
    email: string,
    avatar: string,
    ativo: boolean,
    cartorio: {
      nome: string,
      id:string
    } | null,
    setor: {
      nome: string,
      id:string
    } | null

}

export type CreateUserFetch = {
  cartorios: Cartorio[],
  setores:Setor[]
}

const fetchCreateUserData = async():Promise<CreateUserFetch> =>{
    const cartorios = await prisma.cartorio.findMany()
    const setores = await prisma.setor.findMany()

    return{cartorios,setores}
}
const fechData = async (id: string): Promise<UserFetch | null> => {

  if (id === "criar") {
    return null
  }
  const user = await prisma.usuario.findFirst({
    where: {
      id: id
    },
    select: {
      id:true,
      nome: true,
      email: true,
      avatar: true,
      perfil: true,
      ativo: true,
      cartorio: {
        select: {
          nome: true,
          id:true
        }
      },
      setor: {
        select: {
          nome: true,
          id:true
        }
      }
    }
  });

  return user;

}


export default async function page({ params }: { params: { id: string } }) {

  const user = await fechData(params.id)

  const data = await fetchCreateUserData()

  return (
    <>
      {params.id === "criar" && (
        <>
          <Title name={`Criar Usuário`} text='Alterar detalhes desta conta' />
          <div className='w-10/12 mt-10'>
            <div className='py-6'>
              <Link href={"/private/admin"}>
                <Button variant={"secondary"}>Retornar</Button>
              </Link>
            </div>
            <section className='p-10 flex-col mb-5 border rounded flex  gap-6'>
              <UserForm data={data} user={null}></UserForm>
            </section>
          </div>
        </>
      ) || user && (

        <>

          <Title name={`Edidar Usuário`} text='Alterar detalhes desta conta' />
          <div className='w-10/12 mt-10'>
            <div className='py-6'>
              <Link href={"/private/admin"}>
                <Button variant={"secondary"}>Retornar</Button>
              </Link>
            </div>
            <section className='p-10 flex-col mb-5 border rounded flex  gap-6'>
              <UserForm data={data} user={user}></UserForm>
            </section>
          </div>
        </>
      ) || (
          <div className='mt-10'>
            <p>{"Usuário não encontrado :("}</p>
          </div>
        )}

    </>
  )
}
