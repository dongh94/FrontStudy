Next.js Getting Started

Next.js 프로젝트 초기화
npx create-next-app@latest

Next.js 프로젝트 초기화(+타입스크립트)
npx create-next-app@latest --typescript

https://nextjs.org/docs/getting-started

next13 버전 이슈
https://nextjs.org/docs/app/building-your-application/routing


라이브러리와 프레임워크의 주요 차이점

라이브러리와 프레임워크의 주요 차이점은 "Inversion of Control"(통제의 역전)입니다.
라이브러리에서 메서드를 호출하면 사용자가 제어할 수 있습니다.
그러나 프레임워크에서는 제어가 역전되어 프레임워크가 사용자를 호출합니다.

라이브러리
사용자가 파일 이름이나 구조 등을 정하고, 모든 결정을 내림

프레임워크
파일 이름이나 구조 등을 정해진 규칙에 따라 만들고 따름

'use client' -> 클라이언트 사이드 랜더링
https://mycodings.fly.dev/blog/2022-11-17-nextjs-13-client-component#headtsx-%ED%8C%8C%EC%9D%BC%EB%A1%9C-title%EA%B3%BC-%EA%B0%99%EC%9D%80-%EB%A9%94%ED%83%80-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0

CSR(Client Side Rendering)테스트 해보시려면
아래 사이트에서 개발자 도구 -> Network -> Slow 3G로 바꾸시고, Disable cache를 클릭해주시고 새로고침하시면 테스트해볼 수 있습니다.
https://nomadcoders.github.io/react-masterclass/

자바스크립트 비활성화하기
보안 및 개인정보 보호-사이트 및 방패 설정-자바스크립트-자바스크립트 비활성화

Source Code는 Ctrl + U로 확인이 가능합니다.
disable JS는 F12 -> Settings -> Preference -> Debugger 에서 선택하실 수 있습니다.

SSR
pre-render : 컴포넌트의 초기상태를 기반으로 미리 렌더링된 html을 클라이언트로 넘김 => 페이지의 초기 로딩 지연을 줄일 수 있음!
hydration : pre-render된 페이지에 react의 반응성을 입히는 것

# Routing
No HTML link for pages

페이지 간 클라이언트 측 경로 전환을 활성화하고 single-page app 경험을 제공하려면 Link컴포넌트가 필요합니다.
```javascript
import Link from 'next/link'

< Link href="/about">
< a>About Us< /a>
< /Link>
```





Array.prototype.join()
join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join()); // expected output: "Fire,Air,Water"
console.log(elements.join('-')); // expected output: "Fire-Air-Water"
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join

CSS Module 사용하기
1. className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}
2. [styles.link, router.pathname === "/" ? styles.active : ""].join(" ")



Built-In CSS Support (내장 CSS 지원)

Next.js를 사용하면 JavaScript 파일에서 CSS 파일을 가져올 수 있습니다.
이것은 Next.js가 import 개념을 JavaScript 이상으로 확장하기 때문에 가능합니다.

CSS-in-JS
격리된 범위 CSS에 대한 지원을 제공하기 위해 styled-jsx를 번들로 제공합니다. 목표는 불행히도 서버 렌더링을 지원하지 않고 JS 전용인 Web Components와 유사한 "Shadow CSS"를 지원하는 것입니다.
https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js

styled-jsx를 사용하는 컴포넌트는 다음과 같습니다.
```
< style jsx>{`
CSS 스타일..
`}< /style>
```
styled-jsx
https://github.com/vercel/styled-jsx

Adding Component-Level CSS
Next.js는[name].module.css 파일 명명 규칙을 사용하여 CSS Module을 지원합니다.

Sass Support
Next.js를 사용하면.scss 및.sass 확장자를 모두 사용하여 Sass를 가져올 수 있습니다.


nextjs는 렌더링할 페이지 컴포넌트를 Component와 Component에서 사용하는 pageProps를 인자로 받는 _app.js 컴포넌트를 제일 먼저 렌더링 한다.

HOC 패턴으로 모든 페이지에 적용할 기능이나 스타일을 지정할 수 있다~
최근 업데이트로 _app.js 가 아니라 _app.tsx 만 받아주는 것 같아요. ChatGPT 한테 물어봐서 같은 이슈 해결했습니다