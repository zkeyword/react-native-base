## project directory ##

    /
    ├── /dist/           # production use
    ├── /public/         # asset(not merge into js)
    ├── /app/            # resource code
    │ ├── /asset/        # asset(may be merge into js)
    │ ├── /components/   # components
    │ ├── /containers/   # page router
    │ ├── /models/       # models
    │ ├── /services/     # api services
    │ ├── /utils/        # tool
    │ ├── config.js      # api url config
    │ ├── router.js      # router
    │ └── index.js       # enter

## use

If you need a version for nodejs v8+, android or ios development environment

install:

    npm install eslint -g
    npm install

develop:

    react-native run-ios or react-native run-android

lint:

    npm run lint

## react-native link

react-native link react-native-device-info

修改

build.gradle

    dependencies

        compile project(':react-native-device-info')


apk: 
https://www.jianshu.com/p/1380d4c8b596