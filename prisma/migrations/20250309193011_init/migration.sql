-- CreateEnum
CREATE TYPE "Perfil" AS ENUM ('ADMIN', 'PREFEITURA', 'CARTORIO');

-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('DESMEMBRAMENTO', 'REMEMBRAMENTO', 'OUTRO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RESPONDIDO', 'ATRASADO', 'PENDENTE', 'RESPONDIDO_COM_ATRASO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "avatar" TEXT NOT NULL DEFAULT '1',
    "perfil" "Perfil" NOT NULL,
    "setor_id" TEXT,
    "cartorio_id" TEXT,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" SERIAL NOT NULL,
    "codigo_imovel" TEXT NOT NULL,
    "numero" TEXT NOT NULL DEFAULT '',
    "bairro" TEXT NOT NULL DEFAULT '',
    "quadra" TEXT NOT NULL DEFAULT '',
    "lote" TEXT NOT NULL DEFAULT '',
    "insc_imob" TEXT NOT NULL DEFAULT '',
    "proprietario" TEXT NOT NULL DEFAULT '',
    "area_total" TEXT NOT NULL DEFAULT '',
    "logradouro" TEXT NOT NULL DEFAULT '',
    "testada" TEXT NOT NULL DEFAULT '',
    "matricula" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atividades" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "atividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDeProcesso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "Tipo" NOT NULL,

    CONSTRAINT "TipoDeProcesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessoPrefeituraToLotee" (
    "processo_id" INTEGER NOT NULL,
    "lote_id" INTEGER NOT NULL,

    CONSTRAINT "ProcessoPrefeituraToLotee_pkey" PRIMARY KEY ("processo_id","lote_id")
);

-- CreateTable
CREATE TABLE "ProcessoCartorioToLotee" (
    "processo_id" INTEGER NOT NULL,
    "lote_id" INTEGER NOT NULL,

    CONSTRAINT "ProcessoCartorioToLotee_pkey" PRIMARY KEY ("processo_id","lote_id")
);

-- CreateTable
CREATE TABLE "processos-p" (
    "id" SERIAL NOT NULL,
    "num_processo" TEXT NOT NULL,
    "prazo" TIMESTAMP(3) NOT NULL,
    "ano" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',
    "respondido_em" TIMESTAMP(3),
    "conclusao" TEXT NOT NULL DEFAULT '',
    "doc_id" TEXT NOT NULL DEFAULT '',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "texto" TEXT NOT NULL DEFAULT '',
    "tipo_id" INTEGER NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "destino_id" TEXT NOT NULL,
    "fonte_id" TEXT NOT NULL,

    CONSTRAINT "processos-p_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processo-c" (
    "id" SERIAL NOT NULL,
    "num_processo" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondido_em" TIMESTAMP(3),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ano" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL DEFAULT '',
    "fonte_id" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "destino_id" TEXT NOT NULL,
    "tipo_id" INTEGER NOT NULL,

    CONSTRAINT "processo-c_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reenvio" (
    "id" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "enviado_de" TEXT NOT NULL,
    "processo_id" INTEGER NOT NULL,

    CONSTRAINT "reenvio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descricao-c" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "processo_cartorio_id" INTEGER,
    "processo_prefeitura_id" INTEGER,

    CONSTRAINT "descricao-c_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descricao-p" (
    "id" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "testada" TEXT NOT NULL,
    "processo_id" INTEGER,
    "processo_cartorio_id" INTEGER,

    CONSTRAINT "descricao-p_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aprovacao-descricao" (
    "id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "data_registro" TEXT NOT NULL,
    "transcricao" TEXT NOT NULL,
    "lote" TEXT NOT NULL DEFAULT '',
    "aprovacao_id" TEXT NOT NULL,
    "descricao_id" TEXT NOT NULL,

    CONSTRAINT "aprovacao-descricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aprovacao-c" (
    "id" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "alvara" TEXT NOT NULL DEFAULT '',
    "processo_id" INTEGER NOT NULL,

    CONSTRAINT "aprovacao-c_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aprovacao-pessoa" (
    "id" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "alvara" TEXT NOT NULL DEFAULT '',
    "processo_id" INTEGER NOT NULL,

    CONSTRAINT "aprovacao-pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lotes_codigo_imovel_key" ON "lotes"("codigo_imovel");

-- CreateIndex
CREATE UNIQUE INDEX "processos-p_num_processo_key" ON "processos-p"("num_processo");

-- CreateIndex
CREATE UNIQUE INDEX "processo-c_num_processo_key" ON "processo-c"("num_processo");

-- CreateIndex
CREATE UNIQUE INDEX "reenvio_processo_id_key" ON "reenvio"("processo_id");

-- CreateIndex
CREATE UNIQUE INDEX "aprovacao-descricao_descricao_id_key" ON "aprovacao-descricao"("descricao_id");

-- CreateIndex
CREATE UNIQUE INDEX "aprovacao-c_processo_id_key" ON "aprovacao-c"("processo_id");

-- CreateIndex
CREATE UNIQUE INDEX "aprovacao-pessoa_processo_id_key" ON "aprovacao-pessoa"("processo_id");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cartorio_id_fkey" FOREIGN KEY ("cartorio_id") REFERENCES "departamentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessoPrefeituraToLotee" ADD CONSTRAINT "ProcessoPrefeituraToLotee_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessoPrefeituraToLotee" ADD CONSTRAINT "ProcessoPrefeituraToLotee_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessoCartorioToLotee" ADD CONSTRAINT "ProcessoCartorioToLotee_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processo-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessoCartorioToLotee" ADD CONSTRAINT "ProcessoCartorioToLotee_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_destino_id_fkey" FOREIGN KEY ("destino_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "TipoDeProcesso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_fonte_id_fkey" FOREIGN KEY ("fonte_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_destino_id_fkey" FOREIGN KEY ("destino_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_fonte_id_fkey" FOREIGN KEY ("fonte_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "TipoDeProcesso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reenvio" ADD CONSTRAINT "reenvio_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-c" ADD CONSTRAINT "descricao-c_processo_cartorio_id_fkey" FOREIGN KEY ("processo_cartorio_id") REFERENCES "processo-c"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-c" ADD CONSTRAINT "descricao-c_processo_prefeitura_id_fkey" FOREIGN KEY ("processo_prefeitura_id") REFERENCES "processos-p"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-p" ADD CONSTRAINT "descricao-p_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-p" ADD CONSTRAINT "descricao-p_processo_cartorio_id_fkey" FOREIGN KEY ("processo_cartorio_id") REFERENCES "processo-c"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-descricao" ADD CONSTRAINT "aprovacao-descricao_aprovacao_id_fkey" FOREIGN KEY ("aprovacao_id") REFERENCES "aprovacao-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-descricao" ADD CONSTRAINT "aprovacao-descricao_descricao_id_fkey" FOREIGN KEY ("descricao_id") REFERENCES "descricao-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-c" ADD CONSTRAINT "aprovacao-c_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-pessoa" ADD CONSTRAINT "aprovacao-pessoa_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
