import { Modal, Box } from '@mui/material'
import React, { useState } from 'react'
import SignInPage from './sign-in'
import SignUpPage from './sign-up'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/customer";
import { useQuery } from "react-query";
import { ProfileApi } from "../../hooks/react-query/config/profileApi";
import { onSingleErrorResponse } from "../ErrorResponse";
import { setWishList } from "../../redux/slices/wishList";
import { useWishListGet } from "../../hooks/react-query/config/wish-list/useWishListGet";
import { toast } from "react-hot-toast";
import { loginSuccessFull } from "../../utils/ToasterMessages";
import { setToken } from "../../redux/slices/userToken";
import { t } from "i18next";
import PhoneInputForm from "./sign-in/social-login/PhoneInputForm";

const AuthModal = ({
    open,
    handleClose,
    signInSuccess,
    modalFor,
    setModalFor, cartListRefetch
}) => {
    const { openMapDrawer } = useSelector((state) => state.globalSettings)
    const { userInfo:fbUserInfo, jwtToken:fbJwtToken } = useSelector(
        (state) => state.fbCredentialsStore
    )
    const [signInPage, setSignInPage] = useState(true)
    const [userInfo, setUserInfo] = useState(null)
    const [jwtToken, setJwtToken] = useState(null)
    const [medium,setMedium] = useState("")

    const user=medium==="google"?userInfo:fbUserInfo
    const jwt=medium==="google"?jwtToken:fbJwtToken

    const dispatch = useDispatch()
    const userOnSuccessHandler = (res) => {
        dispatch(setUser(res?.data))
    }
    const { refetch: profileRefatch } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,
        {
            enabled: false,
            onSuccess: userOnSuccessHandler,
            onError: onSingleErrorResponse,
        }
    )
    const onSuccessHandler = (res) => {
        dispatch(setWishList(res))
    }
    const { refetch } = useWishListGet(onSuccessHandler)
    const handleSuccess = async (value) => {
        localStorage.setItem('token', value)
        toast.success(t(loginSuccessFull))
        await refetch()
        await profileRefatch()
        dispatch(setToken(value))
        handleClose?.()
    }
    const handleRegistrationOnSuccess = (token) => {
        //registration on success func remaining
        // setOpenModal(false)
        handleSuccess(token)
        handleClose()
    }
    const handleModal = () => {
        if (modalFor === 'sign-in') {
            return (
                <SignInPage
                    signInSuccess={signInSuccess}
                    handleClose={handleClose}
                    setModalFor={setModalFor}
                    setSignInPage={setSignInPage}
                    cartListRefetch={cartListRefetch}
                    setJwtToken={setJwtToken}
                    setUserInfo={setUserInfo}
                    handleSuccess={handleSuccess}
                    setMedium={setMedium}

                />
            )
        } else if(modalFor==="phone_modal"){
            return (
                <>
                {user && jwt && (
                    <PhoneInputForm
                        userInfo={user}
                        jwtToken={jwt}
                        global={global}
                        medium={medium}
                        handleRegistrationOnSuccess={
                            handleRegistrationOnSuccess
                        }
                    />
                )}
                </>
            )
        }else {
            return (
                <SignUpPage
                    handleClose={handleClose}
                    setSignInPage={setSignInPage}
                    setModalFor={setModalFor}
                    setJwtToken={setJwtToken}
                    setUserInfo={setUserInfo}
                    handleSuccess={handleSuccess}
                    setMedium={setMedium}
                />
            )
        }
    }
    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                maxWidth="400px"

            >
                {handleModal()}
            </Modal>
        </Box>
    )
}

export default AuthModal
