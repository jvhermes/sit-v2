"use client"
import { ProcessTable } from "@/app/private/prefeitura/components/ProcessosTable"
import { Button } from "@/components/ui/button"
import { Processos, columns } from "@/app/private/prefeitura/columns"
import { useState } from "react"
import { fetchProcessos } from "@/actions/processo"
import { ProcessCartorioTable } from "../../cartorio/components/ProcessosCartorioTable"
import { fetchProcessosCartorio } from "@/actions/processoCartorio"

import { columnsCartorio, ProcessosCartorio } from "../../cartorio/columns"
interface ProcessosMenuProps {
    processos: ProcessosCartorio[],
    processosPref: Processos[]
}

type ProcessoState = "recebidos" | "enviados"

export function ProcessosMenu({ processos, processosPref }: ProcessosMenuProps) {

    const processoList = processos
    const processoListPrefeitura = processosPref
    const [processoState, setProcessoState] = useState<ProcessoState>("recebidos")

    const [enviados, setEnviados] = useState(false)
    const [recebidos, setRecebidos] = useState(true)

    async function changeButton(id: ProcessoState) {
        if (id !== "enviados") setEnviados(false); else {
            if (processoState !== "enviados") {

                setEnviados(true)
                setProcessoState("enviados")
            }
        }
        if (id !== "recebidos") setRecebidos(false); else {
            if (processoState !== "recebidos") {
                setRecebidos(true)
                setProcessoState("recebidos")
            }
        }

    }


    return (
        <div className="w-11/12  mt-2">

            <div className="flex flex-wrap  justify-center gap-5 py-2">
                <Button variant={recebidos ? undefined : "secondary"} className="w-[150px]" onClick={() => changeButton("recebidos")} >Recebidos</Button>
                <Button variant={enviados ? undefined : "secondary"} className="w-[150px]" onClick={() => changeButton("enviados")}>Enviados</Button>

            </div>

            {(enviados) && (
                <div>
                    <ProcessCartorioTable data={processoList} columns={columnsCartorio} />
                </div>
            )}
            {recebidos && (
                <ProcessTable data={processoListPrefeitura} columns={columns} />
            )}
        </div>
    )
}
