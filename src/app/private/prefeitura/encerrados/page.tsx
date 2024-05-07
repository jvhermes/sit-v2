

import { Title } from "@/components/Title"
import { auth } from "@/auth"
import { ProcessosMenuEncerrados } from "./components/ProcessosMenu"
import { fetchProcessos } from "@/actions/processo"

import { fetchProcessosCartorio } from "@/actions/processoCartorio"


export default async function PrefeituraPage() {

    const session = await auth()
    const perfil = session?.user.perfil
    
    const processos = await fetchProcessos(false)
    const processosCartorio = await fetchProcessosCartorio(false)
    return (
        <>
            <Title name="Processos" text="Listagem de processos encerrados"></Title>
            <ProcessosMenuEncerrados processosCartorio={processosCartorio} processos={processos} />
        </>
    )
}

