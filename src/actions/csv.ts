"use server"

import prisma from '@/utils/db';

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
    //ma tricula:string
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
     

        const lotesParsed: string[] = lotesRes

        for await (let line of lotesParsed) {

            const line2 = line.toLowerCase().split(";")

            const indexCod = line2.indexOf('"codigoimovel' || 'bic')
            const indexCod2 = line2.indexOf('codigoimovel' || 'bic')
            const indexNum = line2.indexOf('numerocorresp' || 'numerocorrespondente' || 'numero_predial')
            const indexBairro = line2.indexOf('bairrocorresp' || 'bairrocorrespondente' || 'nome_bairro')
            const indexQuadra = line2.indexOf('quadra')
            const indexLote = line2.indexOf('lote')
            const indexInsc = line2.indexOf('inscricaoimobiliaria' || 'inscimobiliaria' || 'inscimob' || 'inscricao')
            const indexProp = line2.indexOf('proprietario' || 'nome_proprietario')
            const indexArea = line2.indexOf('arealote' || 'area_terreno')
            const indexLogr = line2.indexOf('nomelogradouro' || 'nome_logradouro')
            const indexTest = line2.indexOf('testadaprincipal' || 'testada_principal')
            //const indexMatr = fileLineSplit.indexOf('matricula_numero')

            //console.log(indexArea, indexCod, indexCod2, indexNum, indexBairro, indexQuadra, indexLote, indexInsc, indexProp, indexLogr, indexTest)
            if (indexNum !== -1 && indexBairro !== -1 && indexQuadra !== -1 && indexLote !== -1 && indexInsc !== -1 && indexProp !== -1
                && indexArea !== -1 && indexLogr !== -1 && indexTest !== -1  /* && indexMatr !== -1*/) {

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
                    //matr = indexMatr


                    for await (let line of lotesRes) {

                        const line2 = line.split(";")

                        lotes.push({
                            codigo_imovel: line2[cod].slice(1),
                            insc_imob: line2[insc],
                            proprietario: line2[prop],
                            logradouro: line2[log],
                            area_total: line2[area],
                            quadra: line2[qua],
                            lote: line2[lot],
                            numero: line2[num],
                            bairro: line2[bai],
                            testada: line2[tes],
                            //matricula:fileLineSplit2[matr]
                        })
                    }


                    break;
                }

                if (indexCod2 !== -1) {

                    cod = indexCod2
                    num = indexNum
                    bai = indexBairro
                    qua = indexQuadra
                    lot = indexLote
                    insc = indexInsc
                    prop = indexProp
                    area = indexArea
                    log = indexLogr
                    tes = indexTest
                    //matr = indexMatr

                    for await (let line of lotesRes) {

                        const line2 = line.split(";")

                        lotes.push({
                            codigo_imovel: line2[cod].slice(1),
                            insc_imob: line2[insc],
                            proprietario: line2[prop],
                            logradouro: line2[log],
                            area_total: line2[area],
                            quadra: line2[qua],
                            lote: line2[lot],
                            numero: line2[num],
                            bairro: line2[bai],
                            testada: line2[tes],
                            //matricula:line[matr]
                        })
                    }

                    break;
                }

            }
        }


        for await (let { codigo_imovel, insc_imob, proprietario, logradouro, area_total, quadra, lote, numero, bairro, testada,/*matricula */ } of lotes) {

            const loteAlreadyExists = await prisma.lote.findFirst({
                where: { codigo_imovel: codigo_imovel }
            })

            if (loteAlreadyExists) {
                try {
                    await prisma.lote.update({
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
                            //matricula:matricula
                        }
                    })
                } catch (err) {
                    console.log(err)
                }

            } else {
                try {
                    await prisma.lote.create({
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
                            //matricula:matricula
                        }
                    })

                } catch (err) {
                    console.log(err)
                }

            }

        }

    } catch (error) {
        console.error('Erro ao processar o arquivo CSV:', error);
    }

}


