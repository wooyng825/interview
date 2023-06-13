# [For-Interview](https://interview.bluecoder.dev)

<br />

## 배경: Background

면접을 앞두고 많은 녹음과 교정을 해야하는 지인이 있었습니다.

컴퓨터로 자료를 보고 휴대폰으로 녹음하여 듣는 모습을 보며  
안쓰러우면서도 꽤나 번거롭겠다는 생각이 들었습니다.

<br />

> ### 만약 예상 자료들을 보면서 녹음을 할 수 있는 페이지가 있다면..?

<br />

이번 프로젝트는 앞선 질문 하나에서부터 시작하였습니다.

단순히 몇몇 질문과 답변을 등록하고 녹음하는 기능 뿐만 아니라  
녹음한 음성을 바탕으로 이를 텍스트로 보여준다면 다음과 같은 효과를 기대할 수 있습니다.

- 스스로 언급한 내용을 되새기면서
- 본인이 가지고 있는 **_<u>말투</u>_** , **_<u>자주 사용하는 단어</u>_** 등을 파악할 수 있고
- 생각지도 못하게 나온 “**좋은 문구**”를 찾아 활용할 수도 있다.

<br />
<br />

## 기능: Features

#### 〈 데이터 설정 (Data setting) 〉

- 면접, 간단한 인터뷰 등에 나올만한 예상 질문과 이에 대한 본인의 답변을 등록할 수 있습니다.
- 등록한 데이터를 목록으로 볼 수 있으며 수정 및 삭제할 수 있습니다.

---

#### 〈 랜덤 질문 (Random Questions) & 답변 숨기기 (Hidden Ansnwers) 〉

- 등록한 데이터의 순서에 관계없이 랜덤으로 보여줍니다.
- 질문이나 주제에 대한 답변은 기본적으로 숨겨진 채로 보여지나 사용자가 원한다면 볼 수 있습니다.
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)를 활용하여 질문 또는 주제를 읽어주는 음성 재생 기능이 있습니다.

---

#### 〈 녹음 (Record) 〉

- 말하기 연습을 위해 음성을 녹음하고 소요 시간 등을 확인할 수 있습니다.

---

#### 〈 재생 플레이어 (Audio Player) 〉

- [**HTML - audio 객체**](https://developer.mozilla.org/ko/docs/Web/HTML/Element/audio)를 이용하여 녹음한 음성을 다시 듣거나 음성 파일을 다운로드할 수 있습니다.

---

#### 〈 오디오 → 텍스트 변환 (Transcript) 〉

- [**OpenAI - Whisper**](https://openai.com/research/whisper) 모델을 사용하여 녹음한 음성을 기반으로 변환한 텍스트를 볼 수 있습니다.
- 실시간으로 녹음한 음성 뿐만 아니라 사전에 녹음된 음성파일도 업로드하여 변환할 수 있습니다.

---

#### 〈 녹음 데이터 (Record Data) 〉

- 파일 업로드 또는 음성 녹음을 기반으로 변환한 텍스트 + 질문(주제) + 저장 시간이 함께 저장된 데이터를 실시간으로 볼 수 있습니다.
- 녹음 데이터를 삭제할 수 있습니다.

---

#### 〈 로그인 & 데이터베이스(DB) 연동 〉

- **회원 기능**을 통해 관련 자료 & 음성 기반 텍스트 데이터 등을 저장할 수 있고  
  이를 통해 **성장 과정 관찰**, **개선 방향 설정** 등을 할 수 있습니다.
- 사용자 token을 통해 로그인을 유지할 수 있습니다.

<br />
<br />

## 기록: Records of moments

### 2023.06.01

- 프로젝트 생성
- 전체적인 UI 구현
- Firebase 연동 및 환경 설정
- 로그인 기능 추가

### 2023.06.02

- 데이터베이스 구조화
- 데이터베이스 연결 및 테스트
- 데이터 등록 및 삭제 기능 추가
- '랜덤 질문 & 답변 숨기기' 기능 추가

### 2023.06.03

- OpenAI - Whisper 모델 연결 및 테스트
- '파일 업로드' & '실시간 녹음' 탭 추가
- Firebase Hosting 완료

### 2023.06.04

- 데이터 수정 기능 추가
- README 작성
- 1.0 ver. 업데이트 완료

### 2023.06.05

- 녹음 시간 버그 수정
- 데이터베이스 재구조화
- '녹음 데이터' 탭 추가
- Web Speech API를 활용한 text-to-speech 구현 및 테스트
- 음성 재생 아이콘 - 약간의 사용자 경험 개선 (speaking or not);
- 1.1 ver. 업데이트 완료

### 2023.06.06

- UI 일부 수정 및 개선
- 유저 정보 색상 변경 (black → gray)
- 페이지 별 영역 - 제목 추가
- 페이지 좌우 여백 통일 (홈 제외)
- 녹음 및 파일 업로드 / 텍스트 변환 관련 영역 위치 고정 (오른쪽 아래, toggle 형태)
- 1.2 ver. 업데이트 완료

### 2023.06.07

- getStaticProps(SSR)를 활용하여 데이터 패치 테스트 (For 렌더링 속도 개선)
- Firebase Cli 문서를 통해 웹 프레임워크와 통합 기능(실험) 제공 → SSR 테스트
- getServerSideProps 활용 → 클라이언트 렌더링 ▶ 서버 렌더링 일부 적용 (1차)
- (로그인 / 회원가입) 페이지 → 홈 영역에 추가하여 통합
- AuthProvider 생성 및 \_app.tsx 추가 → Cookie에 token 저장
- 기존에 사용하던 zustand 제거 → 'useAuth'(React Hook) 생성하여 전체적으로 활용
- 2.0 ver. 업데이트 완료

### 2023.06.08

- 모든 페이지에 Server-Side Rendering 적용
- Cookie에 저장된 token → 로그인 유지 기능에 활용
- 사용자 정보 및 데이터 로딩 시간 확보 (500ms)
- 데이터 로딩 중 문구 추가
- 2.1 ver. 업데이트 완료
- firebase hosting 관련 오류 수정 → 배포한 페이지에서 SSR 미 적용 문제 발견
- 배포 플랫폼 변경 : firebase → vercel
- 2.1 ver. 2차 업데이트 완료

### 2023.06.09

- ServerSideProps 코드 개선 (함수형태)
- HTML 커스텀 데이터 속성 → 페이지 별 배경화면 설정
- 2.2 ver. 업데이트 완료

### 2023.06.10

- 로그인 하지 않고 페이지 방문하면 server-side에서 redirect 하도록 수정 → 불필요한 클라이언트 렌더링 자제
- addEventListener 사용 횟수 ▼ → case 별 맞춤형 함수 제공
- server-side에서 정보가 제대로 넘어오지 않는 문제 (undefined) → 페이지 컴포넌트 이름 수정으로 임시 조치.. 좋은 개선 방향인가?
- 네비게이션 페이지 이름 수정 : 테스트 → '연습실'
- 페이지 이동 시, 300ms 대기 시간 추가 → 안정적인 데이터 패치 및 렌더링 시간 확보
- 일부 색상 통일 및 스타일 변경 & 연습실 - 오디오 관련 컨트롤러 위치 변경
- 오디오 관련 컨트롤러 UI 변경 → label 활용하여 사용자 경험 ▲
- 2.3 ver. 업데이트 완료

### 2023.06.11

- Footer 생성 → Github 및 Contact 연동
- Footer 위치 → 하단 고정
- Contact 클릭 → 이메일 플랫폼 선택 제공
- \_document를 이용한 공통 레이아웃 설정 & metadata를 활용한 seo 최적화 진행
- 로그인 시 인사말 추가한 메세지 출력
- 3.0 ver. 업데이트 완료

### 2023.06.12

- Footer 페이지 아래에 고정 & 다른 요소와 겹치는 문제 수정
- Contact - 이메일 주소 복사하는 기능 추가
- 이메일 플랫폼 선택 창 - animation 제거 & state에 의한 노출 여부 적용
- 모바일(~768px) & 태블릿(~1024px) 반응형 UI 추가 및 개선
- 컨텐츠 길이가 짧거나 길어졌을 때의 위치 개선
- 로그인 시 나타나는 유저 정보 위치 개선 → 기본 = 유지 / 태블릿 이하 = 로그인(로그아웃) 버튼 아래
- 3.1 ver. 업데이트 완료

### 2023.06.13

- Footer 정보 업데이트 (author / email)
- Contact 이메일 수정
- 데이터 설정 페이지 - 저장 시 안내 메시지 겹치는 문제 수정
- 가로보기 / 세로보기 버튼 z-index 값 수정
- 3.2 ver. 업데이트 완료
- 카카오 비즈니스 - Adfit 광고 배너 추가 [PC / Mobile]
- 광고 배너 관련 스타일시트 생성 및 적용
- 파비콘 제작 및 적용

<br />

### 기업 CI(Coperation Identity) 이미지 출처

- [네이버 로고](https://logoproject.naver.com/logonaver)
- [다음 로고](https://creativestudio.kr/2810)
- [카카오 로고](https://creativestudio.kr/822#)
- [구글 로고](https://www.blog.google/press/)

<br />
<br />

## 기술: Stacks

> #### 언어 (Language)
>
> [<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">](https://www.typescriptlang.org/)

<br />

> #### 프레임워크 (Framework)
>
> [<img src="https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=next.js&logoColor=white">](https://nextjs.org/) > [<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">](https://tailwindcss.com/)

<br />

> #### 데이터베이스 (DB)
>
> [<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">](https://firebase.google.com/)

<br />

> #### 배포 (Deploy)
>
> [<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">](https://vercel.com/)

<br />

> #### 기타 (AI & Icon etc.)
>
> [<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white">](https://openai.com/) > [<img src="https://img.shields.io/badge/Font Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white">](https://fontawesome.com/)

<br />
<br />

## 바로가기 : Shortcuts

- [https://interview.bluecoder.dev](https://interview.bluecoder.dev)

<br />
<br />

## 도움 받은 곳 : Where get help

- [Nextjs - Fontawesome 설치 및 적용](https://record22.tistory.com/132)

- [Nextjs - 전역 변수 관리 zustand 입문](https://velog.io/@yhg0337/zustand-Nextjs-시작계기)

- [Nextjs - Firebase 연동](https://velog.io/@sanglee/Next.js-Firebase로-어플리케이션-만들기)

- [Form으로부터 데이터 얻는 방법 useForm](https://velog.io/@sinclairr/next-react-hook-form)

- [줄바꿈 기호 포함된 데이터를 HTML에 표현하는 방법](https://ajh322.tistory.com/92)

- [Alert 대신 사용할 수 있는 Toast 메세지 라이브러리](https://velog.io/@cptkuk91/간편하게-사용할-수-있는-토스트-메시지-라이브러리-react-hot-toast)

- [Firebase 배포 오류 → build & export 먼저 한 후 배포](https://velog.io/@stnqls3938/Firebase로-Next.js-호스팅하기)

- [NextJS에서 OpenAI - Whisper모델 사용하기](https://javascript.plainenglish.io/transcribe-audio-files-using-whisper-open-ai-api-using-next-js-and-typescript-ad851016c889)

- [Wep Speech API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

- [Wep Speech API - JavaScript에서 쉽게 text-to-speech 기능 구현하기](https://javascript.plainenglish.io/how-to-easily-implement-text-to-speech-functionality-in-your-next-javascript-project-16f0d14432f0)

- [Wep Speech API - Speech Synthesis를 이용한 text-to-speech 기능 구현](https://javascript.plainenglish.io/how-to-easily-implement-text-to-speech-functionality-in-your-next-javascript-project-16f0d14432f0)

- [Next.js - Data Fetching : getStaticProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)

- [Next.js getStaticProps 사용기](https://velog.io/@taeung/Next.js-getStaticProps-사용기)

- [쿠키를 이용한 firebase 인증](https://colinhacks.com/essays/nextjs-firebase-authentication)

- [Firebase 문서 - Next.js 통합](https://firebase.google.com/docs/hosting/frameworks/nextjs?hl=ko)

- [Vercel 문서 - Next.js](https://vercel.com/docs/frameworks/nextjs)

- [Vercel 문서 - 환경 변수](https://vercel.com/docs/concepts/projects/environment-variables)

- [HTML태그에 커스텀 데이터 속성 설정](https://velog.io/@gga01075/HTML태그에-나만의-커스텀-속성-추가하기-ppec05qv)

- [HTML - input 태그에서 placeholder보다 label을 활용해야 하는 이유](https://ibrahimovic.tistory.com/30)

- [Next.js - Customizing (renderPage)](https://nextjs.org/docs/pages/building-your-application/routing/custom-document)

- [받는주소 지정해서 네이버 메일 페이지 열기](https://m.blog.naver.com/mcgyber1/220762022300)

- [JS - 클립보드에 특정 텍스트 복사하기](https://gurtn.tistory.com/167)

- [Next.js - Image Components](https://nextjs.org/docs/pages/api-reference/components/image)

- [footer 하단 고정](https://velog.io/@gomiseki/footer-하단-고정)
