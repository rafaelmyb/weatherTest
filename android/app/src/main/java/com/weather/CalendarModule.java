package com.weather;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.facebook.react.bridge.Promise;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class CalendarModule extends ReactContextBaseJavaModule {
  CalendarModule(ReactApplicationContext context) {
      super(context);
  }

  @Override
  public String getName() {
    return "CalendarModule";
  }

  @ReactMethod
  public void createCalendarEvent(String name, String location) {
    Log.d("CalendarModule", "Create event called with name: " + name
    + " and location: " + location);
  }

  // String dateFormat = "yyyy-MM-dd";
  // SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
  // Calendar eStartDate = Calendar.getInstance();
  // try {
  //   eStartDate.setTime(sdf.parse(startDate));
  // }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("DEFAULT_EVENT_NAME", "New Event");
    return constants;
  }

  @ReactMethod
  public void createCalendarEvent(String name, String location, Promise promise) {
    try {
      Integer eventId = 123;
      promise.resolve(eventId);
    } catch(Exception e) {
      promise.reject("Create Event Error", "Error parsing date", e);
    }
  }

  // private void sendEvent(ReactContext reactContext, String eventName, @Nullable writableMap params) {
  //   reactContext
  //     .getJSModule(DeviceEventManagerModule.RCTDevideEventEmitter.class)
  //     .emit(eventName, params);
  // }

  // @ReactMethod
  // public void addListener(Integer count) {

  // }

  // public void removeListeners(Integer count) {
   
  // }

  // WritableMap params = Arguments.createMap();
  // params.putString("eventProperty", "someValue");

  // sendEvent(reactContext, "EventReminder", params);
}
