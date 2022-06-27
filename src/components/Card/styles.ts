import styled from 'styled-components/native';

interface Props {
  path: string;
}

export const Container = styled.View<Props>`
  background-color: #fff;
  max-height: 70px;
  height: 100%;
  padding: 8px 24px;
  flex-direction: row;
  justify-content: space-between;
  flex: ${({path}) => (path === 'Details' ? 'none' : '1')};
  border-bottom-color: ${({path}) => (path === 'Details' ? '#b5d7e4' : '#fff')};
  border-bottom-width: 1px;
`;

export const ContentLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextContainer = styled.View`
  margin-left: 16px;
`;

export const WeatherImage = styled.Image`
  width: 28px;
  height: 28px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #727579;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #b5d7e4;
`;

export const ContentRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Temperature = styled.Text<Props>`
  background-color: #b5d7e4;
  border-radius: 24px;
  padding: 4px 18px;
  margin-bottom: 8px;
  font-size: 18px;
  color: #fff;
  margin-right: ${({path}) => (path === 'Home' ? '-18px' : '26px')};
`;
