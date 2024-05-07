"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, ChangeEvent, FormEvent } from "react"
import { toast } from "sonner"
import { saveCSV } from "@/actions/csv"
import Papa from 'papaparse';

const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"


async function parseCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const lotesRes: any[] = [];

        Papa.parse(file, {

            complete: function (res) {
                res.data.forEach((item: any) => {
                    const fileLineSplit = item[0];
                    lotesRes.push(fileLineSplit);
                });

                resolve(lotesRes);
            },
            skipEmptyLines: true,
            error: function (error) {
                reject(error);
            },
            
        });
    });
}

export function LoteList() {
    const [file, setFile] = useState<File | null>(null)

    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        if (!e.target.files) {
            setFile(null)
            return;
        }
        const fileSource = e.target.files[0];

        if (!fileSource) {
            setFile(null)
            return;
        }
        setFile(fileSource);

    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!file) {
            toast.warning("Nenhum arquivo foi selecionado", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
        } else {
            const lotesRes = await parseCSV(file);
            const res =  saveCSV(lotesRes)

            if(!res){
                toast.error("Erro ao atualizar base de dados", {
                    duration: 3000,
                    classNames: {
                        toast: "text-base"
                    }
                })
            }else{

            toast.success("Base de dados atualizada", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
            }
        }
    }
    return (
        <div className="flex items-center pt-16 flex-col">
            <p className="p-3">Atualizar bade de dados dos lotes</p>
            <p className="p-1 text-sm">*apenas arquivos do tipo CSV</p>

            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center gap-5 pt-5">
                <Input type="file"  accept={acceptableCSVFileTypes}placeholder="csv" onChange={(e) => handleChange(e)} />

                <Button type="submit">Salvar</Button>

            </form>
        </div>
    )
}
