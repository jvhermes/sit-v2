
import { Title } from "@/components/Title";
import { AdminMenu } from "./components/adminMenu";
import prisma from "@/utils/db";


const fechData = async () => {

    const [atividades,cartorios,setores,user] = await Promise.all([
      prisma.atividade.findMany(),
      prisma.cartorio.findMany(),
      prisma.setor.findMany(),
      prisma.usuario.findMany({
        include:{
          cartorio:true,
          setor:true
        }
      })
    ])
    
    const usuarios = user?.map((item) => {

        let ativo = ""
        let local = "admin"

        if(item.ativo){
          ativo = "Ativo"
        }else{
          ativo = "Inativo"
        }

        if(item.perfil === "CARTORIO" && item.cartorio)local = item.cartorio.nome
        if(item.perfil === "PREFEITURA" && item.setor)local = item.setor.nome

        return{
          id:item.id,
          nome:item.nome,
          email:item.email,
          avatar:item.avatar,
          local: local,
          ativo:ativo,
          tipo:item.perfil.toLowerCase()
        }
    })
    return {atividades,cartorios,setores,usuarios}
  }

export default async function AdminPage() {

    const {atividades,cartorios,setores,usuarios} = await fechData()
    return (
        <>
            <Title name="Configurações" text="Editar detalhes do Sistema"></Title>

            <AdminMenu atividades={atividades} setores={setores} usuarios={usuarios} cartorios={cartorios} />
        </>
    )
}

