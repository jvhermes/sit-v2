"use client"
import { ProcessTable } from "./ProcessosTable"
import { Button } from "@/components/ui/button"
import { createPrefeituraColumns } from "../columns"
import { PrefeituraCollumn } from "@/types/types"
import { useMemo, useState } from "react"
import { ProcessCartorioTable } from "../../cartorio/components/ProcessosCartorioTable"
import { createCartorioColumns } from "../../cartorio/columns"
import { CartorioCollumn } from "@/types/types"
import { ProcessDirection, ProcessDirectionTabs } from "@/components/ProcessDirectionTabs"
import Link from "next/link"

interface ProcessosMenuProps {
    processosP: PrefeituraCollumn[],
    processosC: CartorioCollumn[]
}


export function ProcessosMenu({ processosP, processosC }: ProcessosMenuProps) {


    const [direction, setDirection] = useState<ProcessDirection>("recebidos")
    const processosEnviadosColumns = useMemo(() => createPrefeituraColumns({
        detailBasePath: "/private/prefeitura/detalhes-p",
        canDelete: true,
    }), [])
    const processosRecebidosColumns = useMemo(() => createCartorioColumns({
        detailBasePath: "/private/prefeitura/detalhes-c",
        canDelete: false,
    }), [])


    return (
        <div className="w-11/12  mt-12">

     
            <div className="py-3 flex justify-between">
                <ProcessDirectionTabs value={direction} onChange={setDirection} />
                <Link href={"/private/prefeitura/criar"}>
                    <Button  >Novo Processo</Button>

                </Link>

            </div>

            <div className="my-3">
                {direction === "enviados" && (

                    <ProcessTable data={processosP} columns={processosEnviadosColumns} />

                )}
                {direction === "recebidos" && (
                    <ProcessCartorioTable data={processosC} columns={processosRecebidosColumns} />
                )}
            </div>


        </div>
    )
}
