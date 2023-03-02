const API = "http://localhost:8000/cars";

// ? вызываем для ввода данный в Админ панель
const list = document.querySelector("#car-list");
const addForm = document.querySelector("#add-form");
const carNameInp = document.querySelector("#title");
const priceInp = document.querySelector("#title");
const descriptionInp = document.querySelector("#title");
const imageInp = document.querySelector("#title");

getCars();

async function getCars() {
  const res = await fetch(API);
  const data = await res.json();
  render(data);
}

async function addCar(car) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(car),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getCars();
}

function render(arr) {
  list.innerHTML = "";
  arr.forEach((item) => {
    list.innerHTML += `<div class="card m-5" style="width: 18rem">
    <img
      src="${item.image}"
      class="card-img-top w-100 h-30"
      alt="..."
    />
    <div class="card-body">
    <h5 class="card-title">${item.Carname}</h5>
    <p class="card-text">${item.description.slice(0, 70)}...</p>
    <p class="card-text">$ ${item.price}</p>
    </div>
  </div>`;
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !carNameInp.value.trim() ||
    !priceInp.value.trim() ||
    !descriptionInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }

  const car = {
    Carname: carNameInp.value,
    price: priceInp.value,
    description: descriptionInp.value,
    image: imageInp.value,
  };
  addCar(car);

  carNameInp.value = "";
  priceInp.value = "";
  descriptionInp.value = "";
  imageInp.value = "";
});
