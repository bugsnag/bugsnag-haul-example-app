# Haul example app

This is a vanilla React Native (0.59.8) project that has been altered to integrate Bugsnag + Haul.

## Example app Integration steps

### Bugsnag

I followed the regular setup steps, minus the enhanced native integration:

https://docs.bugsnag.com/platforms/react-native/react-native/#installation
https://docs.bugsnag.com/platforms/react-native/react-native/#basic-configuration

### Haul

I followed the regular setup steps with the latest RC:
https://callstack.github.io/haul/docs/getting_started.html

I also disabled the babel runtime in order to build the app, as suggested on this thread: https://github.com/callstack/haul/issues/535#issuecomment-484016561

## Generating sourcemaps and errors

### iOS App

I launched the app and triggered a handled JS exception:

```
react-native run-ios --configuration Release
```

I then generated a sourcemap:

```
yarn haul bundle --platform ios --bundle-output bundle/ios/index.bundle --assets-dest bundle/ios/assets
```

The sourcemap was then uploaded, and after a short wait I triggered a handled JS exception again:

```
curl https://upload.bugsnag.com/react-native-source-map \
   -F apiKey=5d1ec8bd39a74caa1267142706a7fb20 \
   -F appVersion=1 \
   -F dev=false \
   -F platform=ios \
   -F sourceMap=@bundle/ios/index.bundle.map \
   -F bundle=@bundle/ios/index.bundle \
   -F projectRoot=`pwd`
```

## Android App

I launched the app and triggered a handled JS exception:

```
react-native run-android --variant=release
```

I then generated a sourcemap:

```
yarn haul bundle --platform android --bundle-output bundle/android/index.bundle --assets-dest bundle/android/assets
```

The sourcemap was then uploaded, and after a short wait I triggered a handled JS exception again:

```
curl https://upload.bugsnag.com/react-native-source-map \
   -F apiKey=5d1ec8bd39a74caa1267142706a7fb20 \
   -F appVersionCode=1 \
   -F dev=false \
   -F platform=android \
   -F sourceMap=@bundle/android/index.bundle.map \
   -F bundle=@bundle/android/index.bundle \
   -F projectRoot=`pwd`
```

## Results

Sourcemaps seem to work well and group correctly for handled and unhandled JS Exceptions, using Haul 1.0.0-rc.15 and React Native 0.59.8, in the examples we've tried.
