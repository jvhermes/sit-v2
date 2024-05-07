"use client"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoteList } from "./loteList";
import { AdminTable } from "./adminTable";
import { Atividade, Cartorio, Setor, Usuario } from "@prisma/client";

import { adminColumns,UserTableType,usuariosColumns} from "./columns";



interface AdminProps  {
    cartorios:Cartorio[]
    setores:Setor[]
    usuarios:UserTableType[]
    atividades:Atividade[]
}
export function AdminMenu({atividades,cartorios,setores,usuarios} : AdminProps) {

    const [lotesSelect, setLotesSelect] = useState(false)
    const [atividadeSelect, setAtividadeSelect] = useState(true)
    const [cartorioSelect, setCartorioSelect] = useState(false)
    const [setorSelect, setSetorSelect] = useState(false)
    const [userSelect, setUserSelect] = useState(false)

    function changeButton(type: string) {
        if (type !== "atividade") setAtividadeSelect(false); else { setAtividadeSelect(true) }
        if (type !== "cartorio") setCartorioSelect(false); else { setCartorioSelect(true) }
        if (type !== "lote") setLotesSelect(false); else { setLotesSelect(true) }
        if (type !== "setor") setSetorSelect(false); else { setSetorSelect(true) }
        if (type !== "user") setUserSelect(false); else { setUserSelect(true) }
    }
    return (
        <section className="w-11/12 rounded flex gap-10 border flex-wrap p-4 mt-10 justify-center md:flex-nowrap">
            <div className="flex flex-col m-6 gap-6 w-[200px]">
                <Button variant={atividadeSelect ? undefined : "secondary"} onClick={() => changeButton("atividade")} >Atividades</Button>
                <Button variant={cartorioSelect ? undefined : "secondary"} onClick={() => changeButton("cartorio")} >Cartórios</Button>
                <Button variant={lotesSelect ? undefined : "secondary"} onClick={() => changeButton("lote")} >Lotes</Button>
                <Button variant={setorSelect ? undefined : "secondary"} onClick={() => changeButton("setor")} >Setores</Button>
                <Button variant={userSelect ? undefined : "secondary"} onClick={() => changeButton("user")} >Usuários</Button>
            </div>

            <div className="w-full mx-auto">
                <Card className="max-h-[700px] min-h-[400px] overflow-y-auto p-4">
                    <CardContent>
                        {lotesSelect &&
                            <LoteList/>
                        }
                        {atividadeSelect &&
                            <AdminTable tipo="Atividade" columns={adminColumns} data={atividades}/>
                        }
                        {cartorioSelect &&
                            <AdminTable tipo="Cartorio" columns={adminColumns} data={cartorios}/>
                        }
                        {setorSelect &&
                            <AdminTable tipo="Setor" columns={adminColumns} data={setores}/>
                        }
                        {userSelect &&
                            <AdminTable tipo="Usuário" columns={usuariosColumns} data={usuarios} />
                        }
                    </CardContent>
                </Card>
            </div>

        </section>
    )
}
