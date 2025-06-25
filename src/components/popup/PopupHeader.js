import styled from 'styled-components';
import { CardStatus } from '../card/CardStatus';
import { CardTitle } from '../card/CardTitle';
import { PopupImage } from './PopupImage';

export function PopupHeader({ image, name, gender, status, species, type }) {
  return (
    <PopupHeaderContainer>
      <PopupImage image={image?.replace('../', '')} name={name} key={image} />
      <PopupTitle name={name} gender={gender} />
      <PopupStatus status={status} species={species} type={type} />
    </PopupHeaderContainer>
  );
}

const PopupHeaderContainer = styled.div``;

const PopupTitle = styled(CardTitle)`
  font-size: 22px;
  margin-top: 30px;
  justify-content: center;
`;

const PopupStatus = styled(CardStatus)`
  font-size: 20px;
  justify-content: center;

  & p {
    text-align: center;
    margin-top: 10px;
  }
`;
