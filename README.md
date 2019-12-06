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
5. firebase database 추가 후 규칙 추가 변경
   ```
   allow read, write: if request.time <timestamp.date(2019,12,27);
   ```
6. local 3000 실행



### 2. Project Struct & git repo랑 연결
```bash
  todo-app
    .firebase
    build
    node_modules
    public
    src
      components
      firebase
      index.js
    .firebaserc
    .gitignore
    firebase.json
    firestore.indexes.json
    firestore.rules
    note(19.11.28).md
    package-lock.json
    package.json
    README.md
  README.md
  todo-app-firebase.PNG
```

```bash
$ git init
$ git add .
$ git commit -m "[ADD]todo-app-firebase"
$ git remote -v
$ git remote add origin <url>
$ git push origin master
```

### 3. git flow
```bash
  git add . 
  //주의점은 git status를 확인하고 상위(..)에 폴더 및 파일 들도 add 해주어야 한다
  git commit -m "[MOD]method.js"
  git push origin feature/modify-delete
  git flow feature finish
  //finish까지는 작성해주면 feature branch 삭제하고 .git이 알아서 해줌
  git flow feature start feature/modify-post
  git flow feature finish
  git push origin develop
```

### 4. firebase depoly
```bash
    $ npm run build
    $ firebase deploy
    //향후 depoly시 특정 기능만 추가할 수 도 있음
```


### 5. Redux, hook
```bash
  프로젝트 최상위인 index.js에서 state를 작성
  //Redux와 React Redux 두개의 Lib 필요
```

### 6. Install
```bash
  todo-app/firebase/todo-app $ yarn add react-router-dom
  todo-app/firebase/todo-app $ yarn add bootstrap
    //index.js에 추가
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '@fortawesome/fontawesome-free/css/all.min.css';
```

### 7. 표기법
javaScript: camelCase표기법 (중간에 이어지는 단어의 첫문자를 대문자로 표기)
react component : 파스칼 표기법 (첫 단어를 대문자로 시작하는 표기)
python, ruby: snake 표기법 (소문자로 쓰되 중간에 이어지는 단어 사이에 _를 넣어 표기 )