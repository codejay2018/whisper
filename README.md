# npm 대신 bun 사용한다.
```
bun -- version 
1.3.11
```

# Backend
```
backend % bun init -y
backend % bun run index.ts
```
## 구조
```
src > 
  config, 
  controllers, 
  middleware, 
  models, 
  routes, 
  scripts, 
  utils
```
## 몽고디비 사용한다.
- monggodb.com atlas 사용
- mongoose 사용
## Express 프레임웍 설치
```
backend $ bun add express
or
backend $ bun add express@5.2.1 cors@2.8.5 mongoose@9.0.2 socket.io@4.8.2 @clerk/express@1.7.60

```
- package.json
```
'scripts':{
  'dev': 'bun --watch index.ts',
  'start': 'bun index.ts',
  'build': 'bun install'
}

사용
bun run dev
bun run start? bun start?
bun run build
```
## db schema
```
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    clerkId: string;
    name: string;
    email: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
};

const UserSchema = new Schema<IUser>({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true},
    avatar: { type: String, default: "" },
}, {
    timestamps: true,   
});

export const User = mongoose.model<IUser>("User", UserSchema);
```
```
import mongoose from "mongoose";
import { Schema, type Document } from "mongoose";

export interface IChat extends Document {
    participants: mongoose.Types.ObjectId[]; 
    lastMessage: mongoose.Types.ObjectId | null;
    lastMessageAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

const ChatSchema = new Schema<IChat>({
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message", default: null },
    lastMessageAt: { type: Date, default: Date.now },
}, {
    timestamps: true,   
});

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);  
```
```
import { Schema, type Document } from "mongoose";
import mongoose from "mongoose";

export interface IChat extends Document {
    chat: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
    updatedAt: Date;
};

const MessageSchema = new Schema<IChat>(
    {
        chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

MessageSchema.index({ chat: 1, createdAt: 1 });
// asc 1, desc -1

export const Message = mongoose.model<IChat>("Message", MessageSchema);
```
## 인증은 Clerk를 사용한다.
## socket.io 로 실시간 통신을 구현한다.
## 배포는 sevalla에 한다.
1. express에 react 빌드 포함하기
    ```
    web % bun run build
    dist 폴더 생성됨.
    ```
2. backend/app.js 추가
    ```
    // serve frontend in production
    if(process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../web/dist')));
      
      app.get('/{*any}', (_, res) => {
        res.sendFile(path.join(__dirname, '../../web/dist/index.html'));
      });
    }
    ```
    ```
    순서역할
    
    1️⃣ API 라우트/api/... 요청 처리
    2️⃣ express.staticJS, CSS, 이미지 등 정적 파일
    3️⃣ /{*any} 폴백나머지 모든 요청 → index.html

    Express는 위에서 아래로 순서대로 미들웨어를 실행하기 때문에 순서가 매우 중요합니다.
    ```
3. sevalla에서 빌드시 사용할 Docker 설정
- Dockerfile
- .dockerignore

# Web
```
web % bun create vite .
  react
  javascript or typescript
  나머진 디폴트
```
## react-router
```
web % bun add react-router
```
## tailwind
```
web  % bun add tailwindcss @tailwindcss/vite
```
## daisyui
```
web  % bun add -D daisyui@latest
```
- vscode extension you need


# Mobile
```
mobile $ bunx create-expo-app@latest .
```
## expo로 생성한 프로젝트는 기본적으로 git이 초기화 되어있음 제거하자(우리꺼 쓰자)
```
mobile % rm -rf .git
```
프로젝트 루트에서 깃 초기화
```
whispser % git init
whispser % git add .
whispser % git commit -m "initial commit"
```
깃허브와 연동
```
...or push an existing repository from the command line
복사해서 실행
```
## 기본생성 프로젝트 초기화
```
mobile % bun run reset-project
```
- y
- 생성된 app-example 폴더 제거
## 실행
```
mobile % bunx expo start
```
## Nativewind 설정
- mobile/tainwind.config.js
- mobile/global.css
- mobile/babel.config.js
- mobile/metro.config.js
- mobile/tainwind.config.js
- mobile/app/_layout.tsx
  ```
  import '../global.css';
  ```
## Tanstack 설정
```
mobile % bun add @tanstack/react-query
```
## Axios 설정
```
mobile % bun add axios
```
## Sentry 설정( 버그 리포트 )
```
mobile % bunx expo prebuild

mobile $ bunx expo run:ios
or
mobile $ bunx expo run:android

```




