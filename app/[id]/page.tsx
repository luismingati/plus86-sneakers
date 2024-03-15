"use client"

import { Tenis } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { getTenisById } from '../_actions/getTenis';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CircleCheck, CircleDollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TenisPage({ params }: { params: { id: string } }) {

  const [tenis, setTenis] = useState<Tenis | null>()

  const getOneTenis = async () => {
    const tenis = await getTenisById(parseInt(params.id))
    setTenis(tenis)
  }

  useEffect(() => {
    getOneTenis()
  }, [])

  return (
    <div className='mt-8'>
      {tenis && 
      <div>
        <div className='flex items-center justify-center'>
          {tenis.imagesUrl.length > 0 ? 
          <Carousel className='max-w-[75vw]'>
          <CarouselContent className=''>
            {tenis.imagesUrl.map((image, index) => (
              <CarouselItem key={index} className='max-lg:flex max-lg:items-center max-lg:justify-center lg:basis-1/2'>
                  <Image 
                    priority
                    src={image} 
                    alt={tenis.nome} 
                    width={500}
                    height={500}
                  />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> :
        <Image 
          priority
          src={tenis.thumbnailUrl} 
          alt={tenis.nome} 
          width={500}
          height={500} />
        }
          
        </div>
        <div className='flex flex-col mt-6 px-4'>
        <Separator className=' self-center' />
        <h1 className='text-2xl mt-4'>{tenis.nome}</h1>
        <p className='text-xs text-gray-500 mt-1'>Tamanhos disponiveis do 34 ao 45</p>
        <p className='mt-2'>Preço: <span className='font-bold text-xl text-primary'>R$ {tenis.preco}</span></p>
        <p>Parcele em até 12x de <span className='font-bold text-base text-primary'>R$ {(tenis.preco * (10/100)).toFixed(2)}</span></p>
        <Button className='mt-4 flex gap-3'><CircleDollarSign /> Comprar agora</Button>
        <p className='mt-4 text-sm flex items-center gap-2'>Disponibilidade: <Badge><CircleCheck size={18} className='mr-1'/> Em estoque</Badge></p>
        </div>
      </div>
     }
    </div>
  );
};
