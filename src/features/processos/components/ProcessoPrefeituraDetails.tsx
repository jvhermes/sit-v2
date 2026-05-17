import { ReactNode } from "react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ProcessoPrefeituraDetail } from "@/types/types"

type ProcessoPrefeituraDetailsProps = {
  processo: ProcessoPrefeituraDetail
  actions: ReactNode
  descricaoLabel?: string
  observacaoLabel?: string
  respostaDescricaoLabel?: string
  respostaObservacaoLabel?: string
  respostaLabel?: string
}

export function ProcessoPrefeituraDetails({
  processo,
  actions,
  descricaoLabel = "Descrições Enviadas:",
  observacaoLabel = "Observações Enviadas:",
  respostaDescricaoLabel = "Descrições Recebidas:",
  respostaObservacaoLabel = "Observações Recebidas:",
  respostaLabel = "Resposta:",
}: ProcessoPrefeituraDetailsProps) {
  return (
    <section data-print-area className="p-10 flex-col mb-5 border border-primary/15 rounded bg-card flex gap-4 shadow-sm">
      <h2 className="text-xl">Processo {processo.num_processo}</h2>
      <div className="flex flex-wrap gap-3 my-2">
        <p className="py-2 pr-2">Tipo: <strong>{processo.tipo.nome.toLowerCase()}</strong></p>
        <p className="p-2">Criado em: <strong>{format(processo.criado_em, "dd/MM/yyy")}</strong></p>
        <p className="p-2">Expira em: <strong>{format(processo.prazo, "dd/MM/yyy")}</strong></p>
        <p className="p-2">Ano: <strong>{processo.ano}</strong></p>
        <p className="p-2">Enviado por: <strong>{processo.setor.nome}</strong></p>
      </div>

      {processo.tipo.tipo !== "OUTRO" && (
        <div>
          <p className="my-3">{descricaoLabel}</p>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Novo Lote</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Testada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processo.descricao_lotes.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.lote}</TableCell>
                  <TableCell>{item.area}</TableCell>
                  <TableCell>{item.testada}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {processo.tipo.tipo === "OUTRO" && (
        <div>
          <p className="text-xl my-3">Pessoas Citadas:</p>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processo.descricao_pessoas.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.telefone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex gap-4 w-full flex-wrap">
        <p>Lotes Incluídos:</p>
        {processo.lote_vinculado.map((item) => (
          <div key={item.id} className="w-full min-w-[350px]">
            <Card>
              <CardContent className="p-6 flex">
                <div>
                  <p>Lote: <strong>{item.lote}</strong></p>
                  <p>Código do Imóvel: <strong>{item.codigo_imovel}</strong></p>
                  <p>Proprietário: <strong>{item.proprietario}</strong></p>
                  <p>Bairro: <strong>{item.bairro}</strong></p>
                  <p>Quadra: <strong>{item.quadra}</strong></p>
                  <p>Número: <strong>{item.numero}</strong></p>
                  <p>Logradouro: <strong>{item.logradouro}</strong></p>
                  <p>Área: <strong>{item.area_total}</strong></p>
                  <p>Testada: <strong>{item.testada}</strong></p>
                  <p>Matrícula: <strong>{item.matricula || "Não informada"}</strong></p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div>
        <p className="py-2">{observacaoLabel}</p>
        <Textarea value={processo.texto} className="resize-none h-[120px] w-full" readOnly />
      </div>

      <Separator className="bg-gray-300 my-3" />

      {(processo.status === "RESPONDIDO" || processo.status === "RESPONDIDO_COM_ATRASO") && (
        <div>
          <p className="py-3">{respostaLabel}</p>
          {processo.resposta && (
            <div>
              <div className="my-3">
                <p className="my-3">{respostaDescricaoLabel}</p>
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Novo Lote</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Data de Registro</TableHead>
                      <TableHead>Transcrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processo.resposta.descricao.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.lote}</TableCell>
                        <TableCell>{item.matricula}</TableCell>
                        <TableCell>{item.data_registro}</TableCell>
                        <TableCell>{item.transcricao}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="my-3">
                {processo.status === "RESPONDIDO_COM_ATRASO" && processo.resposta.alvara && (
                  <div className="my-3">
                    <p className="py-2">Alvará de permissão devido a atraso:</p>
                    <Textarea value={processo.resposta.alvara} className="resize-none h-[30px] w-full" readOnly />
                  </div>
                )}
                <p className="py-2">{respostaObservacaoLabel}</p>
                <Textarea value={processo.resposta.observacao} className="resize-none h-[120px] w-full" readOnly />
              </div>
            </div>
          )}

          {processo.respostaPessoa && (
            <div>
              {processo.status === "RESPONDIDO_COM_ATRASO" && processo.respostaPessoa.alvara && (
                <div className="my-3">
                  <p className="py-2">Alvará de permissão devido a atraso:</p>
                  <Textarea value={processo.respostaPessoa.alvara} className="resize-none h-[30px] w-full" readOnly />
                </div>
              )}
              <div className="my-3">
                <p className="py-2">{respostaObservacaoLabel}</p>
                <Textarea value={processo.respostaPessoa.observacao} className="resize-none h-[120px] w-full" readOnly />
              </div>
            </div>
          )}
        </div>
      )}

      {!processo.ativo && (
        <div>
          <Separator className="bg-gray-300 my-3" />
          <div className="my-3">
            <p className="py-2">Conclusão:</p>
            <Textarea value={processo.conclusao} className="resize-none h-[120px] w-full" readOnly />
          </div>
        </div>
      )}

      {actions}
    </section>
  )
}
