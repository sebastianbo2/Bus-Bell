import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useUser } from '@/services/useUser';
import sendBusNotification, { scheduleBusNotification } from '@/services/sendBusNotification';

const notifPrompt = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {data, isLoading, error} = useUser();
    const [value, setValue] = useState(5);

    console.log("TIME: ", params.time)

    

    const updateTime = (text: string) => {
        setValue(parseInt(text))
    }

    const setBusNotification = async () => {
        // @ts-ignore
        await scheduleBusNotification(params.busId, "Bus", params.intersection, params.time, value)
        console.log("Scheduled!!")
    }

    console.log(params.busId);
    console.log(params.stopId);

  return (
    <View className='flex items-center justify-center h-full'>
      <Text>{params.busName}</Text>

      <Text className='pl-10 pr-10 items-center justify-center'>Choose time distance (in minutes) to receive notification at</Text>

      <TextInput keyboardType="number-pad" className='flex mt-5 mb-5 bg-[#212121] w-[100px] text-white justify-center items-center' 
      value={`${value}`} onChangeText={(text) => updateTime(text)}></TextInput>

      <TouchableOpacity className='' onPress={() => setBusNotification()}>
        <Text>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")} 
            className='bg-[#A10000] text-[#FFFFFF] w-[150px] h-[150px] justify-center items-center rounded-2xl'
            >
              <Text className='text-[#FFFFFF] text-[30px]'>Return</Text>
            </TouchableOpacity>
    </View>
  )
}

export default notifPrompt