import React from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';
// import Card from '../components/Card';
import WeatherProperty from '../components/WeatherProperty';

const Container = styled.View`
  flex: 1;
`;

const Details = ({route}: any) => {
  const {
    humidity,
    pressure,
    windSpeed,
    cloudCover,
    name,
    subtitle,
    temperature,
    image,
  } = route.params;

  return (
    <Container>
      <Card
        path="Details"
        title={name}
        subtitle={subtitle}
        temperature={temperature}
        image={image}
      />
      <WeatherProperty title="Humidity" value={`${humidity}%`} />
      <WeatherProperty title="Pressure" value={`${pressure}hPa`} />
      <WeatherProperty title="Wind Speed" value={`${windSpeed}mph`} />
      <WeatherProperty title="Cloud Cover" value={`${cloudCover}%`} />
    </Container>
  );
};

export default Details;
