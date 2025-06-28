import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  font-family: sans-serif;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #83bf46;
  border-radius: 6px;
  background-color: #263750;
  color: white;
  text-overflow: ellipsis;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus {
    outline: none;
    background-color: #334466;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function CustomInput({
  value,
  onChange,
  placeholder = 'Введите значение...',
  name,
  type = 'text',
  disabled = false
}) {
  return (
    <Wrapper>
      <StyledInput
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </Wrapper>
  );
}
