import { Button, Platform, View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Link, useRouter} from 'expo-router'
import { fetchTripUpdates, fetchVehiclePositions } from '@/services/api';
import useFetch from '@/services/useFetch';
import BusCard from "@/components/BusCard";
import Map from '@/components/Map';
import registerForNotifications from '@/services/registerForNotifications';
import sendBusNotification from '@/services/sendBusNotification';
import {getCurrentLocation} from '@/services/getCurrentLocation'
import * as Location from "expo-location";
import Nearby from "@/app/(tabs)/nearby";
import {transit_realtime} from "gtfs-realtime-bindings";
import IFeedEntity = transit_realtime.IFeedEntity;
// import BusCardsList from "@/components/BusCardsList";
import getBusesWithinRadius from '@/services/getBusesWithinRadius';
import { BusWithStop } from '@/interfaces/interfaces';
import { useUser } from '@/services/useUser';
import search from './search';

const index = () => {
    registerForNotifications()

    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'favorites' | 'nearby'>('favorites');

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [mapEnabled, setMapEnabled] = useState(false);

    useEffect(() => {
        getCurrentLocation(setLocation, setErrorMsg)
    }, [])

    const { data: tripUpdatesData, isLoading, error } = useUser();

    /*
    // const {
    //     data: tripUpdatesData,
    //     loading: tripUpdatesLoading,
    //     error: tripUpdatesError,
    // } = useFetch(() => fetchTripUpdates());

    // const {
    //     data: vehiclePositionsData,
    //     loading: vehiclePositionsLoading,
    //     error: vehiclePositionsError,
    // } = useFetch(() => fetchVehiclePositions());
    */

    let tmpFavorites: BusWithStop[] = []


    const nearbyElement = <Nearby
        locationAllowed={location !== null}
        userLat={location?.coords.latitude}
        userLon={location?.coords.longitude}
        gtfsData={tripUpdatesData}
        radiusKm={0.5}
    />

    if (tripUpdatesData) {
        getBusesWithinRadius(location?.coords.latitude || 0, location?.coords.longitude || 0, tripUpdatesData, 0.5)
    }

    return (
        <View className='flex-1 bg-[#273854] flex flex-col gap-4 pt-12'>
            {/* NOTIFICATION TEST BUTTON, DELETE TOUCHABLE OPACITY TO FIX MENU */}
                <TouchableOpacity className='absolute top-[160px] right-[18px] bg-[#ffffff] w-[80px] h-10 z-[1000] items-center justify-center rounded-full opacity-[0.7]'
                    onPress={async () => {
                        await sendBusNotification({
                                busNumber: "XXX",
                                busName: "Bus Name",
                                intersection: "Street 1/Street 2",
                                estimatedTime: "X minutes"},
                            () => {});
                        console.log("Notification sent!")
                    }}
                >
                    <Text>Test Bell</Text>
                </TouchableOpacity>

            {(mapEnabled) ? <View className='h-[40%]'>
                <Map />
            </View>: ""}

            {/* Toggle tabs */}
            <View className="flex flex-row my-4 mx-12 z-[100] pt-10">
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: activeTab === 'favorites' ? '#000' : '#555',
                        padding: 10,
                        alignItems: 'center',
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                    }}
                    onPress={() => setActiveTab('favorites')}
                >
                    <Text style={{ color: 'white' }}>Favorites</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: activeTab === 'nearby' ? '#000' : '#555',
                        padding: 10,
                        alignItems: 'center',
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                    onPress={() => setActiveTab('nearby')}
                >
                    <Text style={{ color: 'white' }}>Nearby</Text>
                </TouchableOpacity>
            </View>

            <View className='items-center flex'>
                    <TouchableOpacity className="w-[150px] h-[40px] bg-[#FF0000] justify-center items-center font-bold rounded-xl" 
                    onPress={() => router.push("/search")}>
                        <Text>Bus List</Text>
                    </TouchableOpacity>
            </View>

            {/* {tmpFavorites && tmpFavorites.length > 0 && activeTab === 'favorites' ?
                // <BusCardsList data={tmpFavorites} /> :
                
                <View className="flex-1">
                    {nearbyElement}
                </View>
            } */}
            <View className="flex-1">
                    {nearbyElement}
                </View>
        </View>
    )
}

export default index;