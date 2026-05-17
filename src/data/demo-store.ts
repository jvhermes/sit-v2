import {
  Atividade,
  Cartorio,
  CartorioCollumn,
  Lote,
  Perfil,
  PrefeituraCollumn,
  ProcessoCartorioDetail,
  ProcessoPrefeituraDetail,
  Setor,
  Status,
  Tipo,
  TipoProcesso,
  UserAdminProps,
  UserPerfilProps,
} from "@/types/types";

type CreateUsuarioInput = {
  nome: string;
  email: string;
  senha: string;
  perfil: Perfil;
  ativo: boolean;
  avatar: string;
  cartorio_id?: string;
  setor_id?: string;
};

type DemoState = {
  atividades: Atividade[];
  cartorios: Cartorio[];
  setores: Setor[];
  tipos: Tipo[];
  lotes: Lote[];
  usuarios: UserAdminProps[];
  processosPrefeitura: ProcessoPrefeituraDetail[];
  processosCartorio: ProcessoCartorioDetail[];
};

const setorUrbano: Setor = { id: "setor-urbano", nome: "Planejamento Urbano" };
const setorTributos: Setor = { id: "setor-tributos", nome: "Tributos Imobiliários" };
const cartorioCentro: Cartorio = { id: "cartorio-centro", nome: "Cartório Centro" };
const cartorioNorte: Cartorio = { id: "cartorio-norte", nome: "Cartório Zona Norte" };
const atividadeRegularizacao: Atividade = { id: "atividade-regularizacao", nome: "Regularização Imobiliária" };
const atividadeCertidao: Atividade = { id: "atividade-certidao", nome: "Emissão de Certidão" };
const tipoDesmembramento: Tipo = { id: 1, nome: "Desmembramento", tipo: TipoProcesso.DESMEMBRAMENTO };
const tipoRemembramento: Tipo = { id: 2, nome: "Remembramento", tipo: TipoProcesso.REMEMBRAMENTO };
const tipoOutro: Tipo = { id: 3, nome: "Outros", tipo: TipoProcesso.OUTRO };

const demoLotes: Lote[] = [
  {
    id: 1,
    codigo_imovel: "001.002.003",
    numero: "120",
    bairro: "Centro",
    quadra: "12",
    lote: "08",
    insc_imob: "2024-001",
    proprietario: "Maria Oliveira",
    area_total: "360m2",
    logradouro: "Rua das Palmeiras",
    testada: "12m",
    matricula: "45.321",
  },
  {
    id: 2,
    codigo_imovel: "004.005.006",
    numero: "88",
    bairro: "Jardim Europa",
    quadra: "07",
    lote: "21",
    insc_imob: "2024-002",
    proprietario: "João Pereira",
    area_total: "540m2",
    logradouro: "Avenida Brasil",
    testada: "18m",
    matricula: "78.654",
  },
  {
    id: 3,
    codigo_imovel: "007.008.009",
    numero: "15",
    bairro: "Vila Nova",
    quadra: "03",
    lote: "04",
    insc_imob: "2024-003",
    proprietario: "Empresa Demo Ltda.",
    area_total: "720m2",
    logradouro: "Rua Projetada",
    testada: "24m",
    matricula: "",
  },
];

const initialState = (): DemoState => ({
  atividades: [atividadeRegularizacao, atividadeCertidao],
  cartorios: [cartorioCentro, cartorioNorte],
  setores: [setorUrbano, setorTributos],
  tipos: [tipoDesmembramento, tipoRemembramento, tipoOutro],
  lotes: demoLotes,
  usuarios: [
    {
      id: "user-admin",
      nome: "Administrador Demo",
      email: "admin@demo.com",
      ativo: true,
      avatar: "1",
      perfil: Perfil.ADMIN,
      setor: setorUrbano,
      cartorio: cartorioCentro,
      setor_id: setorUrbano.id,
      cartorio_id: cartorioCentro.id,
    },
    {
      id: "user-prefeitura",
      nome: "Prefeitura Demo",
      email: "prefeitura@demo.com",
      ativo: true,
      avatar: "2",
      perfil: Perfil.PREFEITURA,
      setor: setorUrbano,
      cartorio: null,
      setor_id: setorUrbano.id,
      cartorio_id: null,
    },
    {
      id: "user-cartorio",
      nome: "Cartório Demo",
      email: "cartorio@demo.com",
      ativo: true,
      avatar: "3",
      perfil: Perfil.CARTORIO,
      setor: null,
      cartorio: cartorioCentro,
      setor_id: null,
      cartorio_id: cartorioCentro.id,
    },
  ],
  processosPrefeitura: [
    {
      id: 1,
      num_processo: "PREF-2026-001",
      texto: "Solicitação de análise para desmembramento de lote urbano.",
      ano: "2026",
      criado_em: "2026-05-01T12:00:00.000Z",
      prazo: "2026-06-15T12:00:00.000Z",
      ativo: true,
      status: Status.PENDENTE,
      conclusao: "",
      setor: setorUrbano,
      cartorio: cartorioCentro,
      tipo: tipoDesmembramento,
      atividade: atividadeRegularizacao,
      lote_vinculado: [demoLotes[0]],
      descricao_lotes: [
        {
          id: "desc-lote-1",
          lote: "08-A",
          area: "180m2",
          testada: "6m",
          processo_prefeitura_id: 1,
          processo_cartorio_id: null,
        },
        {
          id: "desc-lote-2",
          lote: "08-B",
          area: "180m2",
          testada: "6m",
          processo_prefeitura_id: 1,
          processo_cartorio_id: null,
        },
      ],
      descricao_pessoas: [],
      resposta: null,
      respostaPessoa: null,
    },
    {
      id: 2,
      num_processo: "PREF-2026-002",
      texto: "Pedido de informação referente a titularidade.",
      ano: "2026",
      criado_em: "2026-04-10T12:00:00.000Z",
      prazo: "2026-05-10T12:00:00.000Z",
      ativo: false,
      status: Status.RESPONDIDO,
      conclusao: "Processo encerrado após recebimento de resposta.",
      setor: setorTributos,
      cartorio: cartorioNorte,
      tipo: tipoOutro,
      atividade: atividadeCertidao,
      lote_vinculado: [demoLotes[1]],
      descricao_lotes: [],
      descricao_pessoas: [
        {
          id: "desc-pessoa-1",
          nome: "Carlos Souza",
          cpf: "000.000.000-00",
          telefone: "(11) 99999-0000",
          email: "carlos@example.com",
          processo_prefeitura_id: 2,
          processo_cartorio_id: null,
        },
      ],
      resposta: null,
      respostaPessoa: {
        id: "resposta-pessoa-1",
        observacao: "Titularidade confirmada em matrícula vigente.",
        alvara: "",
        processo_id: 2,
      },
    },
  ],
  processosCartorio: [
    {
      id: 1,
      num_processo: "CART-2026-001",
      observacao: "Solicitação de conferência cadastral enviada pelo cartório.",
      ano: "2026",
      criado_em: "2026-05-05T12:00:00.000Z",
      ativo: true,
      setor: setorUrbano,
      cartorio: cartorioCentro,
      tipo: tipoRemembramento,
      atividade: atividadeRegularizacao,
      lote_vinculado: [demoLotes[2]],
      descricao_lotes: [
        {
          id: "desc-cart-lote-1",
          lote: "04",
          area: "720m2",
          testada: "24m",
          processo_prefeitura_id: null,
          processo_cartorio_id: 1,
        },
      ],
      descricao_pessoas: [],
    },
  ],
});

const globalStore = globalThis as typeof globalThis & {
  __sitDemoState?: DemoState;
};

function state() {
  if (!globalStore.__sitDemoState) {
    globalStore.__sitDemoState = initialState();
  }

  return globalStore.__sitDemoState;
}

function nextNumericId(items: { id: number }[]) {
  return Math.max(0, ...items.map((item) => item.id)) + 1;
}

function makeId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function tipoFromNome(nome: string): TipoProcesso {
  const normalized = nome.toLowerCase();

  if (normalized.includes("desmembr")) return TipoProcesso.DESMEMBRAMENTO;
  if (normalized.includes("remembr")) return TipoProcesso.REMEMBRAMENTO;

  return TipoProcesso.OUTRO;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

function prefeituraToColumn(processo: ProcessoPrefeituraDetail): PrefeituraCollumn {
  const lote = processo.lote_vinculado[0];

  return {
    id: processo.id,
    numero: processo.num_processo,
    tipo: processo.tipo.nome,
    proprietario: lote?.proprietario || "",
    bairro: lote?.bairro || "",
    quadra: lote?.quadra || "",
    lote: lote?.lote || "",
    criado: formatDate(processo.criado_em),
    prazo: formatDate(processo.prazo),
    status: processo.status.toLowerCase(),
  };
}

function cartorioToColumn(processo: ProcessoCartorioDetail): CartorioCollumn {
  const lote = processo.lote_vinculado[0];

  return {
    id: processo.id,
    numero: processo.num_processo,
    tipo: processo.tipo.nome,
    proprietario: lote?.proprietario || "",
    bairro: lote?.bairro || "",
    quadra: lote?.quadra || "",
    lote: lote?.lote || "",
    criado: formatDate(processo.criado_em),
  };
}

export const demoStore = {
  getDemoUser(): UserPerfilProps {
    const user = state().usuarios[0];
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      ativo: user.ativo,
      avatar: user.avatar,
      perfil: user.perfil,
      cartorio: user.cartorio,
      setor: user.setor,
    };
  },

  listAtividades() {
    return state().atividades;
  },

  createAtividade(nome: string) {
    if (state().atividades.some((item) => item.nome.toLowerCase() === nome.toLowerCase())) return null;
    const atividade = { id: makeId("atividade"), nome };
    state().atividades.push(atividade);
    return atividade;
  },

  updateAtividade(id: string, nome: string) {
    const item = state().atividades.find((atividade) => atividade.id === id);
    if (!item) return null;
    item.nome = nome;
    return item;
  },

  deleteAtividade(id: string) {
    const before = state().atividades.length;
    state().atividades = state().atividades.filter((atividade) => atividade.id !== id);
    return before !== state().atividades.length;
  },

  listCartorios() {
    return state().cartorios;
  },

  createCartorio(nome: string) {
    if (state().cartorios.some((item) => item.nome.toLowerCase() === nome.toLowerCase())) return null;
    const cartorio = { id: makeId("cartorio"), nome };
    state().cartorios.push(cartorio);
    return cartorio;
  },

  updateCartorio(id: string, nome: string) {
    const item = state().cartorios.find((cartorio) => cartorio.id === id);
    if (!item) return null;
    item.nome = nome;
    return item;
  },

  deleteCartorio(id: string) {
    const before = state().cartorios.length;
    state().cartorios = state().cartorios.filter((cartorio) => cartorio.id !== id);
    return before !== state().cartorios.length;
  },

  listSetores() {
    return state().setores;
  },

  createSetor(nome: string) {
    if (state().setores.some((item) => item.nome.toLowerCase() === nome.toLowerCase())) return null;
    const setor = { id: makeId("setor"), nome };
    state().setores.push(setor);
    return setor;
  },

  updateSetor(id: string, nome: string) {
    const item = state().setores.find((setor) => setor.id === id);
    if (!item) return null;
    item.nome = nome;
    return item;
  },

  deleteSetor(id: string) {
    const before = state().setores.length;
    state().setores = state().setores.filter((setor) => setor.id !== id);
    return before !== state().setores.length;
  },

  listTipos() {
    return state().tipos;
  },

  createTipo(nome: string) {
    if (state().tipos.some((item) => item.nome.toLowerCase() === nome.toLowerCase())) return null;
    const tipo = { id: nextNumericId(state().tipos), nome, tipo: tipoFromNome(nome) };
    state().tipos.push(tipo);
    return tipo;
  },

  updateTipo(id: number, nome: string) {
    const item = state().tipos.find((tipo) => tipo.id === id);
    if (!item) return null;
    item.nome = nome;
    item.tipo = tipoFromNome(nome);
    return item;
  },

  deleteTipo(id: number) {
    const before = state().tipos.length;
    state().tipos = state().tipos.filter((tipo) => tipo.id !== id);
    return before !== state().tipos.length;
  },

  getAdminData() {
    return {
      tipos: state().tipos,
      atividades: state().atividades,
      cartorios: state().cartorios,
      setores: state().setores,
      user: state().usuarios,
    };
  },

  getCreatePrefeituraData() {
    return {
      atividades: state().atividades,
      cartorios: state().cartorios,
      lotes: state().lotes,
      tipos: state().tipos,
    };
  },

  getCreateCartorioData() {
    return {
      atividades: state().atividades,
      setores: state().setores,
      lotes: state().lotes,
      tipos: state().tipos,
    };
  },

  listUsuarios() {
    return state().usuarios;
  },

  getUsuario(id: string) {
    return state().usuarios.find((usuario) => usuario.id === id) || null;
  },

  createUsuario(input: CreateUsuarioInput) {
    if (state().usuarios.some((usuario) => usuario.email.toLowerCase() === input.email.toLowerCase())) return null;
    const setor = state().setores.find((item) => item.id === input.setor_id) || null;
    const cartorio = state().cartorios.find((item) => item.id === input.cartorio_id) || null;
    const usuario: UserAdminProps = {
      id: makeId("user"),
      nome: input.nome,
      email: input.email,
      ativo: input.ativo,
      avatar: input.avatar,
      perfil: input.perfil,
      setor,
      cartorio,
      setor_id: setor?.id || null,
      cartorio_id: cartorio?.id || null,
    };
    state().usuarios.push(usuario);
    return usuario;
  },

  updateUsuario(id: string, input: CreateUsuarioInput) {
    const usuario = this.getUsuario(id);
    if (!usuario) return null;
    const emailInUse = state().usuarios.some(
      (item) => item.id !== id && item.email.toLowerCase() === input.email.toLowerCase(),
    );
    if (emailInUse) return null;

    usuario.nome = input.nome;
    usuario.email = input.email;
    usuario.ativo = input.ativo;
    usuario.avatar = input.avatar;
    usuario.perfil = input.perfil;
    usuario.setor = state().setores.find((item) => item.id === input.setor_id) || null;
    usuario.cartorio = state().cartorios.find((item) => item.id === input.cartorio_id) || null;
    usuario.setor_id = usuario.setor?.id || null;
    usuario.cartorio_id = usuario.cartorio?.id || null;

    return usuario;
  },

  updateSenha(id: string) {
    return this.getUsuario(id);
  },

  listProcessosPrefeitura(ativo: boolean) {
    return state()
      .processosPrefeitura.filter((processo) => processo.ativo === ativo)
      .map(prefeituraToColumn);
  },

  getProcessoPrefeitura(id: string | number) {
    return state().processosPrefeitura.find((processo) => processo.id === Number(id)) || null;
  },

  createProcessoPrefeitura(values: any, lotes: Lote[]) {
    const tipo = state().tipos.find((item) => String(item.id) === String(values.tipo_id)) || tipoOutro;
    const atividade = state().atividades.find((item) => item.id === values.atividade_id) || atividadeRegularizacao;
    const cartorio = state().cartorios.find((item) => item.id === values.cartorio_id) || cartorioCentro;
    const processoId = nextNumericId(state().processosPrefeitura);
    const vinculados = lotes.length ? lotes : state().lotes.filter((lote) => values.lotes_id?.includes(lote.id));
    const processo: ProcessoPrefeituraDetail = {
      id: processoId,
      num_processo: values.num_processo,
      texto: values.texto || "",
      ano: values.ano,
      criado_em: new Date().toISOString(),
      prazo: new Date(values.prazo).toISOString(),
      ativo: true,
      status: Status.PENDENTE,
      conclusao: "",
      setor: setorUrbano,
      cartorio,
      tipo,
      atividade,
      lote_vinculado: vinculados,
      descricao_lotes: (values.descricao_lote || []).map((item: any) => ({
        id: makeId("desc-lote"),
        ...item,
        processo_prefeitura_id: processoId,
        processo_cartorio_id: null,
      })),
      descricao_pessoas: (values.descricao_pessoa || []).map((item: any) => ({
        id: makeId("desc-pessoa"),
        ...item,
        processo_prefeitura_id: processoId,
        processo_cartorio_id: null,
      })),
      resposta: null,
      respostaPessoa: null,
    };
    state().processosPrefeitura.push(processo);
    return { message: "Processo criado" };
  },

  deleteProcessoPrefeitura(id: number | unknown) {
    const before = state().processosPrefeitura.length;
    state().processosPrefeitura = state().processosPrefeitura.filter((processo) => processo.id !== Number(id));
    return before !== state().processosPrefeitura.length;
  },

  closeProcessoPrefeitura(id: number, conclusao: string) {
    const processo = this.getProcessoPrefeitura(id);
    if (!processo) return null;
    processo.ativo = false;
    processo.conclusao = conclusao;
    return processo;
  },

  respondeProcessoLote(values: any, processoId: number, processoStatus: Status) {
    const processo = this.getProcessoPrefeitura(processoId);
    if (!processo) return null;
    processo.status = processoStatus === Status.PENDENTE ? Status.RESPONDIDO : Status.RESPONDIDO_COM_ATRASO;
    processo.resposta = {
      id: makeId("resposta-lote"),
      observacao: values.texto,
      alvara: values.alvara || "",
      processo_id: processo.id,
      descricao: (values.descricao || []).map((item: any) => ({
        id: makeId("resposta-desc"),
        matricula: item.matricula,
        data_registro:
          item.data_registro instanceof Date ? formatDate(item.data_registro.toISOString()) : String(item.data_registro),
        transcricao: item.transcricao,
        lote: item.lote,
        aprovacao_id: "",
        descricao_id: item.descricao_id,
      })),
    };
    return processo.resposta;
  },

  respondeProcessoPessoa(values: any, processoId: number, processoStatus: Status) {
    const processo = this.getProcessoPrefeitura(processoId);
    if (!processo) return null;
    processo.status = processoStatus === Status.PENDENTE ? Status.RESPONDIDO : Status.RESPONDIDO_COM_ATRASO;
    processo.respostaPessoa = {
      id: makeId("resposta-pessoa"),
      observacao: values.texto,
      alvara: values.alvara || "",
      processo_id: processo.id,
    };
    return processo.respostaPessoa;
  },

  listProcessosCartorio(ativo: boolean) {
    return state()
      .processosCartorio.filter((processo) => processo.ativo === ativo)
      .map(cartorioToColumn);
  },

  getProcessoCartorio(id: string | number) {
    return state().processosCartorio.find((processo) => processo.id === Number(id)) || null;
  },

  createProcessoCartorio(values: any, lotes: Lote[]) {
    const tipo = state().tipos.find((item) => String(item.id) === String(values.tipo_id)) || tipoOutro;
    const atividade = state().atividades.find((item) => item.id === values.atividade_id) || atividadeRegularizacao;
    const setor = state().setores.find((item) => item.id === values.setor_id) || setorUrbano;
    const processoId = nextNumericId(state().processosCartorio);
    const vinculados = lotes.length ? lotes : state().lotes.filter((lote) => values.lotes_id?.includes(lote.id));
    const processo: ProcessoCartorioDetail = {
      id: processoId,
      num_processo: values.num_processo,
      observacao: values.observacao || "",
      ano: values.ano,
      criado_em: new Date().toISOString(),
      ativo: true,
      setor,
      cartorio: cartorioCentro,
      tipo,
      atividade,
      lote_vinculado: vinculados,
      descricao_lotes: (values.descricao_lote || []).map((item: any) => ({
        id: makeId("desc-cart-lote"),
        ...item,
        processo_prefeitura_id: null,
        processo_cartorio_id: processoId,
      })),
      descricao_pessoas: (values.descricao_pessoa || []).map((item: any) => ({
        id: makeId("desc-cart-pessoa"),
        ...item,
        processo_prefeitura_id: null,
        processo_cartorio_id: processoId,
      })),
    };
    state().processosCartorio.push(processo);
    return { message: "Processo criado" };
  },

  closeProcessoCartorio(id: number) {
    const processo = this.getProcessoCartorio(id);
    if (!processo) return null;
    processo.ativo = false;
    return processo;
  },

  deleteProcessoCartorio(id: number | unknown) {
    const before = state().processosCartorio.length;
    state().processosCartorio = state().processosCartorio.filter((processo) => processo.id !== Number(id));
    return before !== state().processosCartorio.length;
  },
};
