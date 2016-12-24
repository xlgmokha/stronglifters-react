namespace :release do
  desc "create android release"
  task :android do
    # https://facebook.github.io/react-native/docs/signed-apk-android.html
    sh "cd android && ./gradlew clean assembleRelease"
    sh "ls android/app/build/outputs/apk/app-release.apk"
  end
end
