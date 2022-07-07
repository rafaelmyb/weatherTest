import {NativeModules} from 'react-native';

const {CalendarModule} = NativeModules;

const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();

console.log(DEFAULT_EVENT_NAME);

interface CalendarInterface {
  createCalendarEvent(title: string, description: any): void;
}

export default CalendarModule as CalendarInterface;
