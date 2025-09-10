
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

export type UserPerfilProps = {
    cartorio: Cartorio | null;
    setor: Setor | null;
    id: string;
    nome: string;
    email: string;
    ativo: boolean;
    avatar: string;
    perfil: Perfil;

}

export type UserAdminProps = {

    cartorio: Cartorio | null;
    setor: Setor | null;
    id: string;
    nome: string;
    email: string;
    ativo: boolean;
    avatar: string;
    perfil: Perfil;
    setor_id: string | null;
    cartorio_id: string | null;
}

export type Cartorio = {
    id: string,
    nome: string
}
export type Setor = {
    id: string,
    nome: string
}

export type Atividade = {
    id: string,
    nome: string
}
export type Tipo = {
    id: number,
    nome: string,
    tipo: TipoProcesso
}

export type Descricao_pessoas = {
    id: string;
    nome: string;
    processo_prefeitura_id: number | null;
    processo_cartorio_id: number | null;
    email: string;
    telefone: string;
    cpf: string;
};

export type Descricao_lotes = {
    id: string;
    lote: string;
    testada: string;
    processo_prefeitura_id: number | null;
    processo_cartorio_id: number | null;
    area: string;
};

export type DescricaoResposta = {
    id: string;
    lote: string;
    matricula: string;
    data_registro: string;
    transcricao: string;
    aprovacao_id: string;
    descricao_id: string;
}

export type Resposta = {
    id: string;
    alvara: string;
    processo_id: number;
    observacao: string;
    descricao: DescricaoResposta[]
}
export type ProcessoPrefeituraDetail = {
    setor: Setor,
    cartorio: Cartorio,
    tipo: Tipo,
    atividade: Atividade,
    descricao_pessoas: Descricao_pessoas[];
    descricao_lotes: Descricao_lotes[];
    lote_vinculado: Lote[],
    conclusao: string;
    id: number,
    status: Status,
    num_processo: string,
    texto: string,
    ano: string,
    criado_em: string,
    ativo: boolean,
    prazo: string,
    resposta: Resposta | null,
    respostaPessoa: {
        id: string;
        alvara: string;
        processo_id: number;
        observacao: string;
    } | null;

}

export type ProcessoCartorioDetail = {
    setor: Setor,
    cartorio: Cartorio,
    tipo: Tipo,
    atividade: Atividade,
    descricao_pessoas: Descricao_pessoas[];
    descricao_lotes: Descricao_lotes[];
    lote_vinculado: Lote[],
    id: number,
    num_processo: string,
    observacao: string,
    ano: string,
    criado_em: string,
    ativo: boolean
}

export enum Status {
    RESPONDIDO = "RESPONDIDO",
    ATRASADO = "ATRASADO",
    PENDENTE = "PENDENTE",
    RESPONDIDO_COM_ATRASO = "RESPONDIDO_COM_ATRASO"
}

export enum Perfil {
    ADMIN = "ADMIN",
    CARTORIO = "CARTORIO",
    PREFEITURA = "PREFEITURA",
}

export enum TipoProcesso {
    REMEMBRAMENTO = "REMEMBRAMENTO",
    DESMEMBRAMENTO = "DESMEMBRAMENTO",
    OUTRO = "OUTRO",
}