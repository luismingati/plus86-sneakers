import React from 'react';
import { Separator } from './ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className='mt-10 mb-10 flex flex-col px-4'>
      <Separator className='mb-10'/>
      <p className='px-6'>Desenvolvido por <span className='font-bold text-primary bg-background border-b border-b-primary'>@luismingati</span></p>
    </footer>
  );
};

export default Footer;