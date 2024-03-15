import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Image from 'next/image';
import { Tenis } from '@prisma/client';

interface Props {
  tenis: Tenis;
}

const MyCarousel: React.FC<Props> = ({tenis}: Props) => {
  return (
    <div className='flex items-center justify-center'>
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
    </Carousel>
    </div>
  );
};

export default MyCarousel;