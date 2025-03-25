
import { CreateProcessForm } from './components/CreateProcessForm'

import { Title } from '@/components/Title'
import { fechDataCartorio } from '@/actions/processoCartorio'


export default async function page() {

  const {atividades,setores,lotes,tipos} = await fechDataCartorio()
  return (
    <>
      <Title name="Criar Processo" text=""></Title>
      <div className="w-10/12  mt-10">
        <CreateProcessForm atividades={atividades} setores={setores} lotes={lotes} tipos={tipos}/>
      </div>
    </>
  )
}
