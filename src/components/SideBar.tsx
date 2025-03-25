"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useSession } from "next-auth/react"
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const session = useSession()

    return (
        <div className={`fixed top-0 left-0 h-full w-[230px] bg-primary transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {session.data?.user && (
                <div className="  text-white  p-4 pt-20 gap-5 flex flex-col items-center ">
                    <div className="flex flex-col items-center gap-4">

                        <Avatar className="h-[110px] w-[110px]">
                            <AvatarImage src={`/avatar${session.data.user.image}.png`} />
                            <AvatarFallback>AV</AvatarFallback>
                        </Avatar>

                        <Link href={"/private/perfil"}>
                            <Button className="px-3 w-[130px] " variant={"ghost"} > Perfil</Button>
                        </Link>
                        {session.data.user.perfil === "ADMIN" && (

                            <div>

                                <Link href={"/private/admin"}>
                                    <Button className="px-3  " variant={"ghost"} > Admin</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                    <Separator className="bg-gray-500" />
                    {session.data.user.perfil !== "CARTORIO" && (
                        <div>
                            <div>
                                <Link href={"/private/prefeitura"}>
                                    <Button className="px-3 " variant={"ghost"} > Processos {session.data.user.perfil === "ADMIN" && <span> (Prefeitura)</span>}</Button>
                                </Link>
                            </div>
                            <div className=" flex justify-center">
                                <Link href={"/private/prefeitura/encerrados"}>
                                    <Button className="px-3 " variant={"ghost"} > Encerrados</Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    <Separator className="bg-gray-500" />
                    {session.data.user.perfil !== "PREFEITURA" && (
                        <div>
                            <div >
                                <Link href={"/private/cartorio"}>
                                    <Button className="px-3 " variant={"ghost"} > Processos {session.data.user.perfil === "ADMIN" && <span> (Cartorio)</span>}</Button>
                                </Link>
                            </div>
                            <div className=" flex justify-center">
                                <Link href={"/private/cartorio/encerrados"}>
                                    <Button className="px-3 " variant={"ghost"} > Encerrados</Button>
                                </Link>
                            </div>
                        </div>
                    )}


                </div>
            )}
        </div>
    );
};