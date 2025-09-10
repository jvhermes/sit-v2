

import { Title } from "@/components/Title"

import { ProcessosMenu } from "./components/ProcessosMenu"
import { fetchProcessos } from "@/actions/processo"
import { fetchProcessosCartorio } from "@/actions/processoCartorio"

export default async function PrefeituraPage() {


    const processos = await fetchProcessosCartorio()
    const processosPref = await fetchProcessos()
    return (
        <>
            <Title name="Processos" text="Listagem de processos"></Title>
            <ProcessosMenu processos={processos} processosPref={processosPref}/>
        </>
    )
}

