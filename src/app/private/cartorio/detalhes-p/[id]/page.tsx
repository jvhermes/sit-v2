import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Title } from "@/components/Title"
import { getProcessoPrefeitura } from "@/actions/processo"
import { ProcessoPrefeituraDetail } from "@/types/types"
import { ProcessoActions } from "@/features/processos/components/ProcessoActions"
import { ProcessoPrefeituraDetails } from "@/features/processos/components/ProcessoPrefeituraDetails"
import { RespostaLoteForm } from "./components/RespostaLoteForm"
import { RespostaPessoaForm } from "./components/RespostaPessoaForm"

export type DescricaoAprovacao = {
  matricula: string
  data_registro: Date
  transcricao: string
  lote: string
  descricao_id: string
}

export default async function page({ params }: { params: { id: string } }) {
  const processo = await getProcessoPrefeitura(params.id) as ProcessoPrefeituraDetail | null

  if (!processo) {
    return (
      <>
        <Title name="Detalhes do Processo" text="" />
        <div className="mt-10">
          <p>{"Processo não encontrado :("}</p>
        </div>
      </>
    )
  }

  const descricaoRespostaList: DescricaoAprovacao[] = processo.descricao_lotes.map((item) => ({
    lote: item.lote,
    matricula: "",
    data_registro: new Date(),
    transcricao: "",
    descricao_id: item.id,
  }))

  const responseSlot = processo.tipo.tipo !== "OUTRO" ? (
    <RespostaLoteForm processo={processo} descricaoRespostaList={descricaoRespostaList} />
  ) : (
    <RespostaPessoaForm processo={processo} />
  )

  return (
    <>
      <Title name="Detalhes do Processo" text="" />
      <div className="w-10/12 mt-10">
        <div className="py-6">
          <Link href="/private/cartorio">
            <Button variant="outline">Retornar</Button>
          </Link>
        </div>
        <ProcessoPrefeituraDetails
          processo={processo}
          descricaoLabel="Descrições Recebidas:"
          observacaoLabel="Observações Recebidas:"
          respostaDescricaoLabel="Descrições Enviadas:"
          respostaObservacaoLabel="Observações Enviadas:"
          actions={
            <ProcessoActions
              id={processo.id}
              kind="prefeitura"
              view="cartorio"
              direction="recebidos"
              ativo={processo.ativo}
              status={processo.status}
              responseSlot={responseSlot}
            />
          }
        />
      </div>
    </>
  )
}
