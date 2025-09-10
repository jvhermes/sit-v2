


import { Title } from "@/components/Title";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ModalSenha } from "./components/ModalSenha";
import { UserPerfilProps } from "@/types/types";
import api from "@/lib/api";
import { useContext } from "react";
import { AuthContext } from "@/context/auth_provider";


const fetchUser = async (id: string | undefined): Promise<UserPerfilProps | null> => {

  const user:UserPerfilProps = await api.get(`/user/${id}`)

  return user;
}

export default async function Usuario() {

  const { user, loading } = useContext(AuthContext);


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
