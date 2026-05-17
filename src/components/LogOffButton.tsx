"use client"

import { Button } from "@/components/ui/button";
import { signout } from "@/actions/user";
import { RiLogoutBoxRLine } from "react-icons/ri"
import { useRouter } from "next/navigation";

export function LogOffButton() {
    const router = useRouter()

    const logOff = async () => {
        await signout()
        window.localStorage.removeItem("sit-demo-view")
        router.push("/");
    }
    return (

        <Button variant={"ghost"} onClick={logOff} className="flex gap-4 text-gray-600 text-[1rem]" > <RiLogoutBoxRLine size={18} /> Desconectar</Button>

    )
}
