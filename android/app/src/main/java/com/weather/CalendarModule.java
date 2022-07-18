package com.weather;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import android.content.Intent;
import android.app.Activity;
import android.provider.CalendarContract;

import androidx.annotation.NonNull;

public class CalendarModule extends ReactContextBaseJavaModule {
  CalendarModule(ReactApplicationContext context) {
    super(context);
  }

  @NonNull
  @Override
  public String getName() {
    return "CalendarModule";
  }

  @ReactMethod
  public void createCalendarEvent(String name, String location, Promise promise) {
    try {
      Intent intent = new Intent(Intent.ACTION_INSERT);
      intent.setData(CalendarContract.Events.CONTENT_URI);
      intent.putExtra(CalendarContract.Events.TITLE, name);
      intent.putExtra(CalendarContract.Events.DESCRIPTION, location);
      intent.putExtra(CalendarContract.Events.ALL_DAY, "true");
      Activity activity = getCurrentActivity();
      if (activity != null) {
        activity.startActivity(intent);
      }

      promise.resolve(intent);
    } catch(Exception e) {
      promise.reject("Create Event Error", "Error parsing date", e);
    }
  }
}