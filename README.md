Bundles were generated on the latest RC of haul, with the hotfix for disabling babel applied, as suggested here: https://github.com/callstack/haul/issues/535#issuecomment-484016561

The sourcemaps can be recreated with the following commands:

```
yarn haul bundle --platform ios --bundle-output bundle/ios/index.bundle --assets-dest bundle/ios/assets
yarn haul bundle --platform android --bundle-output bundle/android/index.bundle --assets-dest bundle/android/assets
```
