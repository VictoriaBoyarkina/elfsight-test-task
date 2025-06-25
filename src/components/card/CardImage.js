import { useCallback, useState } from 'react';
import styled from 'styled-components';

export function CardImage({ image, name }) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <ImageWrapper>
      {!loaded && <Placeholder />}
      <CardImg src={image} alt={name} loading="lazy" onLoad={onLoad} />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  height: 375px;
  position: relative;
  overflow: hidden;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: #ccc;
  animation: pulse 1.5s infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px 10px 0 0;
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

const CardImg = styled.img`
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 100%;
`;
