"use client"
import { ProcessTable } from "@/app/private/prefeitura/components/ProcessosTable"
import { Button } from "@/components/ui/button"
import { Processos, columns } from "@/app/private/prefeitura/columns"
import { useState } from "react"
import { ProcessCartorioTable } from "../../../cartorio/components/ProcessosCartorioTable"
import { ProcessosCartorio } from "../../../cartorio/columns"
import { columnsCartorio } from "../../../cartorio/columns"
interface ProcessosMenuProps {
    processos: Processos[],
    processosCartorio: ProcessosCartorio[]
}


export function ProcessosMenuEncerrados({ processos, processosCartorio }: ProcessosMenuProps) {


    const [enviados, setEnviados] = useState(false)
    const [recebidos, setRecebidos] = useState(true)


    async function changeButton(id: string) {
        if (id !== "enviados") setEnviados(false); else { setEnviados(true) }
        if (id !== "recebidos") setRecebidos(false); else { setRecebidos(true) }
    }
    return (
        <div className="w-11/12  mt-2">

            <div className="flex flex-wrap  justify-center gap-8 py-2">
                <Button variant={recebidos ? undefined : "secondary"} onClick={() => changeButton("recebidos")} >Recebidos</Button>
                <Button variant={enviados ? undefined : "secondary"} onClick={() => changeButton("enviados")}>Enviados</Button>

            </div>
            {enviados && (
                <ProcessCartorioTable data={processosCartorio} columns={columnsCartorio} />
            )}
            {recebidos && (
                <ProcessTable data={processos} columns={columns} />
            )}
        </div>
    )
}
