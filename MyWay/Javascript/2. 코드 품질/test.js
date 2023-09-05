describe("pow", function () {
  before(() => console.log("테스트를 시작합니다 - 테스트가 시작되기 전"));
  after(() => console.log("테스트를 종료합니다 - 테스트가 종료된 후"));

  beforeEach(() => console.log("단일 테스트를 시작합니다 - 각 테스트 시작 전"));
  afterEach(() => console.log("단일 테스트를 종료합니다 - 각 테스트 종료 후"));


  it("2를 세 번 곱하면 8입니다.", function () {
    assert.equal(pow(2, 3), 8);
  });

  it("3을 네 번 곱하면 81입니다.", function () {
    assert.equal(pow(3, 4), 81);
  });

  it("n이 음수일 때 결과는 NaN입니다.", function() {
    assert.isNaN(pow(2, -1));
  });

  it("n이 정수가 아닐 때 결과는 NaN입니다.", function() {
    assert.isNaN(pow(2, 1.5));
  });

  // 함수로 만들어서 반복문을 돌린다.
  describe("x를 세 번 곱합니다.", function () {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x}을/를 세 번 곱하면 ${expected}입니다.`, function () {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }
  });

  // 따로 각각 나누어서 해야 좋은 테스트이며 only가 가능하다.
  describe("주어진 숫자의 n 제곱", function() {
    it("5를 1 제곱하면 5", function() {
      assert.equal(pow(5, 1), 5);
    });
  
    // Mocha는 아래 블록만 실행합니다.
    it("5를 2 제곱하면 25", function() {
      assert.equal(pow(5, 2), 25);
    });
  
    it("5를 3 제곱하면 125", function() {
      assert.equal(pow(5, 3), 125);
    });
  });



});