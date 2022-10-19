# Perfect Portions App v2
This is an Ionic/Capacitor project. This will look similar to the Cordova based apps, but there are a few differences.

## Cordova vs Capacitor
Capacitor separates out the build processes for the Ionic app, and the iOS/Android app. That means when you build your app, only the parts being changed are updated. Simply running `ionic build` will only build the Ionic app, and there are separate commands for copying files to the native projects embedded in the root project.

This also means that we need to commit native app files as part of the project. Manifests and versioning are handled inside the platform specific files.

## Running
The project used npm version 12. There is a `.nvmrc` file, so you can switch to the correct version by running `nvm use`.

### Web
After pulling the repo, run `npm install` and then `ionic serve`. This will run the Ionic app in a browser and automatically reload when changes are saved.

### Native
#### iOS
The Ionic docs for setting up iOS are [here](https://ionicframework.com/docs/developing/ios).
1. Run `ionic capacitor open ios` or open `/ios/App/App.xcworkspace` in Xcode.
2. Run `ionic capacitor run ios -l --external` to configure the app for livereload.
3. In Xcode, select the device you would like to run on, and run the app.

#### Android
The Ionic docs for setting up iOS are [here](https://ionicframework.com/docs/developing/android).
1. Run `ionic capacitor open android` or open the `/android` folder in Android Studio.
2. Run `ionic capacitor run android -l --external` to configure the app for livereload.
3. In Android Studio, select the device you would like to run on, and run the app.

## Docs
- [Ionic](https://ionicframework.com/docs/components)
- [Capacitor](https://capacitorjs.com/docs)