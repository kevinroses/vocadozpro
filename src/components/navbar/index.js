import React, { useEffect } from "react";

import { AppBarStyle } from './Navbar.style'
//import SecondNavbar from './second-navbar/SecondNavbar'
import TopNav from './top-navbar/TopNav'
import dynamic from 'next/dynamic'
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import SecondNavbar, { getSelectedAddons, getSelectedVariations } from "./second-navbar/SecondNavbar";
import { setCategoryIsSticky, setSticky } from "@/redux/slices/scrollPosition";
import { useDispatch } from 'react-redux'
import { useRouter } from "next/router";
import {
    calculateItemBasePrice,
    getConvertDiscount,
    handleProductValueWithOutDiscount
} from "@/utils/customFunctions";
import { cart } from "@/redux/slices/cart";
import useGetAllCartList from "../../hooks/react-query/add-cart/useGetAllCartList";
import { getGuestId } from "../checkout-page/functions/getGuestUserId";

const Navigation = () => {
    // const SecondNavbar = dynamic(() => import('./second-navbar/SecondNavbar'), {
    //     ssr: false,
    // })
    const router = useRouter()
    const dispatch = useDispatch()
    const guestId=getGuestId()
  const theme=useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const {isSticky}=useSelector((state) => state.scrollPosition)

    useEffect(() => {

        if(router.pathname !=="/home")
        dispatch(setSticky(false))
        dispatch(setCategoryIsSticky(false))

    }, [router.pathname]);
    const cartListSuccessHandler=(res)=>{
        if(res){
            const setItemIntoCart = () => {
                return res?.map((item) => ({
                    ...item?.item,
                    cartItemId: item?.id,
                    totalPrice:
                        getConvertDiscount(
                            item?.item?.discount,
                            item?.item?.discount_type,
                            handleProductValueWithOutDiscount(item?.item),
                            item?.item?.restaurant_discount
                        )
                        *
                        item?.quantity
                    ,
                    selectedAddons:getSelectedAddons(item?.item?.addons) ,
                    quantity: item?.quantity,
                    variations: item?.item?.variations,
                    itemBasePrice: getConvertDiscount(
                        item?.item?.discount,
                        item?.item?.discount_type,
                        calculateItemBasePrice(item?.item, item?.item?.variations),
                        item?.item?.restaurant_discount
                    ),
                    selectedOptions:getSelectedVariations(item?.item?.variations)
                }));
            };
            dispatch(cart(setItemIntoCart()));
        }
    }

    const {
        data:cartData,
        refetch: cartListRefetch,

    } = useGetAllCartList(guestId,cartListSuccessHandler);
    useEffect(() => {
        cartListRefetch();
    }, [router.pathname]);
    return (
        <AppBarStyle disableGutters={true}>
            <TopNav cartListRefetch={cartListRefetch} />
          { !isSmall && <SecondNavbar isSticky={isSticky} cartListRefetch={cartListRefetch} /> }
        </AppBarStyle>
    )
}

export default Navigation
