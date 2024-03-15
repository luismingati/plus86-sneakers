import React from 'react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ModeToggle } from './mode-toggle';

const Navbar: React.FC = () => {
  return (
    <Card> 
      <CardContent className='px-8 py-5 flex justify-between items-center'>
        <Link href="/">
          <h1 className='h-[22px] font-bold'>+Plus86 Sneakers</h1>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={24}/>
            </Button>
          </SheetTrigger>

          <SheetContent className=''>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Navbar;