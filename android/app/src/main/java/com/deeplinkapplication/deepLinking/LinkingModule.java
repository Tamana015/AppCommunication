package com.deeplinkapplication.deepLinking;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
@ReactModule(name = "LinkingCalls")
public class LinkingModule extends ReactContextBaseJavaModule {
    private Promise mPromise;
    public LinkingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    
    @NonNull
    @Override
    public String getName() {
        return "LinkingCalls";
    }
    @ReactMethod
    public void openApp(String scheme, String host, String requestData){
        try {
            Activity activity = getReactApplicationContext().getCurrentActivity();
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(scheme+ "://" + host));
            if(requestData!=null && requestData.length()>0){
                intent.putExtra(Intent.EXTRA_TEXT, requestData);
            }
            activity.startActivity(intent);
         }catch (Exception e){
            e.printStackTrace();
        }
    }
    @ReactMethod
    public void openAppWithURI(String deeplinkUrl) {
        try {
            Activity activity = getReactApplicationContext().getCurrentActivity();
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(deeplinkUrl));
            activity.startActivity(intent);
        }
        catch (ActivityNotFoundException e){
            e.printStackTrace();
        }
    }
}