import React from 'react';
import {Button} from 'react-native';
import CalendarModule from './CalendarModule';

const NewModuleButton = () => {
  const handleCreateCalendarReminder = async () => {
    await CalendarModule.createCalendarEvent();
  };

  return (
    <Button
      title="Click to open Calendar"
      color="#841584"
      onPress={handleCreateCalendarReminder}
    />
  );
};

export default NewModuleButton;
