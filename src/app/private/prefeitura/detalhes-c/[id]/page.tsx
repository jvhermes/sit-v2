import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Title } from "@/components/Title"
import { getProcessoCartorio } from "@/actions/processoCartorio"
import { ProcessoCartorioDetail } from "@/types/types"
import { ProcessoActions } from "@/features/processos/components/ProcessoActions"
import { ProcessoCartorioDetails } from "@/features/processos/components/ProcessoCartorioDetails"

export default async function page({ params }: { params: { id: string } }) {
  const processo = await getProcessoCartorio(params.id) as ProcessoCartorioDetail | null

  return (
    <>
      <Title name="Detalhes do Processo" text="" />

      {processo ? (
        <div className="w-10/12 mt-10">
          <div className="py-6">
            <Link href="/private/prefeitura">
              <Button variant="outline">Retornar</Button>
            </Link>
          </div>
          <ProcessoCartorioDetails
            processo={processo}
            descricaoLabel="Descrições Recebidas:"
            observacaoLabel="Observações Recebidas:"
            actions={
              <ProcessoActions
                id={processo.id}
                kind="cartorio"
                view="prefeitura"
                direction="recebidos"
                ativo={processo.ativo}
              />
            }
          />
        </div>
      ) : (
        <div className="mt-10">
          <p>{"Processo não encontrado :("}</p>
        </div>
      )}
    </>
  )
}
