import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { Title } from '@/components/Title'
import { format } from 'date-fns'
import { Buttons } from './components/Buttons'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from '@/components/ui/textarea'
import { ProcessoPrefeituraDetail } from '@/types/types'
import api from '@/lib/api'

const fechData = async (id: string) => {


    const processo: ProcessoPrefeituraDetail = await api.get(`/processop/${id}`)


    return processo
}
export default async function page({ params }: {
    params: { id: string }

}) {

    const processo = await fechData(params.id)

    return (
        <>

            <Title name={`Detalhes do Processo`} text='' />

            {processo && (
                <div className='w-10/12 mt-10'>
                    <div className='py-6'>
                        <Link href={"private/prefeitura"}>
                            <Button variant={"outline"}>Retornar</Button>
                        </Link>
                    </div>
                    <section className='p-10 flex-col mb-5 border rounded bg-white flex  gap-4'>
                        <div className='flex justify-between'>
                            <h2 className='text-xl'>Processo {processo.num_processo}</h2>
                            <div>
                                <span>admin - prefeitura </span>
                                <Switch id="enviados" />
                                <span> cartorio</span>
                            </div>

                        </div>
                        <div className='flex flex-wrap gap-3 my-2'>
                            <p className='py-2 pr-2'>Tipo: <strong>{processo.tipo.nome.toLowerCase()}</strong></p>
                            <p className='p-2'>Criado em: <strong>{format(processo.criado_em, "dd/MM/yyy")}</strong></p>
                            <p className='p-2'>Expira em: <strong>{format(processo.prazo, "dd/MM/yyy")}</strong></p>
                            <p className='p-2'>Ano: <strong>{processo.ano}</strong></p>
                            <p className='p-2'>Enviado por: <strong>{processo.setor.nome}</strong></p>
                        </div>

                        {(processo.tipo.tipo !== "OUTRO") && (
                            <div>
                                <p className=' my-3'>Descrições Enviadas:</p>
                                <Table className='border'>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Novo Lote</TableHead>
                                            <TableHead>Área</TableHead>
                                            <TableHead>Testada</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {processo.descricao_lotes.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{item.lote}</TableCell>
                                                    <TableCell>{item.area}</TableCell>
                                                    <TableCell>{item.testada}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                        {(processo.tipo.tipo === "OUTRO") && (
                            <div>
                                <p className='text-xl my-3'>Pessoas Citadas:</p>
                                <Table className='border'>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>CPF</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Telefone</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {processo.descricao_pessoas.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{item.nome}</TableCell>
                                                    <TableCell>{item.cpf}</TableCell>
                                                    <TableCell>{item.email}</TableCell>
                                                    <TableCell>{item.telefone}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        )}


                        <div className='flex gap-4 w-full flex-wrap'>
                            <p>Lotes Incluídos:</p>
                            {processo.lote_vinculado.map((item, index) => {
                                return (
                                    <div key={index} className='w-full min-w-[350px] '>
                                        <Card>
                                            <CardContent className='p-6 flex'>
                                                <div >
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

                                )
                            })}

                        </div>
                        <div>
                            <p className='py-2'>Obvservações Enviadas:</p>
                            <Textarea
                                value={processo.texto}
                                className="resize-none h-[120px] w-full"
                                readOnly={true}
                            />
                        </div>
                        <Separator className="bg-gray-300 my-3" />
                        {(processo.status === "RESPONDIDO" || processo.status === "RESPONDIDO_COM_ATRASO") && (
                            <div>
                                <p className='py-3'>Resposta:</p>
                                {processo.resposta && (
                                    <div>
                                        <div className='my-3'>
                                            <p className='my-3'>Descrições Recebidas:</p>
                                            <Table className='border'>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Novo Lote</TableHead>
                                                        <TableHead>Matrícula</TableHead>
                                                        <TableHead>Data de Registro</TableHead>
                                                        <TableHead>Transcrição</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {processo.resposta.descricao.map((item, index) => {
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell>{item.lote}</TableCell>
                                                                <TableCell>{item.matricula}</TableCell>
                                                                <TableCell>{item.data_registro}</TableCell>
                                                                <TableCell>{item.transcricao}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                        <div className='my-3'>
                                            {(processo.status === "RESPONDIDO_COM_ATRASO" && processo.resposta.alvara) &&
                                                (
                                                    <div className='my-3'>
                                                        <p className='py-2'>Alvará de permissão devido a atraso:</p>
                                                        <Textarea
                                                            value={processo.resposta.alvara}
                                                            className="resize-none  h-[30px] w-full"
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                )}
                                            <p className='py-2'>Obvservações Recebidas:</p>
                                            <Textarea
                                                value={processo.resposta.observacao}
                                                className="resize-none  h-[120px] w-full"
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                )}
                                {processo.respostaPessoa && (
                                    <div>
                                        {(processo.status === "RESPONDIDO_COM_ATRASO" && processo.respostaPessoa.alvara) &&
                                            (
                                                <div className='my-3'>
                                                    <p className='py-2'>Alvará de permissão devido a atraso:</p>
                                                    <Textarea
                                                        value={processo.respostaPessoa.alvara}
                                                        className="resize-none  h-[30px] w-full"
                                                        readOnly={true}
                                                    />
                                                </div>
                                            )}
                                        <div className='my-3'>
                                            <p className='py-2'>Obvservações Recebidas:</p>
                                            <Textarea
                                                value={processo.respostaPessoa.observacao}
                                                className="resize-none  h-[120px] w-full"
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {!processo.ativo && (
                            <div>
                                <Separator className="bg-gray-300 my-3" />
                                <div className='my-3'>
                                    <p className='py-2'>Conclusão:</p>
                                    <Textarea
                                        value={processo.conclusao}
                                        className="resize-none  h-[120px] w-full"
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        )}
                        <Buttons status={processo.status} processo={processo} />
                    </section>

                </div>
            ) || (
                    <div className='mt-10'>
                        <p>{"Processo não encontrado :("}</p>
                    </div>
                )}
        </>
    )
}
