"use client"


import { ProcessoCartorio } from "@prisma/client"
import { Button } from "@/components/ui/button";
import { closeProcessoCartorio } from "@/actions/processoCartorio";
import { toast } from "sonner";
import { FaFilePdf } from "react-icons/fa";

interface ButtonsProps {

  processo: ProcessoCartorio,

}
export function Buttons({ processo }: ButtonsProps) {


  async function closeProcessoEvent() {

    const res = await closeProcessoCartorio(processo.id)
    if (!res) {
      toast.error("Erro ao concluir Processo", {
        duration: 3000,
        classNames: {
          toast: "text-base"
        }
      })
    } else {
      toast.success("Processo concluído com sucesso", {
        duration: 3000,
        classNames: {
          toast: "text-base"
        }
      })
    }

  }
  return (
    <div className="m-auto py-4">
      {processo.ativo && (
        <Button onClick={() => closeProcessoEvent()}>Informar conclusão</Button>
      )}
      {!processo.ativo && (
          <Button className="flex gap-2 my-3" variant={"outline"}>Gerar PDF <FaFilePdf className="text-red-600" size={17} /></Button>

      )}
    </div>
  )
}
