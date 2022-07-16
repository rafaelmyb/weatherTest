import React from 'react';
import {Button} from 'react-native';
import {NativeModules} from 'react-native';
const {GooglePayModule} = NativeModules;

const GooglePayOpenButton = () => {
  const cardNetworks = ['AMEX', 'JCB', 'MASTERCARD', 'VISA']

  const paymentRequest = {
    cardPaymentMethodMap: {
      gateway: {
        name: 'example',
        merchantId: 'exampleGatewayMerchantId',
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
     const paymentRequestToken = await GooglePayModule.show(GooglePayModule.ENVIRONMENT_TEST, paymentRequest);

     const token = await GooglePayModule.show(
       GooglePayModule.ENVIRONMENT_TEST,
       paymentRequest
       ).catch(error => {
         this.setState({ text: `error: ${error}` })
         return error;
     })
  }

  return (
    <Button
      title="Click to open Google Pay"
      color="#841584"
      onPress={handleOpenGooglePay}
    />
  );
};

export default GooglePayOpenButton;
