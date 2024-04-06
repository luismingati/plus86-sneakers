"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import ProductCard from '@/components/product-card';
import Search from '@/components/search';
import { Tenis } from '@prisma/client';

interface GenericLayoutProps {
  fetchItemsFunc: (page: number, searchTerm: string, searchParam: any) => Promise<any[]>;
  fetchQuantityFunc: (searchTerm: string, searchParam: any) => Promise<number>;
  searchParam?: any;
}

export const GenericLayout: React.FC<GenericLayoutProps> = ({ fetchItemsFunc, fetchQuantityFunc, searchParam = {} }: GenericLayoutProps) => {
  const [tenis, setTenis] = useState<Tenis[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tenisQuantity, setTenisQuantity] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTenis = async () => {
    setLoading(true);
    try {
      const [allTenis, quantity] = await Promise.all([
        fetchItemsFunc(page, searchTerm, searchParam),
        fetchQuantityFunc(searchTerm, searchParam)
      ]);
      
      setTenis(allTenis);
      setTenisQuantity(quantity);
    } catch (error) {
      console.error("Erro ao buscar tênis:", error);
    } finally {
      setLoading(false);
    }
  
    console.log("tenis fetched");
  };
  

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    fetchTenis();
  }, [page, searchTerm]);

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  const handleNextClick = () => {
    setPage(nextPage => Math.min(nextPage + 1, Math.ceil(tenisQuantity / 10)));
  };

  const handlePreviousClick = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const maxPage = Math.ceil(tenisQuantity / 10);
  const maxPagesToShow = 4;

  let startPage = Math.max(page - 2, 1);
  let endPage = Math.min(page + 1, maxPage);

  if (endPage - startPage + 1 < maxPagesToShow) {
    if (startPage > 1) startPage = Math.max(endPage - 3, 1);
    if (endPage < maxPage) endPage = Math.min(startPage + 3, maxPage);
  }
  
  return (
    <div className="px-4">
      <Search onSearch={handleSearch} isLoading={loading} />
      {tenis.length > 0 ? (
        <div>
          <div className="mb-6 flex flex-wrap gap-4 justify-center">
            {tenis.map((tenis) => (
              <Link href={`/details/${tenis.id}`} key={tenis.id}>
                <ProductCard tenis={tenis} />
              </Link>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer" onClick={handlePreviousClick}>
                <PaginationPrevious />
              </PaginationItem>
              {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                const pageIndex = startPage + index;
                return (
                  <PaginationItem key={pageIndex} onClick={() => setPage(pageIndex)}>
                    <PaginationLink isActive={pageIndex === page}>
                      {pageIndex}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem className="cursor-pointer" onClick={handleNextClick}>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p>Nenhum item encontrado. Tente outro termo de pesquisa.</p>
        </div>
      )}
    </div>
  );
}

