### 요약

- 생성자 함수(짧게 줄여서 생성자)는 일반 함수입니다. 다만, 일반 함수와 구분하기 위해 함수 이름 첫 글자를 대문자로 씁니다.
- 생성자 함수는 반드시 `new` 연산자와 함께 호출해야 합니다. `new`와 함께 호출하면 내부에서 `this`가 암시적으로 만들어지고, 마지막엔 `this`가 반환됩니다.

생성자 함수는 유사한 객체를 여러 개 만들 때 유용합니다.

자바스크립트는 언어 차원에서 다양한 생성자 함수를 제공합니다. 날짜를 나타내는 데 쓰이는 `Date`, 집합(set)을 나타내는 데 쓰이는 `Set` 등의 내장 객체는 이런 생성자 함수를 이용해 만들 수 있습니다. 자세한 내용은 다시 살펴보도록 하겠습니다.



### 과제

#### 1. 함수 두 개로 동일한 객체 만들기

중요도: 2

`new A()==new B()`가 성립 가능한 함수 `A`와 `B`를 만드는 게 가능할까요?

```javascript
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

만약 가능하다면, 실행 가능한 예시를 작성해 보세요.

```javascript
let obj = {};
function A() {return obj;}
function B() {return obj;}

alert(new A() == new B());
```



#### 2. 계산기 만들기

중요도: 5

아래와 같은 세 개의 메서드를 가진 생성자 함수, `Calculator`를 만들어보세요.

- `read()` – `prompt` 함수를 이용해 사용자로부터 값 두 개를 받고, 이를 객체 프로퍼티에 저장합니다.
- `sum()` – 프로퍼티에 저장된 값 두 개를 더한 후 반환합니다.
- `mul()` – 프로퍼티에 저장된 값 두 개를 곱한 후 반환합니다.

예시:

```javascript
function Calculator() {
    this.read = function() {
        this.a = +prompt('a?', 0);
        this.b = +prompt('b?', 0);
    }
    this.sum = function() {
        return this.a + this.b;
    };
    this.mul = function() {
        return this.a * this.b;
    }
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```



#### 3. 누산기 만들기

중요도: 5

생성자 함수 `Accumulator(startingValue)`를 만들어 보세요.

`Accumulator(startingValue)`를 이용해 만드는 객체는 아래와 같은 요건을 충족해야 합니다.

- 프로퍼티 `value`에 현재 값(current value)을 저장합니다. 최초 호출 시엔 생성자 함수의 인수, `startingValue`에서 시작값(starting value)을 받아옵니다.
- 메서드 `read()`에선 `prompt` 함수를 사용해 사용자로부터 숫자를 받아오고, 받은 숫자를 `value`에 더해줍니다.

프로퍼티 `value`엔 `startingValue`와 사용자가 입력한 모든 값의 총합이 더해져 저장됩니다.

데모를 위한 코드는 다음과 같습니다.

```javascript
function Accumlator(startingValue) {
    this.value = startingValue;
    this.read = function() {
        this.value += +prompt('더할 값은?', 0);
    }
}

let accumulator = new Accumulator(1); // 최초값: 1

accumulator.read(); // 사용자가 입력한 값을 더해줌
accumulator.read(); // 사용자가 입력한 값을 더해줌

alert(accumulator.value); // 최초값과 사용자가 입력한 모든 값을 더해 출력함
```