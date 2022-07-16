import {NativeModules} from 'react-native';

const {CalendarModule} = NativeModules;

interface CalendarInterface {
  createCalendarEvent(title: string, description: any): void;
}

export default CalendarModule as CalendarInterface;
