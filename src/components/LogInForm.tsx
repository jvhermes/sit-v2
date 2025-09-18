"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useState } from "react";
import { LogUserSchema } from "@/schemas/user";
import { login } from "@/actions/user";
export function LogInForm() {
    const [error, setError] = useState("")

    const form = useForm<z.infer<typeof LogUserSchema>>({
        resolver: zodResolver(LogUserSchema),
        defaultValues: {
            email: "",
            senha: ""
        }
    })

    const handleSubmit = async (values: z.infer<typeof LogUserSchema>) => {
        const res = await login(values)
        if (res?.error) {
            setError(res.error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="p-5 flex flex-col gap-4 w-1/5 min-w-[300px]" >
                <FormField name="email" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
                }>
                </FormField>
                <FormField name="senha" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
                }>
                </FormField>
                <Button type="submit">Entrar</Button>
                {error && <span className="text-red-500">{error}</span>}
            </form>
        </Form>

    )
}
