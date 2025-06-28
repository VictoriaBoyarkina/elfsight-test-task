import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  font-size: 16px;
  height: 40px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid
    ${({ variant }) => (variant === 'apply' ? '#83bf46' : '#ff5f5f')};
  color: ${({ variant }) => (variant === 'apply' ? '#83bf46' : '#ff5f5f')};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === 'apply' ? '#83bf4622' : '#ff5f5f22'};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ variant }) => (variant === 'apply' ? '#83bf46' : '#ff5f5f')};
    outline-offset: 4px;
  }
`;

export function Button({ children, variant = 'apply', ...props }) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
