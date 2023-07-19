package com.deeplinkapplication;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

	public boolean shouldAuthenticate() {
		return true;
	}

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "DeepLinkApplication";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
   protected ReactActivityDelegate createReactActivityDelegate() {
      return new DefaultReactActivityDelegate(
              this,
              getMainComponentName(),
              // If you opted-in for the New Architecture, we enable the Fabric Renderer.
              DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
              // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
              DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
      ){
        private Bundle mDeepLinkParams;
        @Nullable
        @Override
        protected Bundle getLaunchOptions() {
            return mDeepLinkParams;
        }
          @Override
          protected void onCreate(Bundle savedInstanceState) {
            Bundle bundle =getIntent().getExtras();
            Log.e("TAG create ",""+bundle );
            if(bundle!=null){
                mDeepLinkParams = new Bundle();
                mDeepLinkParams.putString("data", bundle.getString(Intent.EXTRA_TEXT));
            }
            super.onCreate(savedInstanceState);
          }
          @Override
          public boolean onNewIntent(Intent intent) {
             super.onNewIntent(intent);
              ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
              Bundle bundle = intent.getExtras();
              Log.e("TAG nee intent  ",""+bundle );

              if(bundle!=null){
                  String data = bundle.getString(Intent.EXTRA_TEXT);
                  if(data!=null) {
                      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                              .emit("deepLinking", data);
                  }
              }
              return true;
          }
          
      };
  }
}
