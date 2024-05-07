"use client"

import { Button } from "@/components/ui/button"
import { ProcessoPrefeitura, Status } from "@prisma/client"
import { FaFilePdf } from "react-icons/fa";
import { deleteProcesso, closeProcesso } from "@/actions/processo";
import { toast } from "sonner";
import { useState } from "react";
import { CloseProcessoForm } from "./CloseProcessoForm";

interface ButtonsProps {

  status: Status,
  processo: ProcessoPrefeitura,

}
export function Buttons({ status, processo }: ButtonsProps) {


  const [respostaOpen, setRespostaOpen] = useState(false)
  async function openRespostaEvent() {
    setRespostaOpen(!respostaOpen)
  }
  async function deleteProcessoEvent() {

    const res = await deleteProcesso(processo.id)
    if (!res) {
      toast.error("Erro ao excluir Processo", {
        duration: 3000,
        classNames: {
          toast: "text-base"
        }
      })
    } else {
      toast.success("Processo excluido com sucesso", {
        duration: 3000,
        classNames: {
          toast: "text-base"
        }
      })
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="m-auto p-4">
        {((status === "RESPONDIDO" || status === "RESPONDIDO_COM_ATRASO") && processo.ativo) && (
          <div className="flex gap-4">
            <Button variant={"outline"} onClick={() => openRespostaEvent()}>Abrir Encerramento</Button>
            {/* <Button variant={"outline"}>Reenvio Interno</Button> */}
          </div>
        )}
        {((status === "RESPONDIDO" || status === "RESPONDIDO_COM_ATRASO") && !processo.ativo) && (
          <div>

            <Button className="flex gap-2 my-3" variant={"outline"}>Gerar PDF <FaFilePdf className="text-red-600" size={17} /></Button>

          </div>
        )}
        {(status === "PENDENTE" || status === "ATRASADO") && (
          <div >
            <Button className="my-3" onClick={() => deleteProcessoEvent()} variant={"destructive"}>Cancelar Envio</Button>

          </div>
        )}

      </div>
      {respostaOpen && (
        <div className="w-full">
          <CloseProcessoForm processo={processo} />
        </div>
      )}
    </div>
  )
}
