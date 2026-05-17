"use client"
import { ProcessTable } from "@/app/private/prefeitura/components/ProcessosTable"
import { Button } from "@/components/ui/button"
import { Processos, createPrefeituraColumns } from "@/app/private/prefeitura/columns"
import { useMemo, useState } from "react"
import { ProcessCartorioTable } from "../../cartorio/components/ProcessosCartorioTable"
import { ProcessDirection, ProcessDirectionTabs } from "@/components/ProcessDirectionTabs"
import { createCartorioColumns, ProcessosCartorio } from "../../cartorio/columns"
import Link from "next/link"
interface ProcessosMenuProps {
    processos: ProcessosCartorio[],
    processosPref: Processos[]
}

export function ProcessosMenu({ processos, processosPref }: ProcessosMenuProps) {

    const processoList = processos
    const processoListPrefeitura = processosPref
    const [direction, setDirection] = useState<ProcessDirection>("recebidos")
    const processosEnviadosColumns = useMemo(() => createCartorioColumns({
        detailBasePath: "/private/cartorio/detalhes-c",
        canDelete: true,
    }), [])
    const processosRecebidosColumns = useMemo(() => createPrefeituraColumns({
        detailBasePath: "/private/cartorio/detalhes-p",
        canDelete: false,
    }), [])



    return (
        <div className="w-11/12  mt-12">

    
            <div className="py-3 flex justify-between">
                <ProcessDirectionTabs value={direction} onChange={setDirection} />
                <Link href={"/private/cartorio/criar"}>
                    <Button>Novo Processo</Button>

                </Link>
            </div>

            {direction === "enviados" && (
                <div>
                    <ProcessCartorioTable data={processoList} columns={processosEnviadosColumns} />
                </div>
            )}
            {direction === "recebidos" && (
                <ProcessTable data={processoListPrefeitura} columns={processosRecebidosColumns} />
            )}
        </div>
    )
}
