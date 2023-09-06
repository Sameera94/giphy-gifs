import styled from "styled-components";
import SearchBox from "../../molecules/SearchBox/SearchBox";

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: white;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  > * + * {
    margin-top: 1rem;
  }
`;

const Heading = styled.h1`
  padding: 0;
  margin: 0;
`

interface Props {
  searchInput: string;
  onChange: (value: string) => void;
}

const Header = (props: Props) => {
  return (
    <HeaderWrapper>
      <Heading>Giphies</Heading>
      <SearchBox {...props} />
    </HeaderWrapper>
  );
};

export default Header;
