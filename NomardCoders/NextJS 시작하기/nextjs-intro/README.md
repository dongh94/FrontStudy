
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Routing
No HTML link for pages

페이지 간 클라이언트 측 경로 전환을 활성화하고 single-page app 경험을 제공하려면 Link컴포넌트가 필요합니다.
```javascript
import Link from 'next/link'

< Link href="/about">
< a>About Us< /a>
< /Link>
```

useRouter()
앱의 함수 컴포넌트에서 router객체 내부에 접근하려면 userRouter()훅을 사용할 수 있습니다.
useRouter는 React Hook입니다. 즉, 클래스와 함께 사용할 수 없습니다. withRouter를 사용하거나 클래스를 함수 컴포넌트로 래핑할 수 있습니다.
```
const router = useRouter()
```

### Css Module
Name.moudle.css 생성 후
.calssName {} 과 같이 클래스 네임별로 css 작성
Name.js 에서 import 후에 styles 지정,
className={sytles.calssName} 으로 사용

Array.prototype.join()
join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join()); // expected output: "Fire,Air,Water"
console.log(elements.join('-')); // expected output: "Fire-Air-Water"
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join

CSS Module 사용하기
```javascript
import styles from "./NavBar.module.css"

  return (
    <nav>
      <Link className={`${styles.link} ${pathname === "/" ? styles.active : ""}`} href="/">Home</Link>
      <Link className={[styles.link, pathname === "/about" ? styles.active : ""].join(" ")} href="/about">About Us</Link>
    </nav>
  )
```


## Learn More


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
