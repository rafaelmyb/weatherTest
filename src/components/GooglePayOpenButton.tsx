import React from 'react';
import {Button} from 'react-native';
import {NativeModules} from 'react-native';
const {GooglePayModule} = NativeModules;
import GooglePaySuccess from '../Screens/GooglePaySuccess';

const GooglePayOpenButton = ({navigation}) => {
  const { navigate } = navigation;

  const cardNetworks = ['AMEX', 'JCB', 'MASTERCARD', 'VISA']

  const paymentRequest = {
    cardPaymentMethodMap: {
      gateway: {
        name: 'braintree',
        merchantId: '7d4b76ydqx3j8pcq',
        clientKey: 'sandbox_6mvsgfhy_7d4b76ydqx3j8pcq',
        sdkVersion: '4.13.0'
      },
      cardNetworks
    },
    transaction: {
      totalPrice: '1',
      totalPriceStatus: 'FINAL',
      currencyCode: 'BRL'
    },
    merchantName: 'Rafael Yamada Enterprise'
  }

  const handleOpenGooglePay = async () => {
     const paymentRequestToken = await GooglePayModule.show(
       GooglePayModule.ENVIRONMENT_TEST,
       paymentRequest
       ).then(token => {
         navigate('GooglePaySuccess')
         console.log(token)
       }).catch(error => {
           console.log('Erro: ', error);
           return error;
          })
  }

  const onPressCheck = async () => {
    const isAvailable = await GooglePayModule.checkGooglePayIsEnable(
      GooglePayModule.ENVIRONMENT_TEST,
      cardNetworks
    ).catch(error => {
      console.log('Erro: ', error);
      return false
    })
    console.log(isAvailable);
  }

  return (
    <>
        <Button
          title="Buy with Google Pay"
          color="#841584"
          onPress={handleOpenGooglePay}
        />
        <Button
          title="Google Pay is Available?"
          color="#841584"
          onPress={onPressCheck}
        />
    </>
  );
};

export default GooglePayOpenButton;
