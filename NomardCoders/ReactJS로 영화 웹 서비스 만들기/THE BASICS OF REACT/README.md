#2
암기할 필요 없다. 이해하기
리액트를 import했기 때문에 createElement function을 가진 리액트 object에 접근 가능
const span 그러나 createElement(“span”) 은 반드시 생성하고자 하는 HTML 태그와 똑같아야함

React JS - 어플리케이션이 아주 인터랙티브하도록 만들어주는 library. 엔진과 같다.
React-dom - library 또는 package. 모든 react element들을 HTML body에 둘 수 있도록 해줌.
ReactDOM.render() - render의 의미는 react element를 가지고 HTML로 만들어 배치한다는 것. 즉, 사용자에게 보여준다는 의미
ReactDOM.render(span, span이 가야할 위치)
-> 그래서 보통 body에 id=“root” 만들어서 span을 root 안에 두라고 함

React.createElement("span", {span의 property}, “span의 내용”)
-> property는 class name, id도 가능 style도 가능
-> 참고만 하고 외우지 말기. 이렇게 쓸 일 없음

바닐라JS는 HTML -> JS 순서
리액트는 JS -> HTML 순서

JS가 element를 생성하고 React JS가 그것을 HTML로 번역하는 것
React JS는 업데이트 해야 하는 HTML을 업데이트 할 수 있음


#5
1. Vanilla JavaScript
Vanilla JavaScript에서는 DOM 변경을 직접 처리합니다. 즉, 필요한 DOM 요소를 직접 선택하고, 요소의 속성을 변경하거나 새로운 요소를 추가하거나 기존 요소를 제거하는 등의 작업을 직접 수행합니다.
DOM 변경이 발생하면, 브라우저는 변경된 DOM 트리를 다시 계산하고, 렌더 트리를 다시 생성한 후 화면에 그립니다. 이 과정은 비용이 많이 드는 연산으로, 자주 발생하게 되면 성능을 저하시킬 수 있습니다.

2. ReactJS
ReactJS는 DOM 변경을 처리하기 위해 가상 DOM(Virtual DOM)이라는 개념을 도입합니다. ReactJS에서는 먼저 메모리에 가상 DOM 트리를 생성합니다. 이 트리는 실제 DOM 트리의 사본으로서, 실제 DOM 트리와 별도로 존재합니다.
ReactJS는 상태 변경이 발생할 때마다 새로운 가상 DOM 트리를 생성하고, 이전의 가상 DOM 트리와 비교하여 변경된 부분을 파악합니다. 이렇게 파악된 변경 사항만 실제 DOM에 반영하는 방식을 사용합니다. 이 과정을 '재조정(Reconciliation)' 또는 'Diffing'이라고 부릅니다.
가상 DOM을 사용함으로써, 변경이 필요한 최소한의 요소만 실제 DOM에 반영되기 때문에 불필요한 연산을 줄이고 성능을 향상시킬 수 있습니다.

따라서, ReactJS는 복잡한 UI 업데이트를 효과적으로 처리할 수 있으며, 이를 통해 웹의 응답성을 향상시키고 사용자 경험을 개선할 수 있습니다