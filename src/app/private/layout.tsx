"use client"

import { useState } from "react";
import Sidebar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { HiOutlineMenu } from "react-icons/hi";
import { signout } from "@/actions/user";
import { RiLogoutBoxRLine } from "react-icons/ri"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="w-full h-full bg-gray-100 ">
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <div className={`  transition-all   items-center flex-col flex duration-300 ${isSidebarOpen ? 'ml-[230px]' : 'ml-0'} `}>
                <div className="  w-full flex justify-between  h-15 px-8 py-4">
                    <Button onClick={toggleSidebar} className="px-3" ><HiOutlineMenu size={22} /></Button>
                    <form action={async() => {
                        await signout()
                    }}>
                        <Button variant={"ghost"} type="submit" className="flex gap-4 text-gray-600 text-[1rem]" > <RiLogoutBoxRLine size={18} /> Desconectar</Button>
                    </form>
                </div>
                {children}
            </div>

        </div>
    );
}
