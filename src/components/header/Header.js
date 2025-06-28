import styled from 'styled-components';
import { Logo } from './Logo';
import { Filters } from './Filters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  row-gap: 30px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
