# 1 Javascript
⭐ Javascript
└ 매우 유연해서 에러를 잘 보여주지 않음
🚫 숫자 배열 + false
→ 배열이 사라지고 string으로 바뀜
🚫 함수의 인자가 잘못 들어가도 실행됨
→ return값이 NaN일 뿐, 에러가 나지 않음
🚫 const a = { a: "A" };
a.hello();
실행 시 에러 발생
→ 실행 전에 에러 감지 불가

⭐ Typescript
└ 타입 안정성 → 버그 감소

# 2 타입스크립트
타입스크립트 코드 테스트
https://www.typescriptlang.org/play

타입스크립트 핸드북
https://typescript-kr.github.io/pages/basic-types.html

타입스크립트란?

1. TypeScript는 JavaScript에 추가적인 구문을 추가하여 editor와의 단단한 통합을 지원합니다. editor에서 초기에 오류를 잡을 수 있습니다.

2. TypeScript 코드는 JavaScript가 실행되는 모든 곳(브라우저, Node.js 또는 Deno 및 앱 등)에서 JavaScript로 변환될 수 있습니다.

3. TypeScript는 JavaScript를 이해하고 타입 추론(type inference)을 사용하여 추가 코드 없이도 훌륭한 도구를 제공합니다.

# 3
⭐ Type 시스템
└ 명시적 정의(변수 선언 시 타입 정의)
let a: boolean = "x"
→ 🚫 boolean 타입에 string타입 할당 불가 알림

└ 변수만 생성(타입 추론)
let b = "hello"
→ b가 string 타입이라고 추론
b = 1
→ 🚫 string 타입에 number타입 할당 불가 알림

📌 Types of TS(기본)
✅ 배열: 자료형[]
✅ 숫자: number
✅ 문자열: string
✅ 논리: boolean
✅ optional
const player : {
    name: string,
    age?:number
} = {
    name: "nico"
}

❌ player.age가 undefined일 가능성 알림
if(player.age < 10) {
}

⭕ player.age가 undefined일 가능성 체크
if(player.age && player.age < 10) {
}

❗ ?를 :앞에 붙이면 optional (있다면)

✅ Alias(별칭) 타입
type Player = {
    name: string,
    age?:number
}

const player : Player = {
    name: "nico"
}

⭐ 함수에서는 어떻게 쓸까
type Player = {
    name: string,
    age?:number
}

function playerMaker1(name:string) : Player {
    return {
        name
    }
}

const playerMaker2 = (name:string) : Player => ({name})

const nico = playerMaker1("nico")
nico.age = 12

📌 Types of TS(part II)
✅ readonly 사용하기
type Player = {
    readonly name:string
    age?:number
}

const playerMaker = (name: string): Player => ({name})

const nico = playerMaker("nico")
🚫 nico.name = "aa"

const numbers: readonly number[] = [1, 2, 3, 4]
🚫 numbers.push(1)
❗ readonly가 있으면 최초 선언 후 수정 불가
    ⇒ immutability(불변성) 부여
        but, javascript에서는 그냥 배열

✅ Tuple
정해진 개수와 순서에 따라 배열 선언
const player: [string, number, boolean] = ["nico", 1, true]
❗ readonly도 사용가능 ⇒ readonly [...] 형태

✅ undefined, null, any
any: 아무 타입
undefined: 선언X 할당X
null: 선언O 할당X

📌 Types of TS(part II)
✅ unknown
let a:unknown

if(typeof a === 'number'){
    let b = a + 1
}
if(typeof a === 'string'){
    let b = a.toUpperCase()
}
그냥하면 🚫 let b = a + 1

✅ void
아무것도 return하지 않는 함수에서 반환 자료형
function hello() {
    console.log('x')
}
const a = hello()
🚫 a.toUpperCase()

✅ never
함수가 return하지 않을 때
function hello():never {
    throw new Error("zzz")
    🚫return "a"
}

function temp(name:string|number):never {
    if(typeof name === "string"){
        name
    } else if(typeof name === "number"){
        name
    } else {
        name => 실행되지 않음
    }
}

if 안에서는 string형의 name 반환
else if 안에서는 number형의 name 반환
else 안에서는 never형의 name 반환
⇒ 즉, 제대로 인자가 전달되었다면 else로 올 수 없음

Call Signatures = 메서드 type 만들어주기

프로퍼티로 호출 가능한 것을 설명하려면 객체 타입에 Call Signature을 작성할 수 있습니다.
Call Signatures는 다음과 같이 함수의 매개 변수(parameter)와 반환 타입을 지정합니다.

type Add = {
(a: number, b: number): number;
}
// type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b

Call(=Function) Signature란 함수의 매개변수와 반환 값의 타입을 모두 type으로 미리 선언하는 것이다.

* React에서 함수로 props를 보낼 때, 어떻게 작동할지 미리 설계 가능


Function(=Method) Overloading은 직접 작성하기보다 외부 라이브러리에 자주 보이는 형태로, 하나의 함수가 복수의 Call Signature를 가질 때 발생한다

type Add = {
(a: number, b: number): number,
(a: number, b: string): number
}

const add: Add = (a, b) => {
if (typeof b === "string") return a;
return a + b;
}

매개변수의 데이터 타입이 다른 경우 예외 처리

type Add2 = {
(a: number, b: number): number,
(a: number, b: number, c: number): number
}

const add2: Add2 = (a, b, c?: number) => {
if (c) return a + b + c;
return a + b;
}

매개변수의 수가 다른 경우 예외 처리

위와 같은 함수는 거의 없지만 외부 라이브러리에서 활용될 수 있다

router.push("/home");

router.push({
path: "/home",
state: 1
});

예를 들어, Next.js의 라우터 push가 대충 두 가지 방법으로 페이지를 이동한다고 할 때,

type Config = {
path: string,
state: number
}

type Push = {
(config: Config): void,
(config: string): void
}

const push: Push = (config) => {
if (typeof config === "string") console.log(config);
else console.log(config.path);
}

패키지나 라이브러리는 위와 같이 두 가지 경우의 Overloading으로 디자인되어 있을 것이다


✅ polymorphism(다형성)
❓poly란?
- many, serveral, much, multi 등과 같은 뜻
❓morphos란?
- form, structure 등과 같은 뜻
❗polymorphos = poly + morphos = 여러 다른 구조

concrete type
- number, boolean, void 등 지금까지 배운 타입

generic type
- 타입의 placeholder

─ 예시 ────────────────────────
type SuperPrint = { (arr: T[]): void }
type SuperReturn = { (arr: T[]): T }

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}
const superReturn: SuperReturn = (arr) => arr[0]

superPrint([1, 2, false, true])
console.log(superReturn([1, 2, 3, 4]))

제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다.'

type Player = {
name: string,
extraInfo: T
};

type MePlayer = Player;

type MeExtra = {age: number};

const player: MePlayer = {
name: "joseph",
extraInfo: {
age: 23
}
};

const player2: Player = {
name: "Yee",
extraInfo: null
};

Generic은 위와 같이 원하는 만큼 커스텀 및 재사용이 가능하다

아마 직접 작성하기보다 패키지/라이브러리의 Generic을 활용하는 경우가 더 많을 것이다

const numArr: Array = [1, 2, 3, 4];

const [state, setState] = useState();

함수 뿐만 아니라 다양한 경우의 Generic을 활용할 수 있는데, 예를 들어 Array 기본 형태나 React의 useState가 Generic으로 디자인되어 있다

Classes

추상(abstract) 클래스
추상 클래스는 오직 다른 클래스가 상속받을 수 있는 클래스이다.
하지만 직접 새로운 인스턴스를 만들 수는 없다.
```
abstract class User{
constructor(
private firstname:string,
private lastname:string,
public nickname:string
){
abstract getNickname():void
}
}

class Player extends User{
// 추상 메서드는 추상 클래스를 상속받는 클래스들이 반드시 구현(implement)해야하는 메서드이다.
getNickname(){
console.log(this.nickname)
}
}
```
public: 모든 클래스에서 접근 가능
private: 해당 클래스 내에서만 접근 가능 (자식 클래스에서도 접근 불가)
protected: 해당 클래스와 자식 클래스에서 접근 가능

https://www.typescriptlang.org/docs/handbook/2/classes.html


type Words = { // 해시
[key: string]: (string | string[])
//객체의 property에 대해 모르지만 타입만을 알 때 유용하다
}
class Dict {
private words: Words
constructor() {
this.words = {}
}
add(word: Word) { // word는 Word 클래스의 인스턴스 타입.
if(!this.words[word.term]) {
// 사전에 없는 단어이면
this.words[word.term] = word.def;
}
}
find(term: string) {
return this.words[term];
}
// 단어를 삭제
rmv(term: string) {
delete this.words[term];
}
// 단어 이름 업데이트
update(oldTerm: string, newTerm: string) {
if(this.words.hasOwnProperty(oldTerm)) {
this.words[newTerm] = this.words[oldTerm];
delete this.words[oldTerm];
}
}
// 사전에 저장된 단어의 개수
size() {
return Object.keys(this.words).length;
}
// 모든 사전의 이름과 뜻 출력
all() {
for(let [key, value] of Object.entries(this.words)) {
console.log(`${key}: ${value}`)
}
}
}
// words는 initializer 없이 선언해주고 contructor에서 수동으로 초기화
// constructor에 인자로 넣어 constructor가 지정해주길 바라는 게 아니므로

// 각각의 단어에 대한 클래스
class Word {
constructor(public term: string, public def: (string| string[])) {}
// 단어 출력하는 메소드
toString() {
console.log(`${this.term}: [뜻] ${this.def}`);
}
// 단어 정의 추가
addDef(newDef : string) {
if(typeof this.def === 'string') {
this.def = [this.def, newDef]
} else {
this.def = [...this.def, newDef];
}
}
// 단어 정의 수정
updateDef(oldDef : string, newDef: string) {
if(typeof this.def === 'string') {
if(oldDef === this.def) this.def = newDef
} else {
this.def.filter(val => val !== oldDef);
this.def.push(newDef);
}
}
}
/** 출력 */
const kimchi = new Word("kimchi", "한국의 음식");
const tang = new Word("연근 갈비탕", "중국의 음식");
const sushi = new Word("스시", "일본의 음식");
kimchi.addDef("고춧가루로 배추를 버무려 숙성 및 발효시킨 음식")
kimchi.toString(); // kimchi: 한국의 음식,고춧가루로 배추를 버무려 숙성 및 발효시킨 음식
tang.toString() // 연근 갈비탕: 중국의 음식
sushi.updateDef("일본의 음식", "밥을 뭉쳐놓고 그 위에 재료를 얹어낸 음식");
sushi.toString(); // 스시: 밥을 뭉쳐놓고 그 위에 재료를 얹어낸 음식
const dict = new Dict();
dict.add(kimchi);
dict.add(tang);
dict.add(sushi);
dict.all()
// kimchi: 한국의 음식,고춧가루로 배추를 버무려 숙성 및 발효시킨 음식
// 연근 갈비탕: 중국의 음식
// 스시: 밥을 뭉쳐놓고 그 위에 재료를 얹어낸 음식
dict.find("kimchi");
// (2) ['한국의 음식', '고춧가루로 배추를 버무려 숙성 및 발효시킨 음식']
dict.size()
// 3
dict.update("kimchi", "김치")
dict.all()
// 연근 갈비탕: 중국의 음식
// 스시: 밥을 뭉쳐놓고 그 위에 재료를 얹어낸 음식
// 김치: 한국의 음식,고춧가루로 배추를 버무려 숙성 및 발효시킨 음식
dict.rmv("연근 갈비탕");
dict.all()
// 스시: 밥을 뭉쳐놓고 그 위에 재료를 얹어낸 음식
// 김치: 한국의 음식,고춧가루로 배추를 버무려 숙성 및 발효시킨 음식


Type의 용도 :
1. 특정 값이나 객체의 값에 대한 타입을 지정해줄 수 있다.
2. Type alias(타입에 대한 별명)를 만들어줄 수 있다.
3. 타입을 특정한 값을 가지도록 제한할 수 있다.

타입과 인터페이스의 차이점은 type 키워드는 interface 키워드에 비해서 좀 더 활용할 수 있는 것이 많다는 것이다.(type 키워드는 다양한 목적으로 사용될 수 있음)

즉, interface는 오로지 객체의 형태를 타입스크립트에게 설명해주기 위한 용도로만 사용된다 !

interface는 위와 같이 상속의 개념을 사용할 수 있다 ! (오른쪽은 type을 이용하여 상속한 방법)
⇒ 문법 구조가 객체지향 프로그래밍의 개념을 활용 ⭐️

인터페이스의 또 다른 특징으로는 속성(Property)들을 ‘축적’시킬 수 있다는 것이다.

코드 최적화를 위해, interface와 implements를 사용한다. abstract코드가 js파일에 남게 되기 때문이다.

Type Aliases과 Interfaces의 차이점

Type Aliases과 인터페이스는 매우 유사하며 많은 경우 자유롭게 선택할 수 있습니다. 인터페이스의 거의 모든 기능은 type에서 사용할 수 있으며, 주요 차이점은 type을 다시 열어 새 속성을 추가할 수 없는 것입니다. 반면 인터페이스는 항상 확장 가능합니다.

결론: 대부분의 경우 개인 취향에 따라 선택 가능
(인터페이스 사용을 조금 더 추천)


generic 인자로 전달 가능하다.

```
interface SStorage {
[key:string]:T
}

class LocalStorage {
private storage: SStorage = {}
//Create
set(key:string, value:T){
if(this.storage[key] !== undefined){
return console.log(`${key}가 이미 존재합니다. update 호출 바랍니다.`)
}
this.storage[key] = value
}
//Read
get(key:string):T|void {
if(this.storage[key] === undefined){
return console.log(`${key}가 존재하지 않습니다.`)
}
return this.storage[key]
}
//Update
update(key:string, value:T){
if(this.storage[key] !== undefined){
this.storage[key] = value
} else {
console.log(`${key}가 존재하지 않아 새로 만듭니다.`)
this.storage[key] = value
}
}
//Delete
remove(key:string){
if(this.storage[key] === undefined){
return console.log(`${key}가 존재하지 않습니다.`)
}
delete this.storage[key]
}
clear(){
this.storage = {}
}
}

const stringsStorage = new LocalStorage()

const booleanStorage = new LocalStorage()
```
예외처리 및 CRUD 구현

한번 더 보고 코드 쳐보기.