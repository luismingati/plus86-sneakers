"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircleDollarSign, LoaderCircle, MessageCircle, Send } from "lucide-react"
import { Separator } from "./ui/separator"
import { sendEmail } from "@/app/_actions/sendEmail"
import { useToast } from "./ui/use-toast"
import Link from "next/link"

interface BuyNowProps {
  tenisName: string
}

export function BuyNow({tenisName}: BuyNowProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = window.matchMedia("(min-width: 768px)").matches

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button ><CircleDollarSign className="mr-2"/> Comprar agora</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enviar Formulário ou WhatsApp</DialogTitle>
            <DialogDescription>
              Escolha o que for melhor para você!
            </DialogDescription>
          </DialogHeader>
          <ProfileForm tenisName={tenisName} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button ><CircleDollarSign className="mr-2"/> Comprar agora</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Enviar Formulário ou WhatsApp</DrawerTitle>
          <DrawerDescription>
            Escolha o que for melhor para você!
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm tenisName={tenisName} className="px-4" />
        <DrawerFooter className="pt-2">
         
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className, tenisName }: { className?: string; tenisName: string }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const [formData, setFormData] = React.useState({
    modelo: tenisName,
    tamanho: "",
    telefone: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    console.log("mahoe")
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      console.log("mahoe")

      setIsLoading(true);
      await sendEmail(formDataToSend);
      toast({
        title: "Pedido enviado com sucesso!",
        description: "Em breve um de nossos vendendores entrará em contato com você.",
      })
    } catch (error) {
    console.log("deu ruim")

      toast({
        title: "Erro ao enviar pedido!",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      })
    } finally {
      setFormData({
        modelo: "",
        tamanho: "",
        telefone: "",
      });
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeTelefone = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { value } = e.target;
    value = value.replace(/\D/g, ""); // Remove todos os caracteres não-dígitos
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em torno dos dois primeiros dígitos
    value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Adiciona um hífen antes dos últimos 4 dígitos
    setFormData(prevState => ({
      ...prevState,
      telefone: value
    }));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className={cn("flex flex-col justify-start gap-4", className)}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="modelo">Modelo</Label>
          <Input disabled type="text" name="modelo" onChange={handleChange} id="modelo" value={formData.modelo} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tamanho">Tamanho</Label>
          <Input id="tamanho" name="tamanho" value={formData.tamanho} onChange={handleChange} required type="number" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChangeTelefone} required type="tel" />
        </div>
        {isLoading ? (
          <Button disabled ><LoaderCircle className="animate-spin"/></Button>
        ) : (
          <Button type="submit" variant="default"><Send className="mr-2" size={20}/>Enviar</Button>
        )
        }
      </form>
      <div className="max-md:px-4 ">
        <Separator className="my-4" />
        <a href={`https://wa.me//5581992673319?text=Olá, tenho%20interesse%20em%20comprar%20o%20tenis%20${tenisName}`}>
          <Button variant="whatsapp" className="w-full"><MessageCircle className="mr-2" size={20}/> WhatsApp</Button>
        </a>
      </div>
    </div>
  )
}
