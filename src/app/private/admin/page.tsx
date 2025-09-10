
import { Title } from "@/components/Title";
import { AdminMenu } from "./components/adminMenu";
import { Atividade, Cartorio, Setor, Tipo, UserAdminProps } from "@/types/types";
import api from "@/lib/api";

interface DataProps {
  atividades: Atividade[];
  cartorios: Cartorio[];
  tipos: Tipo[];
  setores: Setor[];
  user: UserAdminProps[]
}

const fechData = async () => {

  const { tipos, atividades, cartorios, setores, user }: DataProps = await api.get("/data/admin")

  const usuarios = user?.map((item) => {

    let ativo = ""
    let local = "admin"

    if (item.ativo) {
      ativo = "Ativo"
    } else {
      ativo = "Inativo"
    }

    if (item.perfil === "CARTORIO" && item.cartorio) local = item.cartorio.nome
    if (item.perfil === "PREFEITURA" && item.setor) local = item.setor.nome

    return {
      id: item.id,
      nome: item.nome,
      email: item.email,
      avatar: item.avatar,
      local: local,
      ativo: ativo,
      tipo: item.perfil.toLowerCase()
    }
  })
  return { tipos, atividades, cartorios, setores, usuarios }
}

export default async function AdminPage() {

  const { tipos, atividades, cartorios, setores, usuarios } = await fechData()
  return (
    <>
      <Title name="Configurações" text="Editar detalhes do Sistema"></Title>

      <AdminMenu tipos={tipos} atividades={atividades} setores={setores} usuarios={usuarios} cartorios={cartorios} />
    </>
  )
}

