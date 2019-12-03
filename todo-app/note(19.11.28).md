### 1. firebase hosting
    1. firebase 설치
```bash
    $ npm install -g firebase-tools
```

    2. 설치 완료 후 로그인
```bash
    $ firebase login
```

    3. 로그인 후
```bash
    $ npm run build
```

    4. node.js환경에서 build(deploy를 위한 파일들)폴더 생성 확인.
```bash
    //firebase에서 권장하는 config 관리 방식이 있음
    $ firebase init
```
    5. 우리는 Firestore와 Hosting 선택(스페이스) 후 엔터

        여기까지 firestore setup 종료


    6. firestore rules 설정 
        (enter - public 폴더 대신 build 폴더로 수정)
```bash
? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html
```


    7. deploy
```bash
    $ firebase deploy
```

    8. 링크
[Project Console] : https://console.firebase.google.com/project/myfirstfirebase-8f5ed/overview
[Hosting URL] : https://myfirstfirebase-8f5ed.firebaseapp.com

    9. 배포 버전 관리
        1) deploy 이후 hotfix가 있다면 전 버전으로 되돌릴 수 있다.
        2) 1GB까지 사용 가능.

    10. http://gitignore.io/api/firebase 에서 .gitignore에 들어갈 파일 생성후 붙이기


### 2. git flow

    1. git flow init (브랜치가 master -> branch)
```bash
    $ git flow init -d 
    //-d 옵션은 default로 develop 브랜치를 생성해줌
```

    2. gitflow branch는 모두 6종류
        - master : 최종 릴리즈에 사용되는 안정된 버전 (최종 배포, deploy 버전과 일치해야)
        - develop : 다음 릴리즈를 위해 개발중인 최신 버전 (배포 준비)
        - feature : 특정 기능 개발을 위한 branch (ex. feature/기능명_담당자 성함)
        - release : 릴리즈 점검을 위한 branch
        - hotfix : 긴급 버그 픽스를 위한 branch (master에서 급히 수정해야 하는 경우)
        - support : 버전 호환성 문제를 처리하기 위한 branch

    3. git flow 명령어
    ```bash
    $ git flow <브랜치면> 명령어 [옵션]

    ```
    4. patch 기능을 한번 만들어보자
    ```bash
    $ git flow feature start patchCompleted
    //student@M1702 MINGW64 ~/todo-app/firebase/todo-app (feature/patchCompleted)
    ```
    5. git branch 확인
    ```bash
    $ git branch
    develop
    * feature/patchCompleted
    master
    ```

    6. feature branch start
    ```bash
    $ git flow feature start patchCompleted
    $ git branch
    $ git add .
    $ git commit -m "[mod] git flow feature test"
    $ git checkout develop
    $ git branch
    $ git checkout feature/patchCompleted
    $ git push origin feature/patchCompleted
    $ git checkout develop
    $ git push origin develop
    $ git checkout feature/patchCompleted
    $ git flow feature finish feature.patchCompleted
    $ git checkout develop
    $ git branch
    $ git pull origin develop
    ```

    7. remote에서 하지않고 local에서 사용 
    ```bash
    
    ```

    8. ref
    [git flow] : https://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html

