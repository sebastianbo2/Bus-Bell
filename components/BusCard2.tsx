import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native"

export interface BusRoute {
    route_id: string;
    route_color: string;
    route_name: string;
}

const BusCard2 = (bus: BusRoute) => {
    const router = useRouter();

    return (
        <TouchableOpacity 
        className='flex flex-row items-center gap-[15px] w-[330px] h-[60px] bg-[#606060] pl-[10px] rounded-2xl'
        onPress={() => router.push({
            pathname: '/prompt',
            params: {
                busId: String(bus.route_id),
                busName: String(bus.route_name),
            },
        })}
        >
            <View style={{backgroundColor: `#${bus.route_color}`}} className={`w-[40px] h-[40px] items-center justify-center rounded-xl`}>
                <Text className='text-[#FFFFFF]'>{bus.route_id}</Text>
            </View>

            <Text className='text-[#FFFFFF]'>
                {bus.route_name}
            </Text>
        </TouchableOpacity>
    )
}

export default BusCard2