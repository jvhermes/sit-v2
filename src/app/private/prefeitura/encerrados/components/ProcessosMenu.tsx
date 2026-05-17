"use client"
import { ProcessTable } from "../../components/ProcessosTable"
import { Processos, createPrefeituraColumns } from "../../columns"
import { useMemo, useState } from "react"
import { ProcessCartorioTable } from "../../../cartorio/components/ProcessosCartorioTable"
import { createCartorioColumns, ProcessosCartorio } from "../../../cartorio/columns"
import { ProcessDirection, ProcessDirectionTabs } from "@/components/ProcessDirectionTabs"
interface ProcessosMenuProps {
    processos: Processos[],
    processosCartorio:ProcessosCartorio[]
}


export function ProcessosMenuEncerrados({ processos,processosCartorio }: ProcessosMenuProps) {


    const [direction, setDirection] = useState<ProcessDirection>("recebidos")
    const processosEnviadosColumns = useMemo(() => createPrefeituraColumns({
        detailBasePath: "/private/prefeitura/detalhes-p",
        canDelete: false,
    }), [])
    const processosRecebidosColumns = useMemo(() => createCartorioColumns({
        detailBasePath: "/private/prefeitura/detalhes-c",
        canDelete: false,
    }), [])

    return (
        <div className="w-11/12  mt-2">

            <div className="flex flex-wrap  justify-center gap-8 py-2">
                <ProcessDirectionTabs value={direction} onChange={setDirection} />
           
            </div>
            {direction === "enviados"  &&(
                <ProcessTable data={processos} columns={processosEnviadosColumns} />
            )}
            {direction === "recebidos" && (
                <ProcessCartorioTable data={processosCartorio} columns={processosRecebidosColumns}/>
            )}
        </div>
    )
}
