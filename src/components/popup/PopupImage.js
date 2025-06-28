import { useCallback, useState } from 'react';
import styled from 'styled-components';

export function PopupImage({ image, name }) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <ImageWrapper>
      {!loaded && <Placeholder />}
      <PopupImg src={image} alt={name} loading="lazy" onLoad={onLoad} />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  width: 350px;
  height: 350px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: #ccc;
  animation: pulse 1.5s infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;

  @keyframes pulse {
    0% {
      background-color: rgb(39, 60, 92);
    }
    50% {
      background-color: rgb(57, 78, 110);
    }
    100% {
      background-color: rgb(39, 60, 92);
    }
  }
`;

const PopupImg = styled.img`
  display: block;
  border-radius: 5px;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
