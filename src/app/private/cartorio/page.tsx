

import { Title } from "@/components/Title"

import { ProcessosMenu } from "./components/ProcessosMenu"
import { fetchProcessos } from "@/actions/processo"
import { fetchProcessosCartorio } from "@/actions/processoCartorio"
import { CartorioCollumn, PrefeituraCollumn } from "@/types/types"

export default async function PrefeituraPage() {


    const processosP: PrefeituraCollumn[]  = await fetchProcessos()
    const processosC: CartorioCollumn[] = await fetchProcessosCartorio()

    return (
        <>
            <Title name="Processos" text="Listagem de processos"></Title>
            <ProcessosMenu processos={processosC} processosPref={processosP} />
        </>
    )
}

