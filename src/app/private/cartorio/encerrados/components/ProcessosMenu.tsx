"use client"
import { ProcessTable } from "@/app/private/prefeitura/components/ProcessosTable"
import { Processos, createPrefeituraColumns } from "@/app/private/prefeitura/columns"
import { useMemo, useState } from "react"
import { ProcessCartorioTable } from "../../../cartorio/components/ProcessosCartorioTable"
import { createCartorioColumns, ProcessosCartorio } from "../../../cartorio/columns"
import { ProcessDirection, ProcessDirectionTabs } from "@/components/ProcessDirectionTabs"
interface ProcessosMenuProps {
    processos: Processos[],
    processosCartorio: ProcessosCartorio[]
}


export function ProcessosMenuEncerrados({ processos, processosCartorio }: ProcessosMenuProps) {


    const [direction, setDirection] = useState<ProcessDirection>("recebidos")
    const processosEnviadosColumns = useMemo(() => createCartorioColumns({
        detailBasePath: "/private/cartorio/detalhes-c",
        canDelete: false,
    }), [])
    const processosRecebidosColumns = useMemo(() => createPrefeituraColumns({
        detailBasePath: "/private/cartorio/detalhes-p",
        canDelete: false,
    }), [])

    return (
        <div className="w-11/12  mt-2">

            <div className="flex flex-wrap  justify-center gap-8 py-2">
                <ProcessDirectionTabs value={direction} onChange={setDirection} />

            </div>
            {direction === "enviados" && (
                <ProcessCartorioTable data={processosCartorio} columns={processosEnviadosColumns} />
            )}
            {direction === "recebidos" && (
                <ProcessTable data={processos} columns={processosRecebidosColumns} />
            )}
        </div>
    )
}
