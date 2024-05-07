"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserFetch, CreateUserFetch } from "../page"
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreateUserSchema } from "@/schemas/user"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,

} from "@/components/ui/select"
import { createUser,updateUser } from "@/actions/user"
import { toast } from "sonner"

const avatar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"]

interface UserFormProps {
    user: UserFetch | null,
    data: CreateUserFetch
}
export default function UserForm({ user, data }: UserFormProps) {


    const form = useForm<z.infer<typeof CreateUserSchema>>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: {
            avatar: user?.avatar || "1",
            nome: user?.nome || "",
            email: user?.email || "",
            ativo: user?.ativo || true,
            perfil: user?.perfil || 'ADMIN',
            cartorio_id: user?.cartorio?.id || "",
            setor_id: user?.setor?.id || "",
            senha:""
        }
    })

    async function onSubmit(data: z.infer<typeof CreateUserSchema>) {
        if (!user) {
            const res = await createUser(data)

            if (!res) {
                toast.error("Este email já foi utilizado", {
                    duration: 3000,
                    classNames: {
                        toast: "text-base"
                    }
                })
            } else {

                toast.success("Usuário adicionado com sucesso", {
                    duration: 3000,
                    classNames: {
                        toast: "text-base"
                    }
                })
            }
        }else{
            if(user.id){
                const res = await updateUser(data,user.id)
                if (!res) {
                    toast.error("Este email já foi utilizado", {
                        duration: 3000,
                        classNames: {
                            toast: "text-base"
                        }
                    })
                } else {
    
                    toast.success("Usuário atualizado com sucesso", {
                        duration: 3000,
                        classNames: {
                            toast: "text-base"
                        }
                    })
                }
            }
        }
    }

    const perfil = form.watch("perfil")

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col space-y-6">
                    <div className="flex gap-10 flex-wrap py-5">
                        <FormField name="nome" control={form.control} render={({ field }) => (
                            <FormItem className="" >
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input className="w-[270px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }>
                        </FormField>
                        <FormField name="email" control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input className="w-[270px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }>
                        </FormField>
                        <FormField name="senha" control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input className="w-[270px]" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }>
                        </FormField>


                        <FormField name="perfil" control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormLabel>Perfil</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[270px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="PREFEITURA">Prefeitura</SelectItem>
                                        <SelectItem value="CARTORIO">Cartório</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />

                            </FormItem>
                        )
                        }>
                        </FormField>

                        {perfil === "CARTORIO" && (
                            <FormField name="cartorio_id" control={form.control} render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Cartório</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-[270px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data.cartorios.map((item, index) => {
                                                return (
                                                    <SelectItem key={index} value={item.id}>{item.nome}</SelectItem>
                                                )
                                            })}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )
                            }>
                            </FormField>
                        )}
                        {perfil === "PREFEITURA" && (
                            <FormField name="setor_id" control={form.control} render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Setor</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-[270px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data.setores.map((item, index) => {
                                                return (
                                                    <SelectItem key={index} value={item.id}>{item.nome}</SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )
                            }>
                            </FormField>

                        )}
                        <FormField name="ativo" control={form.control} render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center gap-1"  >
                                <FormLabel>Ativo</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }>
                        </FormField>
                    </div>
                    <FormField control={form.control} name="avatar" render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Avatares</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-wrap w-full "
                                >
                                    {avatar.map((item, index) => {
                                        return (
                                            <FormItem className="flex items-center p-4 gap-5" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={item}> </RadioGroupItem>
                                                </FormControl>
                                                <FormLabel className="font-normal">   <Avatar className="h-[110px] w-[110px]">
                                                    <AvatarImage src={`/avatar${item}.png`} />
                                                    <AvatarFallback>AV</AvatarFallback>
                                                </Avatar></FormLabel>
                                            </FormItem>

                                        )
                                    })}

                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button className="w-[140px] m-auto" type="submit">Salvar</Button>
                </form>
            </Form>

            <RadioGroup defaultValue="comfortable" className='flex flex-wrap'>

            </RadioGroup></div>

    )
}
