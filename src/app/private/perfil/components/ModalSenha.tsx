"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,

    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { FaLock } from "react-icons/fa";
import { toast } from "sonner";
import { updateSenha } from "@/actions/user";

const formSchema = z.object({
    senha: z.string({
        required_error: "Campo não pode estar vazio"
    }).min(6, {
        message: "Mínimo de 6 caracteres"
    }).max(20),
})

type ModalSenhaProps = {
    id:string
}
export function ModalSenha({id}:ModalSenhaProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            senha: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await updateSenha(id,values.senha)
        if (!res) {
            toast.error("Erro ao trocar senha", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
        } else {
            toast.success("Nova senha registrada", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
        }
        form.reset()
        
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex gap-2" variant={"outline"}><FaLock size={15} />Trocar senha</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[455px]">
                <DialogHeader>
                    <DialogTitle>Trocar Senha</DialogTitle>

                </DialogHeader>
                <div className="flex gap-4 py-4">
    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                            <FormField
                                control={form.control}
                                name="senha"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel>Nova senha:</FormLabel>
                                        <FormControl>
                                            <Input type="password" className="w-[250px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="m-auto" type="submit">Salvar senha</Button>
                        </form>
                    </Form>

                </div>
    
            </DialogContent>
        </Dialog>
    )
}