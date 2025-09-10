"use client"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { useState } from "react";
import { LoteList } from "./loteList";
import { AdminTable } from "./adminTable";
import { Atividade, Cartorio, Setor, Tipo} from "../../../../types/types";

import { adminColumns,UserTableType,usuariosColumns,tipoColumns} from "./columns";


interface AdminProps  {
    cartorios:Cartorio[]
    setores:Setor[]
    usuarios:UserTableType[]
    atividades:Atividade[]
    tipos:Tipo[]
}
export function AdminMenu({atividades,cartorios,setores,usuarios,tipos} : AdminProps) {

    const [lotesSelect, setLotesSelect] = useState(false)
    const [atividadeSelect, setAtividadeSelect] = useState(true)
    const [cartorioSelect, setCartorioSelect] = useState(false)
    const [setorSelect, setSetorSelect] = useState(false)
    const [userSelect, setUserSelect] = useState(false)
    const [tipoSelect, setTipoSelect] = useState(false)

    function changeButton(type: string) {
        if (type !== "atividade") setAtividadeSelect(false); else { setAtividadeSelect(true) }
        if (type !== "cartorio") setCartorioSelect(false); else { setCartorioSelect(true) }
        if (type !== "lote") setLotesSelect(false); else { setLotesSelect(true) }
        if (type !== "setor") setSetorSelect(false); else { setSetorSelect(true) }
        if (type !== "user") setUserSelect(false); else { setUserSelect(true) }
        if (type !== "tipo") setTipoSelect(false); else { setTipoSelect(true) }
    }
    return (
        <section className="w-11/12 rounded flex gap-10 border flex-wrap p-4 my-10 bg-white justify-center md:flex-nowrap">
            <div className="flex flex-col m-6 gap-6 w-[200px]">
                <Button variant={atividadeSelect ? undefined : "secondary"} onClick={() => changeButton("atividade")} >Atividades</Button>
                <Button variant={cartorioSelect ? undefined : "secondary"} onClick={() => changeButton("cartorio")} >Cartórios</Button>
                <Button variant={lotesSelect ? undefined : "secondary"} onClick={() => changeButton("lote")} >Lotes</Button>
                <Button variant={setorSelect ? undefined : "secondary"} onClick={() => changeButton("setor")} >Setores</Button>
                <Button variant={tipoSelect ? undefined : "secondary"} onClick={() => changeButton("tipo")} >Tipos de Processo</Button>
                <Button variant={userSelect ? undefined : "secondary"} onClick={() => changeButton("user")} >Usuários</Button>
               
            </div>

            <div className="w-full mx-auto my">
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
                        {tipoSelect &&
                            <AdminTable tipo="Tipo" columns={tipoColumns} data={tipos} />
                        }
                    </CardContent>
                </Card>
            </div>

        </section>
    )
}
