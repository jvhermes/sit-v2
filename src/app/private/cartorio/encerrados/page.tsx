
import { Title } from "@/components/Title"
import { ProcessosMenuEncerrados } from "./components/ProcessosMenu"
import { fetchProcessosInativo } from "@/actions/processo"

import { fetchProcessosCartorioInativo } from "@/actions/processoCartorio"


export default async function PrefeituraPage() {


    const processos = await fetchProcessosInativo()
    const processosCartorio = await fetchProcessosCartorioInativo()
    return (
        <>
            <Title name="Processos" text="Listagem de processos encerrados"></Title>
            <ProcessosMenuEncerrados processosCartorio={processosCartorio} processos={processos} />
        </>
    )
}

