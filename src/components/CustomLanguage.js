import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { LefRightBorderBox, TopBarButton } from "./navbar/Navbar.style";
import cookie from 'js-cookie'
import { alpha, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { CustomColouredTypography } from '../styled-components/CustomStyles.style'
import ReactCountryFlag from 'react-country-flag'
import { StyledMenu } from './navbar/top-navbar/TopNav.style'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useSettings } from '../contexts/use-settings'
import i18n, { t } from 'i18next'
import { useTheme } from '@mui/material/styles'
import { languageLists } from './navbar/second-navbar/custom-language/languageLists'
import { setCountryCode, setCountryFlag, setLanguage } from '../redux/slices/languageChange'
import { rtlLanguageList } from './navbar/second-navbar/custom-language/rtlLanguageList'
import { isRTLLanguage, languageValue } from '../utils/customFunctions'
import { CustomToaster } from './custom-toaster/CustomToaster';
const CustomLanguage = ({ formMobileMenu, language, countryCode, isMobile }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    //const [language, setLanguage] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const anchorRef = useRef(null)
    const { global } = useSelector((state) => state.globalSettings)
    const { countryFlag } = useSelector((state) => state.languageChange)
    let location = undefined;
    if (typeof window !== "undefined") {
        location = localStorage.getItem("location");
    }

    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            dispatch(
                setLanguage(localStorage.getItem('language') || i18n.language)
            )
        }
    }, [language])
    const handleClick = (event) => {
        // i18n.changeLanguage(language)
        setAnchorEl(event.currentTarget)
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getValues = (settings) => ({
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme,
    })
    const { settings, saveSettings } = useSettings()
    const [values, setValues] = useState(getValues(settings))
    useEffect(() => {
        setValues(getValues(settings))
    }, [settings])
    const open = Boolean(anchorEl)
    const handleLanguage = (ln) => {
        dispatch(setLanguage(ln?.languageCode))
        dispatch(setCountryCode(ln?.countryCode))
        dispatch(setCountryFlag(ln?.countryFlag))
        // setLanguage(ln)
        localStorage.setItem('language', ln?.languageCode)
        cookie.set('languageSetting', ln?.languageCode)
        // i18n.changeLanguage(ln)
        localStorage.setItem(
            'direction',
            isRTLLanguage(ln?.languageCode) ? 'rtl' : 'ltr'
        )
        saveSettings({
            ...values,
            direction: isRTLLanguage(ln?.languageCode) ? 'rtl' : 'ltr',
        })
        //setLanguage(ln)
        CustomToaster('success', 'Language Changed Successfully');


        window.location.reload()
    }
    const arrowColor = theme.palette.neutral[500]

    return (
        <>
            <LefRightBorderBox location={location} isMobile={isMobile}
            >
                <TopBarButton
                    formMobileMenu={formMobileMenu}
                    // id="demo-customized-button"
                    variant="text"
                    size="small"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disableElevation
                    onClick={handleClick}
                    endIcon={
                        <KeyboardArrowDownIcon style={{ color: arrowColor }} />
                    }
                >
                    <Stack flexDirection="row" gap="5px">
                        {(!location || isMobile) && <img width="20px" src={countryFlag} />}
                        <CustomColouredTypography
                            color={theme.palette.neutral[600]}
                            sx={{ textTransform: 'capitalize' }}
                            fontSize={{ xs: "14px", sm: "16px" }}
                        >
                            {languageValue(language)?.languageCode}
                        </CustomColouredTypography>
                    </Stack>
                </TopBarButton>
            </LefRightBorderBox>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {languageLists?.map((lan, index) => (
                    <MenuItem
                        onClick={() => handleLanguage(lan)}
                        disableRipple
                        key={index}
                        sx={{
                            backgroundColor: language === lan.languageCode ? alpha(theme.palette.primary.main, 0.8) : 'inherit',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <img width="20px" src={lan?.countryFlag} />
                        </ListItemIcon>
                        <Typography
                            fontSize={{ xs: "14px", sm: "16px" }}
                            marginRight={
                                languageDirection === 'rtl' ? '1rem' : '0px'
                            }
                        >
                            {lan.languageName}
                        </Typography>
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    )
}

CustomLanguage.propTypes = {}

export default CustomLanguage
