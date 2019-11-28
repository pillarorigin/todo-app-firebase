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
        1) deploy 이후 크리티컬 오류가 있다면 전 버전으로 되돌릴 수 있다.
        2) 1GB까지 사용 가능.

    10. http://gitignore.io/api/firebase 에서 .gitignore에 들어갈 파일 생성후 붙이기
