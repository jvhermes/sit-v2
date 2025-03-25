"use client"

import { Button } from "@/components/ui/button"
import { ProcessoPrefeitura, Status, TipoDeProcesso } from "@prisma/client"
import { RespostaLoteForm } from './RespostaLoteForm'
import { DescricaoAprovacao } from "../page"
import { useState } from "react";
import { RespostaPessoaForm } from "./RespostaPessoaForm";
import { FaFilePdf } from "react-icons/fa";

interface ButtonsProps {

  status: Status,
  processo: ProcessoPrefeitura,
  descricaoRespostaList: DescricaoAprovacao[],
  tipo:TipoDeProcesso | undefined
}
export function Buttons({ status, processo,tipo, descricaoRespostaList }: ButtonsProps) {

  const [respostaOpen, setRespostaOpen] = useState(false)
  async function openRespostaEvent() {
    setRespostaOpen(!respostaOpen)
  }

  return (
    <div className="w-full flex flex-col">

      {((status === "PENDENTE" || status === "ATRASADO") && processo.ativo) && (
        <div className="m-auto">
          <Button variant={"outline"} onClick={() => openRespostaEvent()} >Abrir Resposta</Button>
        </div>
      )}
     {((status === "RESPONDIDO" || status === "RESPONDIDO_COM_ATRASO") && processo.ativo) && (
        <div className="m-auto">
          <p>Aguardando Conclusão</p>
        </div>
      )}
      {(!processo.ativo) && (
        <div className="m-auto">
          <Button className="flex gap-2 my-2 " variant={"outline"}>Gerar PDF <FaFilePdf className="text-red-600" size={17} /></Button>

        </div>
      )}
      {(tipo?.tipo !== "OUTRO" && respostaOpen) && (
        <div className='my-3'>
          <RespostaLoteForm processo={processo} descricaoRespostaList={descricaoRespostaList}></RespostaLoteForm>
        </div>
      )}
      {(tipo?.tipo === "OUTRO" && respostaOpen) && (
        <div className='my-3'>
          <RespostaPessoaForm processo={processo}></RespostaPessoaForm>
        </div>
      )}
    </div>
  )
}
