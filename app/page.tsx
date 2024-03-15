"use client"
import React, { useEffect, useState } from 'react';
import { searchTenis, getTenis, getTenisQuantity } from './_actions/getTenis';
import ProductCard from '@/components/product-card';
import Link from 'next/link';
import Search from '@/components/search';
import { Tenis } from "@prisma/client";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export default function Home() {
  const [tenis, setTenis] = useState<Tenis[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tenisQuantity, setTenisQuantity] = useState(0);

  const getAllTenis = async () => {
    setLoading(true);
    const allTenis = await getTenis(page);
    setTenis(allTenis);
    setLoading(false);
  };

  const getAllTenisQuantity = async () => {
    const tenisQuantity = await getTenisQuantity();
    setTenisQuantity(tenisQuantity);
  }

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    if (!searchTerm.trim()) {
      getAllTenis();
    } else {
      const searchResults = await searchTenis(searchTerm);
      setTenis(searchResults);
    }
    setLoading(false);
  };

  const handleNextClick = async () => {
    const nextPage = page + 1;
    if (nextPage > Math.ceil(tenisQuantity / 10)) return;
    setLoading(true);
    setPage(nextPage);
    const nextTenis = await getTenis(nextPage);
    setTenis(nextTenis);
    setLoading(false);
  }
  
  const handlePreviousClick = async () => {
    const previousPage = page - 1;
    if (previousPage < 1) return;
    setLoading(true);
    setPage(previousPage);
    const previousTenis = await getTenis(previousPage);
    setTenis(previousTenis);
    setLoading(false);
  }

  useEffect(() => {
    getAllTenis();
    getAllTenisQuantity();
  }, []);

  return (
    <div className="px-4">
      <Search onSearch={handleSearch} isLoading={loading} />
      <div className="mb-6 flex flex-1 flex-col gap-4 items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tenis.map((tenisItem) => (
          <Link href={`/${tenisItem.id}`} key={tenisItem.id}> 
            <ProductCard tenis={tenisItem} />
          </Link>
        ))}
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem onClick={handlePreviousClick} >
              <PaginationPrevious/>
            </PaginationItem>
            <PaginationItem onClick={handleNextClick}>
              <PaginationNext/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
