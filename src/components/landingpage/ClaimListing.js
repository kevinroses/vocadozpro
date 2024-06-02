import React from 'react'
import CustomContainer from '../container'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { alpha, Stack } from '@mui/material'
import { DiscountBannerBox, LandingPageTypography } from './landingPageStyle'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container';


const ClaimContainer = styled.div`
color: #252961;
`
const Headline = styled.h1`
margin-top: 50px;
`
const StrongGold = styled.strong`
color: #A78236;`

const HrGold = styled.hr`
width: 40%;
border:3px solid #A78236;
`
const ClaimGold = styled.div`
width: 80%;
padding:30px;
margin: 50px;
border-radius: 30px;
background-color: #a78236;
background-image: linear-gradient(90deg, #a78236 0%, #D5BB80 100%);
`
const HeadlineClaimGold = styled.h1`
color: white;
font-size: 28px;
`
const StrongBlue = styled.strong`
color:#252961;
`

const ButtonBlue = styled.a`
border: none;
color: white;
font-size: 36px;
margin-top: 20px;
font-weight: 500;
padding:5px 30px;
text-decoration: none;
border-radius: 50px;
background-color: #252961;
background-image: linear-gradient(90deg, #252961 0%, #3765ec 100%);
`

const ClaimListing = () => {
    const theme = useTheme()
    return (
        <CustomContainer>
            <CustomStackFullWidth
                sx={{ mt: { xs: '10px', sm: '20px', md: '25px' } }}
            >
                        <ClaimContainer>
                        {/* <Container className='d-flex justify-content-center text-center'>
                            <Headline>
                                From <StrongGold>Food Trucks</StrongGold> to a <StrongGold>Five Star Restaurant!</StrongGold>
                            </Headline>
                        </Container>
                        <Container className='d-flex justify-content-center'>
                            <HrGold/>
                        </Container> */}
                     
                    </ClaimContainer>
            </CustomStackFullWidth>
        </CustomContainer>
    )
}

export default ClaimListing
