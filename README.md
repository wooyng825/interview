# [For-Interview]

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
- 본인이 가지고 있는 ***<u>말투</u>*** , ***<u>자주 사용하는 단어</u>*** 등을 파악할 수 있고
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

#### 〈 로그인 & 데이터베이스(DB) 연동 〉
- **회원 기능**을 통해 관련 자료 & 음성 기반 텍스트 데이터 등을 저장할 수 있고  
이를 통해 **성장 과정 관찰**, **개선 방향 설정** 등을 할 수 있습니다.

<br />
<br />

## 기록: Moments 

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
- 초기 ver. 구현 완료

<br />
<br />

## 기술: Techs
[<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">](https://www.typescriptlang.org/)
[<img src="https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=next.js&logoColor=white">](https://nextjs.org/)
[<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">](https://tailwindcss.com/)
<br />
[<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">](https://firebase.google.com/)
[<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white">](https://openai.com/)
<br />
[<img src="https://img.shields.io/badge/Font Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white">](https://fontawesome.com/)

<br />
<br />

## 도움 받은 곳

- [Nextjs - Fontawesome 설치 및 적용](https://record22.tistory.com/132)

- [Nextjs - 전역 변수 관리 zustand 입문](https://velog.io/@yhg0337/zustand-Nextjs-시작계기)

- [Nextjs - Firebase 연동](https://velog.io/@sanglee/Next.js-Firebase로-어플리케이션-만들기)

- [Form으로부터 데이터 얻는 방법 useForm](https://velog.io/@sinclairr/next-react-hook-form)

- [줄바꿈 기호 포함된 데이터를 HTML에 표현하는 방법](https://ajh322.tistory.com/92)

- [Alert 대신 사용할 수 있는 Toast 메세지 라이브러리](https://velog.io/@cptkuk91/간편하게-사용할-수-있는-토스트-메시지-라이브러리-react-hot-toast)

- [Firebase 배포 오류 → build & export 먼저 한 후 배포](https://velog.io/@stnqls3938/Firebase로-Next.js-호스팅하기)

- [NextJS에서 OpenAI - Whisper모델 사용하기](https://javascript.plainenglish.io/transcribe-audio-files-using-whisper-open-ai-api-using-next-js-and-typescript-ad851016c889)