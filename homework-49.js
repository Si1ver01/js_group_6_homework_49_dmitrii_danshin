class CustomPromise {
  constructor(callback) {
    this.state = "pending";
    this.callbackFunctionThen = [];
    this.callbackFunctionCatch = [];
    this.value = null;

    const resolve = value => {
      if ((this.state === "pending")) {
        this.state = "resolved";
        this.value = value;
        for (const iterator of this.callbackFunctionThen) {
          this.value = iterator(this.value);
        }
      }
    };

    const reject = value => {
      if ((this.state === "pending")) {
        this.state = "rejected";
        this.value = value;
        for (const iterator of this.callbackFunctionCatch) {
          this.value = iterator(this.value);
        }
      }
    };

    callback(resolve, reject);
  }

  then = callback => {
    this.callbackFunctionThen.push(callback);
  };

  catch = callback => {
    this.callbackFunctionCatch.push(callback);
  };
}

let test = new CustomPromise(function(resolve, reject) {
  console.log("1. Запускаю таймер на 3 сек");
  setTimeout(() => {
    console.log("2. Я подождал 3 cекунды и отдаю значение 5 в Валью");
    console.log("3. Я Вызываю резолв и отдаю в него цифру 5");
    resolve(5);
    reject("error");
  }, 3000);
});

test.then(function(response) {
  console.log("4. Пытаюсь запушить функкцию и помотреть когда отработает");
  response++;
  console.log("И получаю текущее значение", response);
  return response;
});
test.then(response => {
  console.log("5. Пытаюсь запушить функкцию и помотреть когда отработает");
  response++;
  console.log("И получаю текущее значение", response);
  return response;
});
test.catch(response => {
  console.log("Произошла ошибка");
  response = new Error("Произошла ошибка");
});
