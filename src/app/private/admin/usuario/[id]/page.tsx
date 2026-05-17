
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { Title } from '@/components/Title'
import UserForm from './components/userForm'
import { Cartorio, Perfil, Setor } from '@/types/types'
import { listSetor } from '@/actions/setor'
import { listCartorio } from '@/actions/cartorio'
import { getOne } from '@/actions/user'

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
    const cartorios = await listCartorio()
    const setores = await listSetor()
    
    return{cartorios,setores}
}
const fechData = async (id: string): Promise<UserFetch | null> => {

  if (id === "criar") {
    return null
  }
  const res = await getOne(id)

  const user = res
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
                <Button variant={"outline"}>Retornar</Button>
              </Link>
            </div>
            <section className='p-10 flex-col mb-5 bg-card border border-primary/15 rounded shadow-sm flex  gap-6'>
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
                <Button variant={"outline"}>Retornar</Button>
              </Link>
            </div>
            <section className='p-10 flex-col mb-5 bg-card border border-primary/15 rounded shadow-sm flex  gap-6'>
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
