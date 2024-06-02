const config = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
        {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                billingAddressRequired: true,
                billingAddressParameters: {
                    format: 'FULL',
                    phoneNumberRequired: true,
                },
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'cybersource',
                    gatewayMerchantId: 'cnb_dibestspot',
                },
            },
        },
    ],
    merchantInfo: {
        merchantId: 'BCR2DN4T6GXJBETW',
        merchantName: 'DiBest Spot Limited',
    },
}

export default config
