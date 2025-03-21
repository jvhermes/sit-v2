"use client"
import { ProcessTable } from "./ProcessosTable"
import { Button } from "@/components/ui/button"
import { Processos, columns } from "../columns"
import { useState } from "react"
import { ProcessCartorioTable } from "../../cartorio/components/ProcessosCartorioTable"
import { ProcessosCartorio, columnsCartorio } from "../../cartorio/columns"

interface ProcessosMenuProps {
    processos: Processos[],
    processosCart: ProcessosCartorio[]
}

type ProcessoState = "recebidos" | "enviados"

export function ProcessosMenu({ processos, processosCart }: ProcessosMenuProps) {

    const processoList = processos
    const processoListCartorio = processosCart

    const [processoState, setProcessoState] = useState<ProcessoState>("enviados")
    const [enviados, setEnviados] = useState(true)
    const [recebidos, setRecebidos] = useState(false)

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

            <div className="flex flex-wrap  justify-center gap-5 mt-8">
                <Button variant={enviados ? undefined : "secondary"} className="w-[150px]" onClick={() => changeButton("enviados")}>Enviados</Button>
                <Button variant={recebidos ? undefined : "outline"} className="w-[150px]" onClick={() => changeButton("recebidos")} >Recebidos</Button>

            </div>
            <div className="my-6">
            {(enviados) && (

                <ProcessTable data={processoList} columns={columns} />

            )}
            {recebidos && (
                <ProcessCartorioTable data={processoListCartorio} columns={columnsCartorio} />
            )}
            </div>


        </div>
    )
}
