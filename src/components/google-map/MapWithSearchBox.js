import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CustomMapSearch from "../join-restaurant/CustomMapSearch";
import GoogleMapComponent from "../landingpage/google-map/GoogleMapComponent";
import { useQuery } from "react-query";
import { GoogleApi } from "../../hooks/react-query/config/googleApi";
import { useGeolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import { setFormattedAddress, setLocation, setZoneIds } from "../../redux/slices/addressData";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { useGetLocation } from "../../utils/custom-hook/useGetLocation";

const MapWithSearch = ({orderType,padding,coords,mapHeight,rerenderMap}) => {
    const theme=useTheme()
    const dispatch = useDispatch()
    const { global } = useSelector((state) => state.globalSettings)
    const { location, formatted_address } = useSelector((state) => state.addressData)
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const {
        setDisablePickButton,
        locationEnabled,
        setLocationEnabled,
        searchKey,
        setSearchKey,
        setEnabled,
        placeDetailsEnabled,
        setPlaceDetailsEnabled,
        placeDescription,
        setPlaceDescription,
        predictions,
        setPlaceId,
        setLocations, isLoadingPlacesApi,
        currentLocationValue } = useGetLocation(coords);

    //const [isDisablePickButton, setDisablePickButton] = useState(false)
    // const [locationEnabled, setLocationEnabled] = useState(false)
    // const [searchKey, setSearchKey] = useState({ description: '' })
    //const [enabled, setEnabled] = useState(false)
    //const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(false)
    //const [placeDescription, setPlaceDescription] = useState(undefined)
    // const [zoneId, setZoneId] = useState(undefined)
    // const [mounted, setMounted] = useState(true)
    //const [predictions, setPredictions] = useState([])
    //const [placeId, setPlaceId] = useState('')
    // const [value, setValue] = useState()



    // const {
    //     data: places,
    //     isLoading: isLoadingPlacesApi,
    //
    //     // refetch: placeApiRefetch,
    // } = useQuery(
    //     ['places', searchKey.description],
    //     async () => GoogleApi.placeApiAutocomplete(searchKey.description),
    //     { enabled },
    //     {
    //         retry: 1,
    //         // cacheTime: 0,
    //     }
    // )
    //
    //
    //
    // let locations = undefined
    // if (typeof window !== 'undefined') {
    //     locations = localStorage.getItem('location')
    // }
    // useEffect(() => {
    //     if (global?.default_location) {
    //         dispatch(setLocation(
    //             global?.default_location
    //         ))
    //     }
    // }, [])
    // console.log({global});
    // useEffect(() => {
    //     if (coords) {
    //         dispatch(setLocation(
    //             {
    //                 lat: coords?.latitude,
    //                 lng: coords?.longitude,
    //             }
    //         ))
    //     }
    // }, [coords])
    //
    // const {
    //     isLoading: locationLoading,
    //     data: zoneData,
    //     isError: isErrorLocation,
    //     error: errorLocation,
    //     refetch: locationRefetch,
    // } = useQuery(
    //     ['zoneId', location],
    //     async () => GoogleApi.getZoneId(location),
    //     { enabled: locationEnabled },
    //     {
    //         retry: 1,
    //         // cacheTime: 0,
    //     }
    // )
    // const {
    //     isLoading: isLoading2,
    //     data: placeDetails,
    //     isError: isErrorTwo,
    //     error: errorTwo,
    //     refetch: placeApiRefetchOne,
    // } = useQuery(
    //     ['placeDetails', placeId],
    //     async () => GoogleApi.placeApiDetails(placeId),
    //     { enabled: placeDetailsEnabled },
    //     {
    //         retry: 1,
    //         // cacheTime: 0,
    //     }
    // )
    //
    // useEffect(() => {
    //     if (placeDetails) {
    //         dispatch(setLocation(placeDetails?.data?.result?.geometry?.location))
    //         setLocationEnabled(true)
    //     }
    // }, [placeDetails])
    // useEffect(() => {
    //     if (places) {
    //         setPredictions(places?.data?.predictions)
    //     }
    // }, [places])
    //
    // useEffect(() => {
    //     if (zoneData) {
    //         setZoneId(zoneData?.data?.zone_id)
    //         dispatch(setZoneIds(zoneData?.data?.zone_id))
    //         //  setLocation(undefined)
    //         setLocationEnabled(false)
    //         setMounted(false)
    //     }
    //     if (!zoneData) {
    //         setZoneId(undefined)
    //     }
    // }, [zoneData])
    //
    // const {
    //     isLoading: geoCodeLoading,
    //     data: geoCodeResults,
    //     // refetch: placeApiRefetch,
    // } = useQuery(['geocode-api', location], async () =>
    //     GoogleApi.geoCodeApi(location)
    // )
    // if (geoCodeResults) {
    // }
    // const setLocations=(value)=>{
    //     dispatch(setLocation(value))
    // }
    // console.log({location});
    // useEffect(() => {
    //     if(geoCodeResults){
    //         dispatch(setFormattedAddress( geoCodeResults?.data?.results[0]
    //             ?.formatted_address))
    //     }
    // }, [geoCodeResults]);
    return (

        <CustomStackFullWidth
            spacing={1}
            gap="12px"
        >
            {orderType !== "take_away" &&
                <CustomMapSearch
                    setSearchKey={setSearchKey}
                    setEnabled={setEnabled}
                    predictions={predictions}
                    setPlaceId={setPlaceId}
                    setPlaceDetailsEnabled={
                        setPlaceDetailsEnabled
                    }
                    setPlaceDescription={setPlaceDescription}
                    border={theme.palette.primary.main}
                    searchKey={searchKey}
                    placeDescription={placeDescription}
                    isLoadingPlacesApi={isLoadingPlacesApi}
                    currentLocationValue={currentLocationValue}
                />}

                {!!location && orderType !== "take_away" && (
                    <GoogleMapComponent
                        key={rerenderMap}
                        setLocation={setLocations}
                        location={location}
                        setPlaceDetailsEnabled={
                            setPlaceDetailsEnabled
                        }
                        placeDetailsEnabled={
                            placeDetailsEnabled
                        }
                        locationEnabled={locationEnabled}
                        setPlaceDescription={
                            setPlaceDescription
                        }
                        setLocationEnabled={setLocationEnabled}
                        setDisablePickButton={
                            setDisablePickButton
                        }
                        height={isSmall ? mapHeight : "448px"}

                    />
                )}
            </CustomStackFullWidth>

    );
};

export default MapWithSearch;
