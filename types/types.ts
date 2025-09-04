
export type Lote = {
    id: number,
    codigo_imovel: string,
    numero: string,
    bairro: string,
    quadra: string,
    lote: string,
    insc_imob: string,
    proprietario: string,
    area_total: string,
    logradouro: string,
    testada: string,
    matricula: string,
}

export type Cartorio = {
    id:string,
    nome:string
}

export type Atividade = {
    id:string,
    nome:string
}
export type Tipo = {
    id:string,
    nome:string
}