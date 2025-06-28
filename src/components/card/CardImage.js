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
      <CardImg
        src={image}
        alt={name}
        loading="lazy"
        onLoad={onLoad}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 1 / 1; /* квадратное изображение */
  width: 100%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  background: #ccc;
  animation: pulse 1.5s infinite;
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
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  border-radius: 10px 10px 0 0;
`;
