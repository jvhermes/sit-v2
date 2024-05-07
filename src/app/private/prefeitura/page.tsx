

import { Title } from "@/components/Title"
import { auth } from "@/auth"
import { ProcessosMenu } from "./components/ProcessosMenu"
import { fetchProcessos } from "@/actions/processo"
import { fetchProcessosCartorio } from "@/actions/processoCartorio"


export default async function PrefeituraPage() {

    const session = await auth()
    const perfil = session?.user.perfil
    
    const processos = await fetchProcessos(true)
    const processosCart = await fetchProcessosCartorio(true)
    return (
        <>
            <Title name="Processos" text="Listagem de processos"></Title>
            <ProcessosMenu processos={processos} processosCart={processosCart} />
        </>
    )
}

