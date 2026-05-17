"use client"

import { ReactNode, useState } from "react"
import { FaFilePdf } from "react-icons/fa"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteProcesso } from "@/actions/processo"
import { closeProcessoCartorio, deleteProcessoCartorio } from "@/actions/processoCartorio"
import {
  getProcessoPermissions,
  ProcessoDirection,
  ProcessoKind,
  ProcessoView,
} from "@/features/processos/permissions"
import { Status } from "@/types/types"

type ProcessoActionsProps = {
  id: number
  kind: ProcessoKind
  view: ProcessoView
  direction: ProcessoDirection
  ativo: boolean
  status?: Status
  responseSlot?: ReactNode
  closeSlot?: ReactNode
}

export function ProcessoActions({
  id,
  kind,
  view,
  direction,
  ativo,
  status,
  responseSlot,
  closeSlot,
}: ProcessoActionsProps) {
  const [responseOpen, setResponseOpen] = useState(false)
  const [closeOpen, setCloseOpen] = useState(false)
  const permissions = getProcessoPermissions({ view, direction, kind, ativo, status })

  async function cancelProcesso() {
    const res = kind === "prefeitura" ? await deleteProcesso(id) : await deleteProcessoCartorio(id)

    if (!res) {
      toast.error("Erro ao cancelar processo", {
        duration: 3000,
        classNames: { toast: "text-base" },
      })
      return
    }

    toast.success("Processo cancelado com sucesso", {
      duration: 3000,
      classNames: { toast: "text-base" },
    })
  }

  async function closeCartorioProcesso() {
    const res = await closeProcessoCartorio(id)

    if (!res.data) {
      toast.error("Erro ao concluir processo", {
        duration: 3000,
        classNames: { toast: "text-base" },
      })
      return
    }

    toast.success("Processo concluído com sucesso", {
      duration: 3000,
      classNames: { toast: "text-base" },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="m-auto flex flex-wrap justify-center gap-3 p-4">
        {permissions.canRespond && (
          <Button variant="outline" onClick={() => setResponseOpen((current) => !current)}>
            {responseOpen ? "Fechar Resposta" : "Abrir Resposta"}
          </Button>
        )}

        {permissions.isWaitingConclusion && (
          <p className="py-2 text-sm text-muted-foreground">Aguardando conclusão</p>
        )}

        {permissions.canClose && (
          <Button variant="outline" onClick={() => setCloseOpen((current) => !current)}>
            {closeOpen ? "Fechar Encerramento" : "Abrir Encerramento"}
          </Button>
        )}

        {permissions.canMarkConclusion && (
          <Button onClick={closeCartorioProcesso}>Informar conclusão</Button>
        )}

        {permissions.canCancel && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Cancelar Envio</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar cancelamento</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col">
                    <p>As informações e documentos serão excluídos.</p>
                    <Button className="my-3 w-1/2 mx-auto" onClick={cancelProcesso} variant="destructive">
                      Cancelar Envio
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

        {permissions.canGeneratePdf && (
          <Button className="flex gap-2 my-2" variant="outline">
            Gerar PDF <FaFilePdf className="text-red-600" size={17} />
          </Button>
        )}
      </div>

      {responseOpen && responseSlot}
      {closeOpen && closeSlot}
    </div>
  )
}
