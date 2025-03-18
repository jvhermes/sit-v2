
import { CreateProcessForm } from './components/CreateProcessForm'

import { Title } from '@/components/Title'
import { fechData } from '@/actions/processo'


export default async function page() {

  const {atividades,cartorios,lotes,tipos} = await fechData()
  return (
    <>
      <Title name="Criar Processo" text=""></Title>
      <div className="w-10/12  mt-10">
        <CreateProcessForm atividades={atividades} cartorios={cartorios} lotes={lotes} tipos={tipos}/>
      </div>
    </>
  )
}
