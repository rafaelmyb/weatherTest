import React from 'react';

import {
  Container,
  ContentLeft,
  ContentRight,
  TextContainer,
  Subtitle,
  Title,
  Temperature,
  WeatherImage,
} from './styles';

interface CardProps {
  path: string;
  id?: number;
  title: string;
  subtitle: string[];
  temperature: number;
  image: string[];
}

const Card = ({path, title, subtitle, temperature, image}: CardProps) => {
  return (
    <Container path={path}>
      <ContentLeft>
        <WeatherImage
          source={{
            uri: `http://openweathermap.org/img/w/${image}.png`,
          }}
        />
        <TextContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TextContainer>
      </ContentLeft>
      <ContentRight>
        <Temperature path={path}>{temperature} ºF</Temperature>
      </ContentRight>
    </Container>
  );
};

export default Card;
