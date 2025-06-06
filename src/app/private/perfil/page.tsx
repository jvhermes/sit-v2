

import { Perfil } from "@prisma/client"
import prisma from "@/utils/db"
import { auth } from "@/auth";
import { Title } from "@/components/Title";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ModalSenha } from "./components/ModalSenha";

type UserFetch = {
  id:string,
  nome: string,
  perfil: Perfil,
  email: string,
  avatar: string,
  cartorio: {
    nome: string
  } | null,
  setor: {
    nome: string
  } | null
}

const fetchUser = async (id: string | undefined): Promise<UserFetch | null> => {

  const user = await prisma.usuario.findFirst({
    where: {
      id: id
    },
    select: {
      id:true,
      nome: true,
      email: true,
      avatar: true,
      perfil: true,
      cartorio: {
        select: {
          nome: true
        }
      },
      setor: {
        select: {
          nome: true
        }
      }
    }
  });

  return user;
}

export default async function Usuario() {

  const session = await auth()

  const user = await fetchUser(session?.user.id);

  return (
    <>
      <Title name="Perfil de Usuário" text="Detalhes do seu cadastro"></Title>
      {user && (
        <div className="w-11/12">
          <div className="py-5 flex justify-end">

           <ModalSenha id={user.id} />
          </div>
          <div className="border bg-whitetipo rounded flex-wrap py-10 flex justify-center sm:justify-start sm:pl-10 items-center gap-10">
            < Avatar className="w-[170px] h-[170px] " >
              <AvatarImage src={`/avatar${user.avatar}.png`} alt="avatar" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar >
            <div>
              <p>Nome:<strong>  {user.nome} </strong></p>
              {(user.perfil === "PREFEITURA" && user.setor) && <p>Vinculado à:<strong> {user.setor.nome} </strong></p>}
              {(user.perfil === "CARTORIO" && user.cartorio) && <p>Vinculado à: <strong>{user.cartorio.nome} </strong></p>}
              {(user.perfil === "ADMIN") && <p>Perfil: <strong>Administrador </strong></p>}
              <p>Email: <strong>  {user.email} </strong></p>
              <p></p>
            </div>
          </div>
        </div>
      ) || (
        <div className='mt-10'>
          <p>{"Usuário não está logado"}</p>
        </div>
      )}
    </>
  );
}
