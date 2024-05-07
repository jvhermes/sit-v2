
import { CreateProcessForm } from './components/CreateProcessForm'

import prisma from "@/utils/db"
import { Title } from '@/components/Title'
import { fechData } from '@/actions/processo'


export default async function page() {

  const {atividades,cartorios,lotes} = await fechData()
  return (
    <>
      <Title name="Criar Processo" text=""></Title>
      <div className="w-10/12  mt-10">
        <CreateProcessForm atividades={atividades} cartorios={cartorios} lotes={lotes}/>
      </div>
    </>
  )
}
