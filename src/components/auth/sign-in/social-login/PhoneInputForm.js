import React from 'react'
import phoneIcon from "../../../../../public/static/profile/phoneInput.png"
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../../../styled-components/CustomStyles.style'
import { Paper, Typography } from "@mui/material";
import CustomPhoneInput from '../../../CustomPhoneInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import CustomAlert from '../../../alert/CustomAlert'
import LoadingButton from '@mui/lab/LoadingButton'
import { usePostRegisterInfo } from '../../../../hooks/react-query/social-login/usePostRegisterInfo'
import { onErrorResponse, onSingleErrorResponse } from '../../../ErrorResponse'
import CustomImageContainer from "../../../CustomImageContainer";
import { CustomBoxForModal } from "../../auth.style";

const PhoneInputForm = (props) => {
    const { userInfo, jwtToken, medium, handleRegistrationOnSuccess, global } = props
    const { t } = useTranslation()
    const { mutate, isLoading } = usePostRegisterInfo()
    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required(t('Please give a phone number'))
                .min(10, 'number must be 10 digits'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                handleOnSubmitFormik(values)
            } catch (err) { }
        },
    })
    const handleOnSubmitFormik = (values) => {
        const info = {
            email: userInfo?.email,
            token: jwtToken?.credential,
            unique_id: jwtToken?.clientId,
            medium: medium,
            phone: values.phone,
        }
        mutate(info, {
            onSuccess: (response) => {
                handleRegistrationOnSuccess(response?.token)
            },
            onError: onErrorResponse,
        })
    }
    const handleOnChange = (value) => {
        formik.setFieldValue('phone', `+${value}`)
    }
    return (
        <CustomBoxForModal>
            <form onSubmit={formik.handleSubmit} noValidate>
                <CustomStackFullWidth spacing={3} justifyContent="center" alignItems='center'>
                    <CustomImageContainer
                     src={phoneIcon.src}
                     width="69px" height="69px"
                    />
                    <Typography fontSize="14px">
                        {t("Provide a valid phone number to complete your sign up")}
                    </Typography>
                    <CustomPhoneInput
                        value={formik.values.phone}
                        onHandleChange={handleOnChange}
                        initCountry={global?.country}
                        touched={formik.touched.phone}
                        errors={formik.errors.phone}
                        rtlChange="true"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isLoading}
                    >
                        {t('Continue')}
                    </LoadingButton>
                </CustomStackFullWidth>
            </form>
        </CustomBoxForModal>
    )
}

PhoneInputForm.propTypes = {}

export default PhoneInputForm
