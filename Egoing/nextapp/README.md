- [Egoing 생활코딩 Next.js 공부](#egoing------nextjs---)
    + [1. Install and Exec](#1-install-and-exec)
    + [2. Sample app](#2-sample-app)
    + [3. Deploy](#3-deploy)
    + [4. building a skeleton](#4-building-a-skeleton)
    + [5. Routing](#5-routing)
    + [6. SPA](#6-spa)
    + [7. Use Static Resoures](#7-use-static-resoures)
    + [8. CSS](#8-css)
    + [9. Backend](#9-backend)
    + [10. Server & Client component](#10-server---client-component)
    + [11. Dynamic Router And Binding](#11-dynamic-router-and-binding)
    + [12. Create And Post Request](#12-create-and-post-request)
    + [13. cache](#13-cache)
    + [14.  client component로 부분적으로 전환](#14--client-component로-부분적으로-전환)
    + [15. Update](#15-update)
    + [16. 삭제](#16-삭제)
    + [17. 환경변수 !](#17-환경변수-!)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>





# Egoing 생활코딩 Next.js 공부



### 1. Install and Exec

* npx create-next-app@latest
* Ts No, App router Yes, import alias No.
* 

### 2. Sample app

* layout.js는 page.js를 감싸기 전에 상태다, root page도 "/"때만 감싼다.

* layout.js 의 children 은 page.js 의 export default fuction의 return 값이다.
* layout.js 에서 global.css import 되어있다.

### 3. Deploy

* Crome -> Network -> 6.3MB resources -> 서버에서 클라이언트로 전송한 용량
* pakage.json -> scripts : 유지보수 명령어 -> build는 서버를 위한 배포판 -> start 배포판을 서비스
* npm run build -> .next 에 배포 -> npm run start -> 서비스 시작
* build -> ts -> js 
* 실서버용 배포판은 훨씬 슬림한 295 kb resources

### 4. building a skeleton

* 배포판 서비스 끄기
* layout - metadata = web title (맨위 제목)

### 5. Routing

##### # 용어정리

예를 들어, "http://a.com/dashboard/analytics/"라는 주소가 있을 때, "/dashboard/analytics/" 부분을 'path'라고 합니다. 그리고 'dashboard'와 'analytics'는 각각 'segment'라고 부릅니다.

* http://a.com/dashboard/analytics/
  * a.com = domain
  * dashboard/analytics/ = path
    * dashboard = segment
    * analytics = segment

##### # 절차

페이지를 만드는 방법은 다음과 같습니다.

1. 처음에 "/create"로 접속하면 "Not Found"가 출력됩니다.
2. 그 다음, "app/create/page.js" 파일을 생성합니다.

```javascript
page.js

export default function Create() {
    return 
    <>
        Create!!
    </>
}
```

3. "/create"로 다시 접속하면 정상적으로 페이지가 출력됩니다.

##### # 정리

1. "app" 아래의 폴더는 세그먼트를 의미합니다. "/create"는 "app/create" 폴더를 의미합니다.
2. "create/page.js" 파일이 있다면, 이 파일의 반환 값을 화면에 출력합니다.
3. 이 값을 상위 컴포넌트인 "_app.js"의 children 위치에 표시합니다.
4. 이때, "pages/index.js"는 무시됩니다. ?



##### # layout 중첩하기

app/layout.js를 이용하여, app/create/page.js를 감싸는 하위 레이아웃을 만들고 싶다면, 다음과 같은 방법으로 할 수 있습니다:

* /create

  * app -> create 폴더 -> 폴더 내 page.js -> page.js 내용을 create 폴더 내 layout.js 

  * -> 없다면 부모 폴더에서 layout.js 의 children 안에 들어간다.

  * -> 있다면 layout을 구성해서 children 안에 들어간다.

  * ```javascript
    *  export defualt function Layout{props} {
        return (
        	<h2>Create</h2>
        )
    * }
    ```

  * Typescript 참고

  * ```typescript
    type LayoutProps = {
        children: React.ReactNode;
    }
    
    export defualt function Layout{props} {
        return (
        	<h2>Create</h2>
        )
    }
    ```

  * app/create/layout.js가 있다면, **이 파일로 app/create/page.js를 포장한 후에 app/layout.js로 포장합니다.** 이는 **레이아웃의 중첩**을 허용합니다.

  * **Next.js는 URL 경로의 세그먼트에 따라 콘텐츠를 찾고, 해당 콘텐츠가 위치한 폴더의 layout.js를 시작으로 상위 폴더를 탐색하면서 layout.js로 감싸줍니다. 이는 Next.js의 라우팅 로직을 잘 나타내는 특징입니다.**

  * 이런 방식으로 Next.js는 간단하고 직관적인 라우팅을 제공하며, 프로젝트의 복잡성을 효과적으로 관리할 수 있도록 도와줍니다.

##### # 다이나믹 라우팅

* read/1, read/2 의 1,2는 가변적으로 변경되는 경로입니다. 이런 경로를 처리하려면 이렇게 하면 됩니다.

* /read

  * [id] - 다이나믹 폴더 맏는 후에 그 안에 page.js 생성

    * page.js

    * ```javascript
      export default function Read(props) {
        return (
          <>
          <h2>Read page</h2>
          parameter : {props.params.id}
          </>
        )
      }
      ```

    * layout.js 안한다면 -> 이전이니까 root의 layout의 children에 read page를 감싼다.

### 6. SPA

##### # What do you want

* 링크를 클릭하면 페이지 전체 리로딩이 일어나지 않고 **필요한 콘텐츠만 로딩**하고 싶다. 

* **이미 방문한 페이지는 캐싱**을 해서 다시 다운로드 하지 않도록 하고 싶다. 

* **미리 페이지를 로드**했다가 실제 요청이 있을 때 클라이언트 측에서 즉시 응답한다. 

* ```javascript
  import Link from 'next/link'
  a tag -> Link
  ```

  * 페이지 리로딩이 없어졌다. 
  * 방문한 페이지를 다운로드 받지 않는다. 
  * 미리 페이지를 다운로드 한다. 

##### # What is SPA

* 하나의 페이지에서 모든 작업을 처리하는 앱을 의미합니다. 
* 서버로부터 가져올 데이터가 있다면 ajax와 같은 방법을 통해서 동적으로 로딩합니다. 
* 이것을 SPA(single page application)이라고 합니다. 
* Link는 Next.js에서 SPA를 매우 쉽게 구현하도록 도와주는 도구입니다. 



### 7. Use Static Resoures

##### # public

* src/app/page.js

* ```javascript
  
  export default function Home() {
    return (
      <>
        <h2>Home Page</h2>
        Hello, NextJs Web!
        <br></br>
  *      <img src="./next.svg" width="80"></img>
        <br></br>
      </>
    )
  }
  
  ```



### 8. CSS

##### # app/global.css 파일에 css 코드를 작성

### 9. Backend

##### #  Next.js 메뉴얼의 Router Handler 참고

##### #  json-server

1. npx json-server --prot 9999 --watch db.json

   * --watch : 서버에 실시간 반영 ( db.json 변화 감지 )

2. db.json 파일 수정

   * ```json
     db.json 추가
     
       "topics" : [
         {
           "id": 1,
           "title": "read1",
           "body": "read1 is .."
         },
         {
           "id": 2,
           "title": "read2",
           "body": "read2 is .."
         }
       ]
     ```

   * 

3. http:localhost:9999/topics로 접속

4. 개발자 도구 Network 창에서 ESC키를 눌러서 콘솔창 열기

   * 글목록 읽기 

     1. fetch().then().then()

     2. ```javascript
        const resp = await fetch('http://localhost:9999/topics/')
        const result = await resp.json();
        console.log(result);
        ```

   * 글 추가 

     * ```javascript
       const resp = await fetch("http://localhost:9999/topics", {
         method: "POST",
         body: JSON.stringify({ title: "js", body: "js is ..." }),
         headers: {
           "content-type": "application/json",
         },
       });
       const result = await resp.json();
       console.log(result);
       ```

   * 글 읽기

     * ```javascript
       const resp = await fetch('http://localhost:9999/topics/1')
       const result = await resp.json();
       console.log(result);
       ```

   * 글 수정

     * ```javascript
       const resp = await fetch('http://localhost:9999/topics/2', {
         method:'PATCH', 
         body: JSON.stringify({title:'css3', body:'css3 is ...'}),
         headers: {
           'content-type': 'application/json'
         }})
       const result = await resp.json();
       console.log(result);
       ```

   * 글 삭제

     * ```javascript
       const resp = await fetch('http://localhost:9999/topics/2', {
           method:'DELETE', 
       })
       const result = await resp.json();
       console.log(result);
       ```

### 10. Server & Client component

##### # 큰 그림

* ![img](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/6341/13043.png)
* ![img](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/6341/13053.png)



##### # 기본

* nextjs의 컴포넌트는 크게 server component와 client component로 구분됩니다. 특별한 처리를 하지 않으면 **nextjs에서 컴포넌트는 server component** 입니다.
  * **추천 설계!**
  * 상호작용 O API  : client component : useState, useEffect, onClick, onChange, useRouter, useParams, fetch
  * 상호작용 X API :  server component : secure data, cookie, header, fetch (Link 는 상호작용 X)
  * 참고 : meta는 server ( layout.js )
* **Server** 컴포넌트는 아래와 같은 경우에 사용합니다. 
  - 사용자와 상호작용하지 않는 경우
  - 백엔드에 엑세스하면서 보안적으로 위험한 정보를 주고 받는 경우
* **Client**  컴포넌트는 아래와 같은 경우 사용합니다. 
  - 서버 컴포넌트로 해결되지 않는 경우
  - 사용자와 상호작용하는 경우
  - useEffect, useState, onClick, onChange와 같은 API를 사용해야 하는 경우 
  - useRouter, useParams와 같은 nextjs의 client component API를 사용하는 경우
* **SSR** : 서버 컴포넌트는 **모든 작업(static, JS, reactJS..)**을 서버 쪽에서 처리하고, 그 결과인 html 코드만 클라이언트로 전송합니다. 이것을 **Server Side Rendering** 이라고 한다.
  * 추천 설계법 (단순 정보이동)
    * 간결한 코드: useEffect와 useState와 같은 훅을 사용하지 않아도 되므로, 코드가 더 간결하고 이해하기 쉬워집니다. 이로 인해 코드 유지 관리가 쉬워지고, 버그 발생 확률이 줄어들 수 있습니다.
    * 빠른 데이터 엑세스: 데이터베이스와 같은 자원에 접근해야 하는 경우, 서버 컴포넌트는 서버와 데이터베이스가 가까운 위치에서 작동하므로, 더 빠른 속도로 필요한 데이터에 접근할 수 있습니다.
    * 보안: 서버 컴포넌트는 클라이언트에 민감한 정보(예: 데이터베이스 비밀번호)를 전송하지 않습니다. 이로 인해, 필요한 작업을 안전하게 처리하면서 동시에 클라이언트의 보안을 유지할 수 있습니다.
    * 향상된 성능: 서버 컴포넌트는 클라이언트로 JavaScript 코드를 전송하지 않습니다. 이는 전송되는 데이터의 양을 줄이고, 클라이언트의 부하를 줄임으로써 웹사이트의 전반적인 성능을 향상시키는데 도움이 됩니다.
  * SSR의 Process : **서버에서 렌더링 할 준비가 된 HTML** 파일을 받아와 **페이지 전체를 즉시 렌더링** 하는 방식
  * SSR의 장점 2
    - **초기 렌더링이 빠르다** 즉, 사용자가 기다리는 시간이 적다.
    - SEO 대응에 용이하다.
    - SEO : 크롤봇이 HTML에서 컨텐츠를 수집하기 때문에 완성된 HTML 인식 가능.
  * SSR의 단점 2
    - 서버 호출 시 페이지가 새로고침 되며 깜빡임 발생
    - 요청이 생길 때마다 서버에서 렌더링 되지 않아도 될 부분까지 준비하기 때문에 **서버 부하**의 원인이 된다.
  * CSR의 Process : 브라우저에서 빈 HTML( script, meta, link 태그 등 만)파일을 받아와 **모든 작업(static, JS, reactJS..)** 실행 이후 페이지 출력
  * CSR의 장점 2
    - 클라이언트에서 렌더링 하기 때문에 **서버 부하 감소**
    - 서버 요청 시 서버는 요청한 데이터를(JSON) 응답하기 때문에 변경된 부분만 렌더링 할 수 있어 **사용자 친화적**이다.
  * CSR의 단점 2
    - 브라우저 최초 진입 시 모든 정적 리소스를 다운로드하기 때문에 SSR 보다 **초기 로딩 속도가 느리다.**
    - SEO에 용이하지 않다
* 즉 ! SSR : 결과값이 빠르고 SEO / CSR : 상호작용이 용이하고 서버부하 감소
* 즉2 SSR : MPA / CSR : SPA



### 11. Dynamic Router And Binding

##### # 사용

* SSR - SEO : 상호작용 X API : Link

* ```javascript
  export default async function Read(props) {
    const id = props.params.id;
    const resp = await fetch(`http://localhost:9999/topics/${id}`)
    const topic = await resp.json();
    return (
      <>
      <h2>{topic.title}</h2>
      parameter : {topic.body}
      </>
    )
  }
  ```



### 12. Create And Post Request

##### # 사용

* CSR - SPA - Cache : 상호작용 O API

* ```javascript
  'use client'
    
  import { useRouter } from "next/navigation";
    
  export default function Create(){
    const router = useRouter();
    return <form onSubmit={async evt=>{
      evt.preventDefault();
      const title = evt.target.title.value;
      const body = evt.target.body.value;
      const resp = await fetch('http://localhost:9999/topics/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
      });
      const topic = await resp.json();
      console.log("file: page.js:19 ~ Create ~ topic:", topic)
      router.push(`/read/${topic.id}`);
      router.refresh();
    }}>
      <h2>Create</h2>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="create" /></p>
    </form>
  }
  ```

* 주의 ! 

  1. **router.refresh()**; -> CSR에서 해줘도 전체 페이지 중에 SSR이니까 refresh해줘야 갱신된다.
  2. No ! form in form
  3. async await fetch, await json

### 13. cache

##### # 주의

* SSR 과 CSR 을 섞어가며 쓰다보니 cache를 쓰게 되는 Next.JS다.
* 그래서 post를 해도 다시 같은 것을 get하면 안돌아온다. - cache에서 긁어와 ㅠㅠ 빠르고 좋겠지..
* 확인방법
  * `rm -rf .next`
  * `npm run dev`
  * fetch - get 등 해보시길.. 짜잔..ㅠㅠ

##### # 해결방법

* (추천)  https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data
* 읽다보면.. 시간, 주문형 으로 만들 수 있는데..
* 끄는 방법이 있다.
  * { `http://`, {cache : "no-store"}}



### 14.  client component로 부분적으로 전환

##### # useParams, component file ( 'use client' )

* app/Control.js 생성 

  ```javascript
  "use client"
  import Link from 'next/link';
  import { useParams } from 'next/navigation';
   
  export function Control() {
    const params = useParams();
    const id = params.id;
    return (
      <ul>
        <li><Link href="/create">Create</Link></li>
        {id ? <>
          <li><Link href={"/update/"+id}>Update</Link></li>
          <li><input type="button" value="delete" /></li>
        </> : null}
      </ul>
    );
  }
  ```

* export defult  vs export의 차이 : 클래스 vs 메서드 느낌!

  * export default : `import 클래스이름 from "./(클래스)주소"`
  * `import {메서드} from "./(클래스)주소"`

* useParams() 는 그 주소의 param에서 가져오는 훅! 

  * param이 있을 때 그쪽에만 띄우면 되니까 삼항연산자 적용.

* props.params를 못쓸 때 훅쓰면서 use client 적용시키는 개념이다.



* 다음  ! Control 컴포넌트를 app/layout.js에서 사용

  ```
  <Control />
  ```



### 15. Update

##### # dynamic update 개념

[id] 등 수치가 있으면 props로 넘겨서 props.params 로 해결.

아니면? useParams 써야지.

* ```javascript
  app/update/[id]/page.js 생성
  
  'use client'
  import { useRouter } from "next/navigation";
  import {useEffect, useState} from 'react';
    
  export default function Update(props){
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const id = props.params.id;
    async function refresh(){
      const resp = await fetch(`http://localhost:9999/topics/${id}`);
      const topic = await resp.json();
      setTitle(topic.title);
      setBody(topic.body);
    }
    useEffect(()=>{
      refresh();
    }, []);
      
    return <form onSubmit={async evt=>{
      evt.preventDefault();
      const title = evt.target.title.value;
      const body = evt.target.body.value;
      const resp = await fetch(`http://localhost:9999/topics/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
      });
      const topic = await resp.json();
      router.push(`/read/${topic.id}`);
      router.refresh();
    }}>
      <h2>Update</h2>
      <p><input type="text" name="title" placeholder="title" onChange={e=>setTitle(e.target.value)} value={title}/></p>
      <p><textarea name="body" palceholder="body" onChange={e=>setBody(e.target.value)} value={body}></textarea></p>
      <p><input type="submit" value="update" /></p>
    </form>
  }
  ```

* 수정은 보통 등록 html 가져와서 props.params 에 id만 있으면

* ```javascript
    const id = props.params.id;
    async function refresh(){
      const resp = await fetch(`http://localhost:9999/topics/${id}`);
      const topic = await resp.json();
      setTitle(topic.title);
      setBody(topic.body);
    }
    useEffect(()=>{
      refresh();
    }, []);
  ```

* input 태그나 textarea 태그에 값 넣어주면 된다.

* ```javascript
  <p><input type="text" name="title" placeholder="title" onChange={e=>setTitle(e.target.value)} value={title}/></p>
      <p><textarea name="body" palceholder="body" onChange={e=>setBody(e.target.value)} value={body}></textarea></p>
  ```

* 수정을 한 후에 /read/[id]로 접속을 하면 내용이 갱신되지 않습니다. 여기서는 캐쉬 기능을 끈다.

* ```javascript
  export default async function Read(props){
    const id = props.params.id;
    const resp = await fetch(`http://localhost:9999/topics/${id}`, {cache:'no-cache'});
    const topic = await resp.json();
    return <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  }
  ```

* 



### 16. 삭제

##### # 별거 없으

* ```javascript
  <button></button>
  
  <button onClick={async ()=>{
                const resp = await fetch(`http://localhost:9999/topics/${id}`, {
                  method: 'DELETE',
                });
                await resp.json(); // 안써도돼고
                router.push('/');
                router.refresh();
              }}>delete</button>
  ```



### 17. 환경변수 !

##### # 관리 - 보안

1. **Server Component** API URL 

   * .env.local = string 아님 주의

     * ```
       API_URL=http://localhost:9999/
       ```

   * **사용**

     * ```
       const resp = await fetch(process.env.API_URL + "topics", { cache: "no-store" })
       
       ```

2. Client Component API URL - 보안걸지 않음.

   * .env.local

     * ```
       NEXT_PUBLIC_API_URL=http://localhost:9999/
       ```

   * **사용**

     * ```
       const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", { cache: "no-store" })
       ```

     * `process.env.NEXT_PUBLIC_API_URL`
