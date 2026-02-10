import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter, } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'

const prompt = () => {
    const router = useRouter();

    const params = useLocalSearchParams();

    console.log(params.busId);

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
    </View>
  )
}

export default prompt