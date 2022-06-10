import React from 'react';

import {Container, Title, Value} from './styles';

interface WeatherPropertyProps {
  title: string;
  value: string;
}

const WeatherProperty = ({title, value}: WeatherPropertyProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Container>
  );
};

export default WeatherProperty;
