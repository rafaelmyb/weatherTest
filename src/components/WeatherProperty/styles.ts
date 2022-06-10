import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  height: 64px;
  padding: 8px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #b5d7e4;
  border-bottom-width: 1px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #727579;
`;

export const Value = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #b5d7e4;
`;
