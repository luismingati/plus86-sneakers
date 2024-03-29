"use client"
import { getOrSearchTenisByMarca, getTenisQuantityByMarca } from '../_actions/getTenis';
import { GenericLayout } from '../GenericPage';

const Marca = ({ params }: { params: { marca: string } }) => (
  <GenericLayout
    fetchItemsFunc={(page, searchTerm) => getOrSearchTenisByMarca(page, decodeURIComponent(params.marca), searchTerm)}
    fetchQuantityFunc={(searchTerm) => getTenisQuantityByMarca(decodeURIComponent(params.marca), searchTerm)}
    searchParam={{ marca: decodeURIComponent(params.marca) }}
  />
);

export default Marca;
