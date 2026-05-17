import { Status } from "@/types/types"

export type ProcessoView = "prefeitura" | "cartorio" | "admin"
export type ProcessoDirection = "recebidos" | "enviados"
export type ProcessoKind = "prefeitura" | "cartorio"

type ProcessoPermissionInput = {
  view: ProcessoView
  direction: ProcessoDirection
  kind: ProcessoKind
  ativo: boolean
  status?: Status
}

export function getProcessoPermissions({
  direction,
  kind,
  ativo,
  status,
}: ProcessoPermissionInput) {
  const isAnswered = status === Status.RESPONDIDO || status === Status.RESPONDIDO_COM_ATRASO
  const isPending = status === Status.PENDENTE || status === Status.ATRASADO

  return {
    canCancel: ativo && direction === "enviados" && (kind === "cartorio" || isPending),
    canClose: ativo && direction === "enviados" && kind === "prefeitura" && isAnswered,
    canRespond: ativo && direction === "recebidos" && kind === "prefeitura" && isPending,
    canMarkConclusion: ativo && direction === "recebidos" && kind === "cartorio",
    canGeneratePdf: !ativo,
    isWaitingConclusion: ativo && direction === "recebidos" && kind === "prefeitura" && isAnswered,
  }
}

export function getReturnHref(view: ProcessoView) {
  if (view === "cartorio") return "/private/cartorio"
  if (view === "prefeitura") return "/private/prefeitura"

  return "/private/admin"
}
