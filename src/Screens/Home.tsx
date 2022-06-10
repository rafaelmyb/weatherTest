import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import Card from '../components/Card';
import {OPENWEATHER_API_URL, QUERY_PARAMS} from '../services/api';
import {DataProps} from '../@types/Home';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding-right: 16px;
  align-items: center;
  background-color: #fff;
  border-bottom-color: #b5d7e4;
  border-bottom-width: 1.5px;
`;

const Arrow = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Home = ({navigation}: any) => {
  const [data, setData] = useState<DataProps>();

  const url = `${OPENWEATHER_API_URL}${QUERY_PARAMS}`;

  useEffect(() => {
    async function fetchData() {
      await axios.get<DataProps>(url).then(response => {
        setData(response.data);
      });
    }
    fetchData();
  }, [url]);

  function handleNavigation(
    humidity: number,
    pressure: number,
    windSpeed: number,
    cloudCover: number,
    name: string,
    subtitle: string[],
    temperature: number,
    image: string[],
  ) {
    navigation.navigate('Details', {
      humidity,
      pressure,
      windSpeed,
      cloudCover,
      name,
      subtitle,
      temperature,
      image,
    });
  }

  return (
    <>
      {data?.list.map(listItem => (
        <Container key={listItem.id} data-testID="HomeContainer">
          <Card
            path="Home"
            title={listItem.name}
            subtitle={listItem.weather.map(weatherItem => weatherItem.main)}
            temperature={listItem.main.temp}
            image={listItem.weather.map(weatherItem => weatherItem.icon)}
          />
          <Pressable
            onPress={() =>
              handleNavigation(
                listItem.main.humidity,
                listItem.main.pressure,
                listItem.wind.speed,
                listItem.clouds.all,
                listItem.name,
                listItem.weather.map(weatherItem => weatherItem.main),
                listItem.main.temp,
                listItem.weather.map(weatherItem => weatherItem.icon),
              )
            }>
            <Arrow source={require('../assets/images/arrow.png')} />
          </Pressable>
        </Container>
      ))}
    </>
  );
};

export default Home;
