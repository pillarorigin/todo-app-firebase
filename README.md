## FireBase 관련 README

### 1. firebase 연결

1. firebase 웹 앱 추가

2. 추가할 프로젝트 설정의 구성을 가져와서 해당 폴더 config.js 추가해서 넣기

3. initialize.js 파일에서 config.js 파일 불러올 수 있게 로직 구현

   ```js
   import firebaseConfig from './config';
   import * as firebase from 'firebase/app';
   
   firebase.initializeApp(firebaseConfig);
   ```

4. method.js 추가 (firebase db안에서 data 불러오는 로직)

5. firebase database 추가

6. local 3000 실행

### 2. git repo랑 연결
```
$ git init
$ git add .
$ git commit -m "[ADD]todo-app-firebase"
$ git remote -v
$ git remote add origin <url>
$ git push origin master
```

### 3. 

