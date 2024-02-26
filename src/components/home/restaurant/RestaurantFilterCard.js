import React, { useEffect, useState } from 'react'
import { WrapperForSideDrawerFilter } from '../../../gurbage/admin/components/filter/SideDrawerFilter.style'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import CustomGroupCheckbox from '../../custom-group-checkboxs/CustomGroupCheckbox'
import SimpleBar from 'simplebar-react'
import CustomSlider from '../../custom-slider/CustomSlider'
import CustomRatings from '../../custom-ratings/CustomRatings'
import {
    CustomButtonGray,
    CustomButtonPrimary,
} from '../../../styled-components/CustomButtons.style'
import { t } from 'i18next'
import GroupCheckBox from './GroupCheckBox'
import { useSelector } from "react-redux";
import { useTheme } from "@mui/styles";

const RestaurantFilterCard = (props) => {
    const theme=useTheme()
    const {highestPrice, checkboxData, setCheckedFilterKey,rowWise,foodOrRestaurant ,handleChangeRatings,handlePrice,handleDropClose,priceAndRating} = props
    const { global } = useSelector((state) => state.globalSettings)
    const [checkData, setCheckData] = useState([])

    return (
        <WrapperForSideDrawerFilter>
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <Typography fontSize="14px" fontWeight="500">{t('Filter By')}</Typography>
                    <Stack direction="row">
                        <GroupCheckBox
                            rowWise={rowWise}
                            checkboxData={global?.toggle_veg_non_veg === false ? checkboxData?.slice(2):checkboxData}
                            setCheckedFilterKey={setCheckedFilterKey}
                            handleDropClose={handleDropClose}
                        />
                    </Stack>
                    {rowWise && <Stack>
                        {foodOrRestaurant === 'products' && (
                            <Stack spacing={1} width="100%">
                                <Typography fontSize="14px" fontWeight="500">{t('Price')}</Typography>
                                <CustomSlider
                                     handleChangePrice={handlePrice}
                                     highestPrice={highestPrice}
                                    // priceValue={filterData.price}
                                />
                            </Stack>
                        )}
                        <Stack
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography fontSize="14px" fontWeight="500">{t('Rating')}</Typography>
                            <CustomRatings
                                handleChangeRatings={handleChangeRatings}
                                 ratingValue={priceAndRating.rating}
                                color={theme.palette.primary.main}
                            />
                        </Stack>
                    </Stack>}
                </Stack>
            </Stack>

        </WrapperForSideDrawerFilter>
    )
}

export default RestaurantFilterCard
