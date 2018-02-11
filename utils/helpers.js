import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'flascards:notifications';

//the notification will be sent at 7:00PM
const NOTIFICATION_HOUR = 19; //hours - 7PM

/**
**clears all the local notifications
**/
export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
	return {
		title: 'Time to get Quizzed!',
		body: "👋 don't forget to complete the quiz, today!",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

/**
**set up the local notifications
**/
export async function setLocalNotification() {
	try {

		//check if the notifications were set up already
		const localStorage = await AsyncStorage.getItem(NOTIFICATION_KEY);
		const localStorageData = await JSON.parse(localStorage);
		console.log('helpers setLocalNotification data: ', localStorageData);

		if (localStorageData === null) {
			//notification were not set up

			//check for permission for notification - for iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			console.log('helpers setLocalNotification status: ', status);
			if (status === 'granted') {
				//permission granted

				await Notifications.cancelAllScheduledNotificationsAsync();			
				const notificationSetDay = new Date();

				//if the notification is set after NOTIFICATION_HOUR, start the notification from tomorrow				
				if (notificationSetDay.getHours() > NOTIFICATION_HOUR) {
					notificationSetDay.setDate(notificationSetDay.getDate() + 1);
				}
				notificationSetDay.setHours(NOTIFICATION_HOUR);
				notificationSetDay.setMinutes(0);
				notificationSetDay.setSeconds(0);
				notificationSetDay.setMilliseconds(0);
				console.log('notificationSetDay: ', notificationSetDay);			
				Notifications.scheduleLocalNotificationAsync(
					createNotification(),
					{
						time: notificationSetDay,
						repeat: 'day'
					}
				);
				AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
			}
		}
	}
	catch (error) {
		console.log('error: ', error)
	}
}

/**
**clears all the previously scheduled notifications and create new  local notifications
**/
export async function clearAndSetLocalNotification() {
	try {

		//clear already scheduled notifications
		await clearLocalNotification();

		//check for permission for notification
		const { status } =  await Permissions.askAsync(Permissions.NOTIFICATIONS);
		console.log('helpers setLocalNotification status: ', status);
		if (status === 'granted') {
			const notificationSetDay = new Date();
			notificationSetDay.setDate(notificationSetDay.getDate() + 1);
			notificationSetDay.setHours(NOTIFICATION_HOUR);
			notificationSetDay.setMinutes(0);
			notificationSetDay.setSeconds(0);
			notificationSetDay.setMilliseconds(0);
			console.log('notificationSetDay: ', notificationSetDay);
			Notifications.scheduleLocalNotificationAsync(
				createNotification(),
				{
					time: notificationSetDay,
					repeat: 'day'
				}
			);
			AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
		}	
	}
	catch (error) {
		console.log('error: ', error)
	}	
}
export const commonStyle = StyleSheet.create({
    withBorder: {
	    borderColor: 'red',
	    borderWidth: 0,
	}
});
