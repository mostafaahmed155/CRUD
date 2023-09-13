const title = document.getElementById("title");
const total = document.getElementById("total");
const discount = document.getElementById("discount");
const ads = document.getElementById("ads");
const taxes = document.getElementById("taxes");
const price = document.getElementById("price");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
// const input = document.querySelectorAll("input");
// const nightmode = document.querySelector(".circle");
let search = document.getElementById("search");
let searchmood = "title";
let mood = "create";
let assistant; //we make it to be global to storage (i) to be use in anther place out of her functions

//1-fun to get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#003892";
  }
}
//2-fun to create product
let data;
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}
submit.addEventListener("click", () => {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //5-fun to count and create many products
  if (title.value != ''&& price.value!=''&& category.value!='' && count.value <100){
    if (mood === "create") {
      // this statment to up date if mood is 'create' he will create a new product if update will update data
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          data.push(newpro);
        }
      } else {
        data.push(newpro);
      }
    } else {
      data[assistant] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clear();
  }
  
  localStorage.setItem("product", JSON.stringify(data));
  
  showdata();
});

//3-clear inputs
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  total.innerHTML = "";
  discount.value = "";
  count.value = "";
  category.value = "";
}
//4-fun to read
function showdata() {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `
      <tr>
        <td>${i+1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick=" updateProduct(${i}) " id="update">update</button></td>
        <td><button onclick=" deleteProduct(${i}) " id="delete">delete</button></td>
      </tr>
      `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btn = document.getElementById("deleteall");
  if (data.length > 0) {
    btn.innerHTML = `
        <button onclick='deleteall()'>Delete All(${data.length})</button>
        `;
  } else {
    btn.innerHTML = "";
  }
  getTotal();
}
showdata();

//6-fun to delete on product
function deleteProduct(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data);
  showdata();
}
//7-fun to update
function updateProduct(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  category.value = data[i].category;
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  assistant = i; //i make assistant == i to use i in anther place in the code with i values
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}
//8-fun to search products
function getsearch(id) {
  if (id == "searchtitle") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }
  search.placeholder = "search by " + searchmood;
  search.focus();
  search.value = "";
  showdata();
}

function searchdata(value) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    if (searchmood == "title") {
      if (data[i].title.includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick=" updateProduct(${i}) " id="update">update</button></td>
        <td><button onclick=" deleteProduct(${i}) " id="delete">delete</button></td>
      </tr>
      `;
      }
    } else {
      if (data[i].category.includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick=" updateProduct(${i}) " id="update">update</button></td>
        <td><button onclick=" deleteProduct(${i}) " id="delete">delete</button></td>
      </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//9-fun to delete all
function deleteall() {
  localStorage.clear();
  data.splice(0);
  showdata();
}