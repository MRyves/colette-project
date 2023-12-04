import React, { useState } from 'react';
import { InputBase } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(() => ({
  justifyContent: 'space-between',
  margin: '0px 0px 30px 0px',
  display: 'flex',
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: 'inherit',
  padding: '0px 15px',
  backgroundColor: '#ffffff',
  height: '50px',
  flex: 1,
}));

const SearchIconWrapper = styled('div')(() => ({
  backgroundColor: '#c58b64',
  color: '#ffffff',
  padding: '10px',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50px',
  height: '50px',
  ":hover": {
    backgroundColor: '#436c71',
}
}));

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [searchValue, setSearchValue] = useState('');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchValue(value);
    };
  
    const handleSearch = () => {
      onSearch(searchValue);
    };
  
    return (
      <Search>
        <StyledInputBase
          placeholder="Suchen..."
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={handleChange}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <SearchIconWrapper onClick={handleSearch}>
          <SearchIcon />
        </SearchIconWrapper>
      </Search>
    );
  }

export default SearchBar;
