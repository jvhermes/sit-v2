import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Title } from "@/components/Title"
import { getProcessoPrefeitura } from "@/actions/processo"
import { ProcessoPrefeituraDetail } from "@/types/types"
import { ProcessoActions } from "@/features/processos/components/ProcessoActions"
import { ProcessoPrefeituraDetails } from "@/features/processos/components/ProcessoPrefeituraDetails"
import { CloseProcessoForm } from "./components/CloseProcessoForm"

export default async function page({ params }: { params: { id: string } }) {
  const processo = await getProcessoPrefeitura(params.id) as ProcessoPrefeituraDetail | null

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
          <ProcessoPrefeituraDetails
            processo={processo}
            actions={
              <ProcessoActions
                id={processo.id}
                kind="prefeitura"
                view="prefeitura"
                direction="enviados"
                ativo={processo.ativo}
                status={processo.status}
                closeSlot={<CloseProcessoForm processo={processo} />}
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
