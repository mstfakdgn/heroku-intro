const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const loading = document.querySelector("#p1");
const error = document.querySelector("#p2");
const data = document.querySelector("#p3");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loading.textContent = 'laoding'
  fetch(`http://localhost:3000/weather?address=${search.value}`).then((res) => {
    res
      .json()
      .then((resData) => {
        if (resData.error) {
          error.textContent = resData.error;
        } else {
            console.log(resData.address);
            data.textContent = resData.weather.temprature
            error.textContent = '';
        }
        loading.textContent = ''
      })
      .catch((error) => {
          console.log(error);
        error.textContent = data.error;
        loading.textContent = ''
      });
  });
});
