import React from 'react';
import { PaymentForm, CreditCard,ApplePay,
GooglePay} from 'react-square-web-payments-sdk';

const PaymentFormComponent = ({ applicationId }) => {
  return (
    <PaymentForm
      applicationId={applicationId}
      cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
        const response = await fetch("/api/pay", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            sourceId: token.token,
          }),
        });
        console.log(await response.json());
      }}
      locationId='L3PM44VYC8X3G' // Replace with your actual location ID
    >
      <CreditCard
      createPaymentRequest={() => ({
        countryCode: "US",
        currencyCode: "USD",
        total: {
          amount: "1.00",
          label: "Total",
        },
      })}
      
      
      />
      
      
    </PaymentForm>
  );
}

export default PaymentFormComponent;
