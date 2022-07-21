import React, {useEffect, useState} from 'react';
import {FlatList, Pressable} from 'react-native';

import axios from 'axios';

import Card from '../../components/Card';
import {OPENWEATHER_API_URL, QUERY_PARAMS} from '../../services/api';
import {DataProps} from '../../@types/Home';
import GooglePayOpenButton from '../../components/GooglePayOpenButton';

import arrowimg from '../../assets/images/arrow.png';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding-right: 16px;
  align-items: center;
  background-color: #fff;
  border-bottom-color: #b5d7e4;
  border-bottom-width: 1px;
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
      <GooglePayOpenButton navigation={navigation} />
      <FlatList
        data={data?.list}
        keyExtractor={listItem => listItem.name}
        renderItem={({item}) => (
          <Container>
            <Card
              path="Home"
              title={item.name}
              subtitle={item.weather.map(weatherItem => weatherItem.main)}
              temperature={item.main.temp}
              image={item.weather.map(weatherItem => weatherItem.icon)}
            />
            <Pressable
              onPress={() =>
                handleNavigation(
                  item.main.humidity,
                  item.main.pressure,
                  item.wind.speed,
                  item.clouds.all,
                  item.name,
                  item.weather.map(weatherItem => weatherItem.main),
                  item.main.temp,
                  item.weather.map(weatherItem => weatherItem.icon),
                )
              }>
              <Arrow source={arrowimg} />
            </Pressable>
          </Container>
        )}
      />
    </>
  );
};

export default Home;
