
import { Title } from "@/components/Title"
import { ProcessosMenuEncerrados } from "./components/ProcessosMenu"
import { fetchProcessosInativo } from "@/actions/processo"
import { CartorioCollumn, PrefeituraCollumn } from "@/types/types"
import { fetchProcessosCartorioInativo } from "@/actions/processoCartorio"


export default async function PrefeituraPage() {


    const processosP: PrefeituraCollumn[] = await fetchProcessosInativo()
    const processosC: CartorioCollumn[] = await fetchProcessosCartorioInativo()

    return (
        <>
            <Title name="Processos" text="Listagem de processos encerrados"></Title>
            <ProcessosMenuEncerrados processosCartorio={processosC} processos={processosP} />
        </>
    )
}

