import React, {useEffect} from 'react';

import googlepayicon from '../assets/images/google-pay.png';

import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #fff;
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

const GooglePaySuccess = ({ navigation }) => {
    const { navigate } = navigation;

    useEffect(() => {
        setTimeout(() => {
            navigate('Home')
        }, 5000)
    }, [])

    return (
        <Container>
            <Image source={googlepayicon} />
            <Text>
                Compra realizada com sucesso!
            </Text>
        </Container>
    )
}

export default GooglePaySuccess;