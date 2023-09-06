import { useCallback } from "react";
import { styled } from "styled-components"
import searchIcon from './../../../assets/search-icon.svg';

const Root = styled.div`
  position: relative;
`

const Input = styled.input`
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  border: none;
  width: 15rem;
  font-size: 1rem;
`

const SearchIcon = styled.img`
  position: absolute;
  top: 0.8rem;
  right: 1rem;
`

interface Props {
  searchInput: string;
  className?: string;
  onChange: (value: string) => void;
}

function SearchBox({ className, searchInput, onChange }: Props) {

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <Root className={className}>
      <Input
        value={searchInput}
        placeholder="Search your favorite gifs"
        onChange={handleChange}
      />
      <SearchIcon src={searchIcon} />
    </Root>
  )
}

export default SearchBox
