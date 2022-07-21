import React, {useEffect} from 'react';

import googlepayicon from '../assets/images/google-pay.png';

import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
`;

const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Image = styled.Image`
    width: 128px;
    height: 128px;
`;

const Text = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: #727579;
`;

const Button = styled.TouchableOpacity`
    padding: 12px 24px;
    border: 1px solid #000;
    border-radius: 8px;
    margin-bottom: 24px;
    background-color: rgba(0, 0, 0, 0);
`;

const GooglePaySuccess = ({ navigation }) => {
    const { navigate } = navigation;

    function handleNavigateBack() {
      navigate('Home');
    }

    return (
        <Container>
            <Content>
                <Image source={googlepayicon} />
                <Text>
                    Compra realizada com sucesso!
                </Text>
            </Content>
            <Button onPress={() => handleNavigateBack()}>
                <Text>Voltar para tela inicial</Text>
            </Button>
        </Container>
    )
}

export default GooglePaySuccess;