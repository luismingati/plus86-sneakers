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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircleDollarSign, MessageCircle, Send } from "lucide-react"
import { Separator } from "./ui/separator"

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
  return (
    <div className="">
      <form className={cn("flex flex-col justify-start gap-4", className)}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Modelo</Label>
          <Input type="text" id="email" defaultValue={tenisName} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tamanho">Tamanho</Label>
          <Input id="tamanho" required type="number" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" required type="tel" />
        </div>
        <Button type="submit" variant="default"><Send className="mr-2" size={20}/>Enviar</Button>
      </form>
      <div className="px-4">
        <Separator className="my-4" />
        <Button variant="whatsapp" className="w-full"><MessageCircle className="mr-2" size={20}/> WhatsApp</Button>
      </div>
    </div>
  )
}
