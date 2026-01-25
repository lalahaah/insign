# InSign - AI Contract Analysis Platform

🌟 **한국에서 활동하는 글로벌 인재를 위한 계약서 분석 플랫폼**

InSign은 AI 기반의 계약서 분석 서비스로, 한국어 계약서의 위험한 조항을 자동으로 찾아내고 협상 전략을 제공합니다.

## 🚀 주요 기능

- ✅ **AI 계약서 분석**: GPT-4o를 활용한 지능형 계약서 분석
- 📊 **InSign Score**: 0-100점 사이의 계약 안전 지수
- ⚠️ **독소 조항 탐지**: 초상권, 정산금, 계약 해지 등 20가지 핵심 패턴 감지
- 🌐 **다국어 지원**: 한국어/영어 분석 리포트 제공
- 🔐 **보안**: Firebase 인증 및 암호화된 데이터 저장
- 📱 **반응형 디자인**: 모든 기기에서 최적화된 경험

## 📋 기술 스택

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: OpenAI GPT-4o
- **State Management**: Zustand, React Context

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성하고, 실제 Firebase 및 OpenAI 정보로 수정하세요.

```bash
cp .env.local.example .env.local
```

필요한 환경 변수:
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase API 키
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase 프로젝트 ID
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase 인증 도메인
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase Storage 버킷
- `OPENAI_API_KEY`: OpenAI API 키

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
InSign/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── page.tsx            # 랜딩 페이지
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── dashboard/          # 대시보드
│   │   └── globals.css         # 전역 스타일
│   ├── components/             # React 컴포넌트
│   │   ├── ui/                 # shadcn/ui 컴포넌트
│   │   └── theme-provider.tsx  # 테마 프로바이더
│   ├── contexts/               # React Contexts
│   │   └── AuthContext.tsx     # 인증 컨텍스트
│   ├── lib/                    # 유틸리티 및 설정
│   │   ├── firebase/           # Firebase 설정
│   │   │   ├── config.ts       # Firebase 초기화
│   │   │   ├── auth.ts         # 인증 함수
│   │   │   └── storage.ts      # Storage 함수
│   │   └── utils.ts            # 공통 유틸리티
│   └── types/                  # TypeScript 타입 정의
│       ├── contract.ts         # 계약서 타입
│       └── user.ts             # 사용자 타입
├── public/                     # 정적 파일
├── docs/                       # 프로젝트 문서
└── package.json                # 프로젝트 설정
```

## 🔐 Firebase 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. 새 프로젝트 생성
3. 웹 앱 추가 및 설정 정보 복사

### 2. Firebase 서비스 활성화

- **Authentication**: Google, Apple 로그인 활성화
- **Firestore Database**: 데이터베이스 생성 (시작 모드: 프로덕션)
- **Storage**: 스토리지 버킷 생성

### 3. Firestore 보안 규칙 설정

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/profile {
      allow read, write: if request.auth.uid == userId;
    }
    match /users/{userId}/contracts/{contractId} {
      allow read, write: if request.auth.uid == userId;
      match /analysis/{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
    match /public/data/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### 4. Storage 보안 규칙 설정

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /contracts/{userId}/{contractId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 🤖 OpenAI API 설정

1. [OpenAI Platform](https://platform.openai.com/)에서 API 키 발급
2. `.env.local`에 `OPENAI_API_KEY` 설정
3. GPT-4o 모델 사용 권한 확인

## 💳 가격 플랜

- **Free**: InSign Score + 가장 위험한 조항 1개 공개
- **Pro (₩19,900/건)**: 전체 분석 리포트 + 영어 설명 + PDF 다운로드
- **Master (₩49,000/건)**: Pro 기능 + 협상 스크립트 + 비자 영향도 분석

## 📝 라이선스

이 프로젝트는 MVP 단계이며, 상업적 사용을 위해서는 별도의 라이선스가 필요합니다.

## ⚠️ 법적 고지

본 서비스는 법률 자문이 아닙니다. 계약서 체결 전 반드시 전문가와 상담하시기 바랍니다.

## 📞 Contact

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

Made with ❤️ for global talent in Korea
# insign
