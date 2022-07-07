package com.weather;

import java.util.Calendar;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.facebook.react.bridge.Promise;
import android.content.Intent;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import android.content.Context;
import android.app.Activity;
import android.provider.CalendarContract;
import androidx.appcompat.app.AppCompatActivity;

public class CalendarModule extends ReactContextBaseJavaModule {
  CalendarModule(ReactApplicationContext context) {
      super(context);
  }

  @Override
  public String getName() {
    return "CalendarModule";
  }

  @ReactMethod
  public void createCalendarEvent(String Title, String Description, Promise promise) {
    try {
      Intent intent = new Intent(Intent.ACTION_INSERT);
      intent.setData(CalendarContract.Events.CONTENT_URI);
      intent.putExtra(CalendarContract.Events.TITLE, Title.toString());
      intent.putExtra(CalendarContract.Events.DESCRIPTION, Description.toString());
      intent.putExtra(CalendarContract.Events.ALL_DAY, "true");
      Activity activity = getCurrentActivity();
      activity.startActivity(intent);

      promise.resolve(intent);
    } catch(Exception e) {
      promise.reject("Create Event Error", "Error parsing date", e);
    }
  }
}
