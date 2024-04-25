import React, { useState } from 'react';
import '../App.css'
interface SearchBarProps {
  onSearch: (symbol: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [symbol, setSymbol] = useState<string>("");
   const [error,setError] = useState<boolean>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (symbol.trim() !== "") {
      onSearch(symbol);
      setError(false);
    } else {
      setError(true);
    }
  } 

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter symbol..."
        value={symbol}
        onChange={handleChange}
      />
      <button className='search-btn' type="submit">Search</button>
      {
        error && <p className='error'>Please enter a valid symbol</p>
      }
    </form>
  )
}

export default SearchBar;
