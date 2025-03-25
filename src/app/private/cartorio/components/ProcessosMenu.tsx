"use client"
import { ProcessTable } from "@/app/private/prefeitura/components/ProcessosTable"
import { Button } from "@/components/ui/button"
import { Processos, columns } from "@/app/private/prefeitura/columns"
import { useState } from "react"
import { ProcessCartorioTable } from "../../cartorio/components/ProcessosCartorioTable"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { columnsCartorio, ProcessosCartorio } from "../../cartorio/columns"
import Link from "next/link"
interface ProcessosMenuProps {
    processos: ProcessosCartorio[],
    processosPref: Processos[]
}

type ProcessoState = "recebidos" | "enviados"

export function ProcessosMenu({ processos, processosPref }: ProcessosMenuProps) {

    const processoList = processos
    const processoListPrefeitura = processosPref
    const [checked,setChecked] = useState(false)



    return (
        <div className="w-11/12  mt-12">

    
            <div className="py-3 flex justify-between">
                <div className="flex items-center space-x-2 ml-5">
                    <Switch id="enviados" onCheckedChange={() => setChecked(!checked)} />
                    <Label htmlFor="enviados">Enviados</Label>
                 
                </div>
                <Link href={"/private/cartorio/criar"}>
                    <Button>Novo Processo</Button>

                </Link>
            </div>

            {(checked) && (
                <div>
                    <ProcessCartorioTable data={processoList} columns={columnsCartorio} />
                </div>
            )}
            {!checked && (
                <ProcessTable data={processoListPrefeitura} columns={columns} />
            )}
        </div>
    )
}
