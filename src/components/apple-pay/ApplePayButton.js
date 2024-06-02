import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ApplePayIcon from './ApplePayIcon'

const ApplePayButton = (onPaymentAuthorized) => {
    const [isButtonAvailable, setisButtonAvailable] = useState(false)
    useEffect(() => {
        if (window.ApplePaySession) {
            var merchantIdentifier = 'example.com.store'
            var promise =
                ApplePaySession.canMakePaymentsWithActiveCard(
                    merchantIdentifier
                )
            promise.then((canMakePayments) => {
                setisButtonAvailable(canMakePayments)
            })
        }
    }, [])

    const startApplePaySession = async () => {
        if (window.ApplePaySession) {
            // Define ApplePayPaymentRequest
            const request = {
                countryCode: 'US',
                currencyCode: 'USD',
                merchantCapabilities: ['supports3DS'],
                supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
                total: {
                    label: 'Demo (Card is not charged)',
                    type: 'final',
                    amount: '2.00', // harcoded amount
                },
            }

            const session = new window.ApplePaySession(3, request)
            console.log(session, 'session')

            session.onvalidatemerchant = async function (event) {
                console.log(event, 'onvalidatemerchant')
                // try {
                //     const { data } = await getApplePay()

                //     session.completeMerchantValidation(data)
                // } catch (error) {
                //     console.log(error)
                // }
            }

            session.onpaymentauthorized = async function (event) {
                console.log(event, 'onpaymentauthorized')
                onPaymentAuthorized(event)
            }

            session.begin()
        }
    }

    return window.ApplePaySession && isButtonAvailable ? (
        <Button
            variant="outline"
            sx={{
                width: '100%',
                background: 'black',
            }}
            onClick={startApplePaySession}
        >
            <ApplePayIcon />
        </Button>
    ) : (
        <></>
    )
}

export default ApplePayButton
