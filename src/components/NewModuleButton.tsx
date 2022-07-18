import React from 'react';
import {Button} from 'react-native';
import CalendarModule from './CalendarModule';

const NewModuleButton = (title, description) => {
  const handleCreateCalendarReminder = async () => {
    const Title = title.title;
    const Description = title.description[0];

    await CalendarModule.createCalendarEvent(Title, Description);
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
