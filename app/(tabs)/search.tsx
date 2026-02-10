import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { Button } from 'react-native'
import routes from '@/assets/gtfs_stm/routes'
import BusCard2 from '@/components/BusCard2'
import { BusRoute } from '@/components/BusCard2'

const search = () => {
    const router = useRouter();

    const lines = routes.trim().split("\n");
    const headers: string[] = lines[0].split(",");

    const parsedRoutes = lines.slice(5).map((line: string) => {
        const values: string[] = line.split(",");

        return {
            route_id: values[headers.findIndex(header => header === "route_id")],
            route_name: values[headers.findIndex(header => header === "route_long_name")],
            route_color: values[headers.findIndex(header => header === "route_color")]
        }
    })

    // parsedRoutes = routes.

  return (
    <View className='flex-1 bg-[#273854] flex flex-col gap-4 pt-12 pt-[100px] justify-center items-center'>
        <TouchableOpacity 
        className='absolute w-[50px] h-[30px] items-center justify-center rounded-2xl top-[40px] bg-[#000000] left-[20px]'
        onPress={() => router.push("/")}>
            <Text className='text-[#FFFFFF]'>Back</Text>
        </TouchableOpacity>

        <FlatList data={parsedRoutes}
            renderItem={({ item }) => 
                <BusCard2 {...(item as BusRoute)}/>
            }
            keyExtractor={(item) => parsedRoutes.indexOf(item).toString()}
            ItemSeparatorComponent={() => <View className='h-7'/>}
            className='flex-1 mx-5'
            />

        {/* <View className='flex flex-column gap-[10px] items-center'>
            {parsedRoutes.map((bus) => {
                return (
                <View className='flex flex-row items-center gap-[15px] w-[300px] h-[60px] bg-[#606060] pl-[20px] rounded-2xl'>
                    <View style={{backgroundColor: `#${bus.route_color}`}} className={`w-[40px] h-[40px] items-center justify-center rounded-xl`}>
                        <Text className='text-[#FFFFFF]'>{bus.route_id}</Text>
                    </View>

                    <Text className='text-[#FFFFFF]'>
                        {bus.route_name}
                    </Text>
                </View>
            )})}
        </View> */}
    </View>
  )
}

export default search