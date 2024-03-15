import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { LoaderCircleIcon, SearchIcon } from 'lucide-react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  isLoading: boolean;
}

const Search: React.FC<SearchProps> = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2 my-3">
      <Input 
        type="text" 
        placeholder="Pesquise aqui seu tênis..." 
        value={searchTerm}
        disabled={isLoading}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <LoaderCircleIcon  className='animate-spin'/> : <SearchIcon />}
      </Button>
    </form>
  );
};

export default Search;
