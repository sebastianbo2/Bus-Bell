import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Link, useRouter, } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useUser } from '@/services/useUser'
import stopData from '@/assets/gtfs_stm/stops'
import routeData from '@/assets/gtfs_stm/routes'
import BusCard2 from '@/components/BusCard2'
import { StopData } from '@/services/getBusesWithinRadius'
import StopCard from '@/components/StopCard'


const getStopData = () => {
  const lines: string[] = stopData.trim().split('\n');
        const headers: string[] = lines[0].split(',');

    const parsedStops = lines.slice(1).map((line: string) => {
      const values: string[] = line.split(',');

      return {
        stop_id: values[headers.findIndex(header => header === "stop_id")],
        stop_lat: Number.parseFloat(values[headers.findIndex(header => header === "stop_lat")]),
        stop_lon: Number.parseFloat(values[headers.findIndex(header => header === "stop_lon")]),
        stop_name: values[headers.findIndex(header => header === "stop_name")]
      }
    })

    return parsedStops
}

const getRouteData = () => {
  const lines: string[] = routeData.trim().split('\n');
        const headers: string[] = lines[0].split(',');

    const parsedStops = lines.slice(1).map((line: string) => {
      const values: string[] = line.split(',');

      return {
        stop_id: values[headers.findIndex(header => header === "stop_id")],
        stop_lat: Number.parseFloat(values[headers.findIndex(header => header === "stop_lat")]),
        stop_lon: Number.parseFloat(values[headers.findIndex(header => header === "stop_lon")]),
        stop_name: values[headers.findIndex(header => header === "stop_name")]
      }
    })

    return parsedStops
}

const prompt = () => {
    const router = useRouter();
    const { data, isLoading, error } = useUser();
    const params = useLocalSearchParams();

    const stops = getStopData()
    const busObject = data?.entity.find((obj) => obj.tripUpdate?.trip.routeId === params.busId)

    console.log(stops.length)

    const busStops = stops.filter((stop) => busObject?.tripUpdate?.stopTimeUpdate?.find((obj) => obj.stopId == stop.stop_id))

    console.log(busStops)

    // const busStops = parsedStops.filter()

    console.log(data?.entity[0].tripUpdate)

    console.log(data?.entity[0].tripUpdate?.trip.routeId)

    // console.log(params.busId);

  return (
    <View className='flex justify-center items-center h-full'>
        <View className='mb-[20px] text-[28px] font-[800]'>
            <Text>Bus: {params.busId} - {params.busName}</Text>
        </View>

      <TouchableOpacity onPress={() => router.push("/search")} 
      className='bg-[#A10000] text-[#FFFFFF] w-[150px] h-[150px] justify-center items-center rounded-2xl'
      >
        <Text className='text-[#FFFFFF] text-[30px]'>Return</Text>
      </TouchableOpacity>

      <FlatList
        data={busStops}
        renderItem={({ item }) => (
          <StopCard {...(item as StopData)}/>
        )}
      >

      </FlatList>
    </View>
  )
}

export default prompt