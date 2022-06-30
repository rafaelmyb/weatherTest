import {NativeModules} from 'react-native';

const {CalendarModule} = NativeModules;
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
console.log(DEFAULT_EVENT_NAME);

interface CalendarInterface {
  createCalendarEvent(name: string, location: string): void;
}

export default CalendarModule as CalendarInterface;
