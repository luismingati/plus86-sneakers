"use client"
import React from 'react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ModeToggle } from './mode-toggle';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className='w-full mt-4'>
                  Nike
                </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/nike">
                  <DropdownMenuItem>Ver todos</DropdownMenuItem>
                </Link>
                <Link href="/nike/Air Jordan 1">
                  <DropdownMenuItem>Air Jordan 1</DropdownMenuItem>
                </Link>
                <Link href="/nike/Dunk Low">
                  <DropdownMenuItem>Dunk Low</DropdownMenuItem>
                </Link>
                <Link href="/nike/SB Dunk Low">
                  <DropdownMenuItem>SB Dunk Low</DropdownMenuItem>
                </Link>
                <Link href="/nike/Travis Scott x Nike">
                  <DropdownMenuItem>Nike x Travis Scott</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className='w-full mt-4'>
                  Louis Vuitton
                </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/Louis Vuitton">
                    <DropdownMenuItem>Ver todos</DropdownMenuItem>
                </Link>
                <Link href="/Louis Vuitton/LV trainer">
                  <DropdownMenuItem>LV Trainer</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/perguntas-frequentes">
              <Button variant="outline" className='w-full mt-4'>
                Perguntas Frequentes
              </Button >
            </Link>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Navbar;