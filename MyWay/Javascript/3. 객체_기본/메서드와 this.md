### 메서드 만들기

객체 `user`에게 인사할 수 있는 능력을 부여해 줍시다.

```javascript
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("안녕하세요!");
};

user.sayHi(); // 안녕하세요!
```



메서드는 아래와 같이 이미 정의된 함수를 이용해서 만들 수도 있습니다.

```javascript
let user = {
  // ...
};

// 함수 선언
function sayHi() {
  alert("안녕하세요!");
};

// 선언된 함수를 메서드로 등록
user.sayHi = sayHi;

user.sayHi(); // 안녕하세요!
```



### 메서드 단축 구문

객체 리터럴 안에 메서드를 선언할 때 사용할 수 있는 단축 문법을 소개해 드리겠습니다.

```javascript
// 아래 두 객체는 동일하게 동작합니다.

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 단축 구문을 사용하니 더 깔끔해 보이네요.
user = {
  sayHi() { // "sayHi: function()"과 동일합니다.
    alert("Hello");
  }
};
```



### 메서드와 this

메서드는 객체에 저장된 정보에 접근할 수 있어야 제 역할을 할 수 있습니다. 모든 메서드가 그런 건 아니지만, 대부분의 메서드가 객체 프로퍼티의 값을 활용합니다.

**메서드 내부에서 `this` 키워드를 사용하면 객체에 접근할 수 있습니다.**

예시:

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // 'this'는 '현재 객체'를 나타냅니다.
    alert(this.name);
  }

};

user.sayHi(); // John
```

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert( user.name ); // Error: Cannot read property 'name' of null
  }

};


let admin = user;
user = null; // user를 null로 덮어씁니다.

admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.
```

`alert` 함수가 `user.name` 대신 `this.name`을 인수로 받았다면 에러가 발생하지 않았을 겁니다.

`this` 값은 런타임에 결정됩니다. 컨텍스트에 따라 달라지죠.

동일한 함수라도 다른 객체에서 호출했다면 'this’가 참조하는 값이 달라집니다.

```javascript
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작함)
```

규칙은 간단합니다. `obj.f()`를 호출했다면 `this`는 `f`를 호출하는 동안의 `obj`입니다. 위 예시에선 `obj`가 `user`나 `admin`을 참조하겠죠.

객체가 없어도 함수를 호출할 수 있습니다.

```javascript
function sayHi() {
  alert(this);
}

sayHi(); // undefined
// 그런데 엄격 모드가 아닐 때는 `this`가 *전역 객체*를 참조합니다. 브라우저 환경에선 `window`라는 전역 객체를 참조하죠
```



### this가 없는 화살표 함수

아래 예시에서 함수 `arrow()`의 `this`는 외부 함수 `user.sayHi()`의 `this`가 됩니다.

```javascript
let user = {
  firstName: "보라",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // 보라
```

별개의 `this`가 만들어지는 건 원하지 않고, 외부 컨텍스트에 있는 `this`를 이용하고 싶은 경우 화살표 함수가 유용합니다



 이런 개념을 'bound `this`'라고 합니다.



### 요약

- 객체 프로퍼티에 저장된 함수를 '메서드’라고 부릅니다.
- `object.doSomthing()`은 객체를 '행동’할 수 있게 해줍니다.
- 메서드는 `this`로 객체를 참조합니다.

`this` 값은 런타임에 결정됩니다.

- 함수를 선언할 때 `this`를 사용할 수 있습니다. 다만, 함수가 호출되기 전까지 `this`엔 값이 할당되지 않습니다.
- 함수를 복사해 객체 간 전달할 수 있습니다.
- 함수를 객체 프로퍼티에 저장해 `object.method()`같이 ‘메서드’ 형태로 호출하면 `this`는 `object`를 참조합니다.

화살표 함수는 자신만의 `this`를 가지지 않는다는 점에서 독특합니다. 화살표 함수 안에서 `this`를 사용하면, 외부에서 `this` 값을 가져옵니다.