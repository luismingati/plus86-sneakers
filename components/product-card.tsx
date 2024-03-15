import { Tenis } from '@prisma/client';
import { Card, CardContent, CardFooter } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface TenisCardProps {
  tenis: Tenis;
}

const ProductCard: React.FC<TenisCardProps> = ({tenis}: TenisCardProps) => {
  return (
    <Card className="max-w-lg flex flex-col justify-between">
      <CardContent className='px-0'>
        <div className='relative flex-1'>
          <Badge className='absolute top-2 left-2'>{tenis.marca}</Badge>
          <Image 
            className='rounded-sm aspect-square object-cover'
            src={tenis.thumbnailUrl} 
            alt={tenis.nome || "Tenis estiloso"}
            width={512}
            height={512}
            />
        </div>
        <h2 className='text-lg mt-1 px-3'>{tenis.nome}</h2>
        <p className='text-2xl font-bold px-3'>R${tenis.preco}</p>
      </CardContent>
      <CardFooter className='px-3 py-0 pb-3'>
        <Button className='w-full'>Comprar</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;