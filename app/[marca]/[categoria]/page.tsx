"use client"

import { getOrSearchTenisByCategoria, getTenisQuantityByCategoria } from '@/app/_actions/getTenis';
import { GenericLayout } from '@/app/GenericPage';

const Categoria = ({ params }: { params: { categoria: string } }) => (
  <GenericLayout
    fetchItemsFunc={(page, searchTerm) => getOrSearchTenisByCategoria(page, decodeURIComponent(params.categoria), searchTerm)}
    fetchQuantityFunc={(searchTerm) => getTenisQuantityByCategoria(decodeURIComponent(params.categoria), searchTerm)}
    searchParam={{ categoria: decodeURIComponent(params.categoria) }}
  />
);

export default Categoria;
