"use client"
import React, { useEffect, useState } from 'react';
import { getTenisQuantity, getOrSearchTenis } from './_actions/getTenis';
import ProductCard from '@/components/product-card';
import Link from 'next/link';
import Search from '@/components/search';
import { Tenis } from "@prisma/client";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export default function Home() {
  const [tenis, setTenis] = useState<Tenis[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tenisQuantity, setTenisQuantity] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllTenisQuantity = async () => {
    console.log("getAllTenisQuantity function actived");
    const tenisQuantity = await getTenisQuantity();
    setTenisQuantity(tenisQuantity);
  }

  const getAllTenis = async () => {
    console.log("getAllTenis function actived");
    setLoading(true);
    const allTenis = await getOrSearchTenis(page);
    getAllTenisQuantity();
    setTenis(allTenis);
    setLoading(false);
  };

  const handleSearch = async (search: string) => {
    setLoading(true);
    setSearchTerm(search);
    const searchResults = await getOrSearchTenis(1, search.trim());
    setPage(1);
    setTenisQuantity(await getTenisQuantity(search.trim()));
    setTenis(searchResults);
    setLoading(false);
  };

  const handleNextClick = async () => {
    const nextPage = page + 1;
    if (nextPage > Math.ceil(tenisQuantity / 10)) return;
    setLoading(true);
    setPage(nextPage);
    const nextTenis = await getOrSearchTenis(nextPage, searchTerm.trim());
    setTenis(nextTenis);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousClick = async () => {
    const previousPage = page - 1;
    if (previousPage < 1) return;
    setLoading(true);
    setPage(previousPage);
    const previousTenis = await getOrSearchTenis(previousPage, searchTerm.trim());
    setTenis(previousTenis);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    getAllTenis();
    getAllTenisQuantity();
  }, []);

  return (
    <div className="px-4">
      <Search onSearch={handleSearch} isLoading={loading} />
      {tenis.length > 0 ? (
        <div>
          <div className="mb-6 flex flex-1 flex-col gap-4 items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tenis.map((tenisItem) => (
              <Link href={`/${tenisItem.id}`} key={tenisItem.id}> 
                <ProductCard tenis={tenisItem} />
              </Link>
            ))}
          </div>
          <Pagination>
            <PaginationContent >
              <PaginationItem className='cursor-pointer' onClick={handlePreviousClick} >
                <PaginationPrevious/>
              </PaginationItem>
              <PaginationItem className='cursor-pointer' onClick={handleNextClick}>
                <PaginationNext/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        ) : (
          <div className='h-10 mt-10 mb-10 text-center'>
            <p className='font-bold text-sm'>Nenhum tenis encontrado. Tente outro termo de pesquisa</p>
          </div>
        )}
      <div>        
        
      </div>
    </div>
  );
}
