import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';

interface BusData {
  busNumber: String,
  busName: String,
  intersection: String,
  estimatedTime: string,
}

const sendBusNotification = async (data: BusData, callBackFunction: Function,) => {
  const { busNumber, busName, intersection , estimatedTime } =  data

  await scheduleBusNotification(busNumber, busName, intersection, 7, 5);

  () => (callBackFunction())
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function scheduleBusNotification(busNumber: String, busName: String, intersection: String, estimatedTime: number, value: number) {
  console.log("VAL: " + ((estimatedTime - value) * 60))

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${busNumber} - ${busName} 🚌`,
      body: `Arriving at ${intersection} in ${estimatedTime}`,
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: (estimatedTime - value) * 60,
    },
  });
}

export default sendBusNotification