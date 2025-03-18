"use server"

import prisma from '@/utils/db';
import { revalidatePath } from "next/cache"
interface Lote {
    codigo_imovel: string
    bairro: string
    quadra: string
    lote: string
    insc_imob: string
    proprietario: string
    area_total: string
    logradouro: string
    numero: string
    testada: string
    matricula: string
}




export const saveCSV = async (lotesRes: any[]) => {

    let cod = 0
    let num = 0
    let bai = 0
    let qua = 0
    let lot = 0
    let insc = 0
    let prop = 0
    let area = 0
    let log = 0
    let tes = 0
    let matr = 0

    const lotes: Lote[] = []
    try {


        const lotesParsed: string[][] = lotesRes

        for await (let line of lotesParsed) {


            const line2 = line

            const indexCod = line2.findIndex(item => item.trim().toLowerCase().includes('codigoimovel') || item.trim().toLowerCase().includes('bic'));
            const indexNum = line2.findIndex(item =>
                item.trim().toLowerCase().includes('numerocorresp') ||
                item.trim().toLowerCase().includes('numerocorrespondente') ||
                item.trim().toLowerCase().includes('numero_predial')
            );
            const indexBairro = line2.findIndex(item =>
                item.trim().toLowerCase().includes('bairrocorresp') ||
                item.trim().toLowerCase().includes('bairrocorrespondente') ||
                item.trim().toLowerCase().includes('nome_bairro')
            );
            const indexQuadra = line2.findIndex(item => item.trim().toLowerCase().includes('quadra'));
            const indexLote = line2.findIndex(item => item.trim().toLowerCase().includes('lote'));
            const indexInsc = line2.findIndex(item =>
                item.trim().toLowerCase().includes('inscricaoimobiliaria') ||
                item.trim().toLowerCase().includes('inscimobiliaria') ||
                item.trim().toLowerCase().includes('inscimob') ||
                item.trim().toLowerCase().includes('inscricao')
            );
            const indexProp = line2.findIndex(item =>
                item.trim().toLowerCase().includes('proprietario') ||
                item.trim().toLowerCase().includes('nome_proprietario')
            );
            const indexArea = line2.findIndex(item =>
                item.trim().toLowerCase().includes('arealote') ||
                item.trim().toLowerCase().includes('area_terreno')
            );
            const indexLogr = line2.findIndex(item =>
                item.trim().toLowerCase().includes('nomelogradouro') ||
                item.trim().toLowerCase().includes('nome_logradouro')
            );
            const indexTest = line2.findIndex(item =>
                item.trim().toLowerCase().includes('testadaprincipal') ||
                item.trim().toLowerCase().includes('testada_principal')
            );
            const indexMatr = line2.findIndex(item => item.trim().toLowerCase().includes('matricula_numero'));


            console.log(indexArea, indexCod, indexNum, indexBairro, indexQuadra, indexLote, indexInsc, indexProp, indexLogr, indexTest)
            if (indexNum === -1 && indexBairro === -1 && indexQuadra === -1 && indexLote === -1 && indexInsc === -1 && indexProp === -1
                && indexArea === -1 && indexLogr === -1) {
                break
            }
            if (indexNum !== -1 && indexBairro !== -1 && indexQuadra !== -1 && indexLote !== -1 && indexInsc !== -1 && indexProp !== -1
                && indexArea !== -1 && indexLogr !== -1) {

                if (indexCod !== -1) {
                    cod = indexCod
                    num = indexNum
                    bai = indexBairro
                    qua = indexQuadra
                    lot = indexLote
                    insc = indexInsc
                    prop = indexProp
                    area = indexArea
                    log = indexLogr
                    tes = indexTest
                    matr = indexMatr


                    for await (let line of lotesRes) {

                        const line2 = line

                        lotes.push({
                            codigo_imovel: line2[cod],
                            insc_imob: line2[insc],
                            proprietario: line2[prop],
                            logradouro: line2[log],
                            area_total: line2[area],
                            quadra: line2[qua],
                            lote: line2[lot],
                            numero: line2[num],
                            bairro: line2[bai],
                            testada: line2[tes],
                            matricula: line2[matr]
                        })
                    }


                    break;
                }

            }
        }


        for await (let { codigo_imovel, insc_imob, proprietario, logradouro, area_total, quadra, lote, numero, bairro, testada, matricula } of lotes) {

            const loteAlreadyExists = await prisma.lote.findFirst({
                where: { codigo_imovel: codigo_imovel }
            })

            if (loteAlreadyExists) {
                try {
                    const lote2 = await prisma.lote.update({
                        where: { codigo_imovel: codigo_imovel },
                        data: {
                            codigo_imovel,
                            numero,
                            bairro,
                            quadra,
                            lote,
                            insc_imob,
                            proprietario,
                            area_total,
                            logradouro,
                            testada,
                            matricula: matricula
                        }
                    })

                } catch (err) {
                    console.log(err)
                    return null
                }

            } else {
                try {
                    const lote2 = await prisma.lote.create({
                        data: {
                            codigo_imovel,
                            numero,
                            bairro,
                            quadra,
                            lote,
                            insc_imob,
                            proprietario,
                            area_total,
                            logradouro,
                            testada,
                            matricula: matricula
                        }
                    })

                } catch (err) {
                    console.log(err)
                    return null
                }

            }

        }

    } catch (error) {
        console.log(error)
        return null
    }

    revalidatePath("/private/prefeitura/criar")
    revalidatePath("/private/cartorio/criar")
    console.log(lotes)
    return lotes


}


