package.json 초기화
npm init -y

npm i -D typescript

package.json
"devDependencies": {
  "typescript": "확인해서 맞추기"
}

tsconfig.json 생성
touch tsconfig.json

tsconfig.json 설정
{
  // ts소스코드 위치 -> src 생성 및 index.ts 등 생성
  "include": [
    "src"
  ],
  // 컴파일러옵션 -> outDir : js 생성 위치
  // target : js 버전 (ES6 권장)
  "compilerOptions": {
    "outDir": "build",
    "target": "ES6",
     "lib": ["ES6","DOM"]
  }
}
lib -> 정의 파일 (default set of type definitions)
타입스크립트에게 어떤 API를 사용하고 어떤 환경에서 코드를 실행하는 지를 지정할 수 있습니다.
(target 런타임 환경이 무엇인지를 지정합니다.)
프로그램이 브라우저에서 실행되면 lib에 "DOM" 유형 정의를 할 수 있습니다.
DOM: window, document 등 자동완성 사용 가능, 아무것도 안적으면 node.js 백엔드만 의존
// ex. "lib": ["ES6","DOM"]


package.json
"scripts": {
  "build" : "tsc"
},

npm run build
build라는 폴더 안에 파일 생성 (이름그대로)
ts -> js complie


tsconfig.json에서 "strict": ture를 통해 strict mode로 해주면, Declaration Files가 없는 경우에 대해서도 에러를 띄워준다.
모든 엄격한 타입 검사 옵션을 활성화합니다.

### myPackage 사용해보기 ts

myPackage.js 생성 후 입력
```javascript
export function init(config) {
  return true;
}

export function exit(code) {
  return code + 1;
}

```

myPackage.d.ts 생성 후 입력
d.ts 가 definition setting 파일.
declare module 이름 으로 추가해준다.
```javascript
interface Config {
  url: string,
}
declare module "myPackage" {
  function init(config: Config) : boolean;
  function exit(code: number) : number;
}
```

index.ts 에서 사용
```javascript
import { init, exit } from "myPackage"

init({
  url:"ture",
})

exit(1);
```


### js -> ts myPackage 사용해보기

tsconfig.json   "compilerOptions"에 추가
    "allowJs": true,

js파일을 import 가능 (상대주소로)

이후 js 파일을 작업한다. 위의 myPackage.js와 비교한다.

myPackage.js
```javascript
// @ts-check
/**
 * Initializes the project
 * @param {object} config 
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
  return true;
}
/**
 * 
 * @param {number} code 
 * @returns {number}
 */
export function exit(code) {
  return code + 1;
}
```
index.ts
```javascript
import { init, exit } from "./myPackage"

init({
  "debug" : true,
  "url" : "http://blablaaa.com"
})
```

// @ts-check 를 추가했는데도 아무 에러가 발생하지 않는 분들은
VScode의 settings에 가셔서 JavaScript > Validate: Enable 에 체크

@param, @returns
```javascript
/**
* @param {string} p1 - A string param.
* @param {string=} p2 - An optional param (Google Closure syntax)
* @param {string} [p3] - Another optional param (JSDoc syntax).
* @param {string} [p4="test"] - An optional param with a default value
* @returns {string} This is the result
*/
function stringsStringStrings(p1, p2, p3, p4) {
// 코드...
}
```
https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#param-and-returns


### 추가 환경설정
package.json
"script" 에 추가
"start" : "node build/index.js"

빌드 없이 빠르게 dev 환경
1. ts-node
npm i ts-node -D
ts-node는 Node.js용 TypeScript 실행 엔진 및 REPL입니다. JIT는 TypeScript를 JavaScript로 변환하므로 사전 컴파일 없이 Node.js에서 TypeScript를 직접 실행할 수 있습니다.
-> cmd창에서 실행이 된다. console.log 등 확인 가능하다는 의미.


2. nodemon
npm i nodemon -D
자동으로 커맨드를 재실행시켜 일일이 커맨드를 다시 실행할 필요가 없어진다.

package.json
"script" 에 추가
    "dev": "nodemon --exec ts-node src/index.ts"
**npm run dev 실행**


3. esModuleInterop
CommonJS 모듈을 ES6 모듈 코드베이스로 가져오려고 할 때 발생하는 문제를 해결합니다. ES6 모듈 사양을 준수하여 CommonJS 모듈을 정상적으로 가져올 수 있게 해줍니다.
import crypto from "crypto";
에서 에러가 나서 tsconfig.json에 추가
    "esModuleInterop": true,
    "module" : "CommonJS"

4. typescript로 작성되지 않은 패키지를 import할 때 (Cannot find module "reactJs" 등)
allowJS 를 false로 두면
JSDoc이 활용이 안되잖아. 그럼 어째?
d.ts 가 필요하단 말이야 그래서 레전드들이 JSDoc을 보고 깃정리해서 d.ts 가 담긴 파일을 npm i @type/이름 으로 가져갈 수 있게 해놨다.

결국 d.ts 파일을 node_modules에 담아서 사용가능하다는 의미다.

DefinitelyTyped
TypeScript type 정의를 위한 리포지토리입니다.
https://github.com/DefinitelyTyped/DefinitelyTyped


@types/이름   ex. node, axon 등등
npm i @types/node -D






블록체인 시리즈
https://www.youtube.com/playlist?list=PL7jH19IHhOLOJfXeVqjtiawzNQLxOgTdq


