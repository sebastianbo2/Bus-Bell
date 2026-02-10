import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native"
import { StopData } from "@/services/getBusesWithinRadius";

const StopCard = (stop: StopData) => {
    const router = useRouter();

    return (
        <TouchableOpacity 
        className='flex flex-row items-center gap-[15px] w-[330px] h-[60px] bg-[#606060] pl-[10px] rounded-2xl'
        // onPress={() => router.push({
        //     pathname: '/busStops',
        //     params: {
        //         busId: String(stop.stop_id),
        //         busName: String(stop.stop_name),
        //     },
        // })}
        >
            <View style={{backgroundColor: `#FFFFFF`}} className={`w-[40px] h-[40px] items-center justify-center rounded-xl`}>
                <Text className='text-[#000000]'>{stop.stop_id}</Text>
            </View>

            <Text className='text-[#000000]'>
                {stop.stop_name}
            </Text>
        </TouchableOpacity>
    )
}

export default StopCard