"use strict";
// Thêm animation khi người dùng click vào sidebar
var sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function () {
  sidebar.classList = "";
});
var content = document.getElementById("content");
content.addEventListener("click", function () {
  sidebar.classList = "active";
});
// Danh sach thong tin thu cung
var petArrString = localStorage.getItem("petArr");
var petArr = petArrString === null ? [] : JSON.parse(petArrString);
// Danh sach breed
var BreedArrString = localStorage.getItem("BreedArr");
var BreedArr = BreedArrString === null ? [] : JSON.parse(BreedArrString);
// Hàm thêm thông tin pet
function addData() {
  // lấy dữ liệu người dùng nhập vào
  var d = new Date();
  const addData = {
    id: document.getElementById("input-id").value,
    name: document.getElementById("input-name").value,
    age: document.getElementById("input-age").value,
    type: document.getElementById("input-type").value,
    weight: document.getElementById("input-weight").value,
    leng: document.getElementById("input-length").value,
    color: document.getElementById("input-color-1").value,
    breed: document.getElementById("input-breed").value,
    vaccinated: document.getElementById("input-vaccinated").checked,
    dewormed: document.getElementById("input-dewormed").checked,
    sterilized: document.getElementById("input-sterilized").checked,
    time: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
  };
  //kiểm tra thông tin
  if (addData.id === "") {
    alert("chưa nhập ID!");
  } else if (checkId()) {
    alert("ID đã tồn tại");
  } else if (addData.name === "") {
    alert("Chưa nhập thông tin Pet Name!");
  } else if (addData.age <= 0) {
    alert("Age phải lớn hơn 0!");
  } else if (addData.type === "Select Type") {
    alert("Chưa nhập thông tin Type!");
  } else if (addData.weight <= 0) {
    alert("Weight phải lớn hơn 0!");
  } else if (addData.leng <= 0) {
    alert("Lenght phải lớn hơn 0!");
  } else if (addData.breed === "Select Breed") {
    alert("Chưa nhập thông tin Breed!");
  } else {
    petArr.unshift(addData);
    //Đặt lại thông tin form
    document.getElementById("input-id").value = "";
    document.getElementById("input-name").value = "";
    document.getElementById("input-age").value = "";
    document.getElementById("input-type").value = "Select Type";
    document.getElementById("input-weight").value = "";
    document.getElementById("input-length").value = "";
    document.getElementById("input-color-1").value = "#000000";
    document.getElementById("input-breed").value = "Select Breed";
    document.getElementById("input-vaccinated").checked = false;
    document.getElementById("input-dewormed").checked = false;
    document.getElementById("input-sterilized").checked = false;
  }
  //Lưu lại danh sach thông tin pet
  localStorage.setItem("petArr", JSON.stringify(petArr));
  // Hiển thị lại danh sách pet mới
  viewData(petArr);
  // Hàm kiểm tra ID
  function checkId() {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === addData.id) {
        return true;
      }
    }
  }
}

//Hàm hiển thị danh sách pet
function viewData(arr) {
  if (arr.length === 0) {
    document.getElementById("tbody").innerHTML = "";
  } else {
    var table = "";
    for (let i = 0; i < arr.length; i++) {
      table += `<tr>
        <th scope="row">${arr[i].id}</th>
        <td>${arr[i].name}</td>
        <td>${arr[i].age}</td>
        <td>${arr[i].type}</td>
        <td>${arr[i].weight} kg</td>
        <td>${arr[i].leng} cm</td>
        <td>${arr[i].breed}</td>
        <td>
            <i class="bi bi-square-fill" style="color: ${arr[i].color}"></i>
        </td>
        <td>${checked(arr[i].vaccinated)}</td>
        <td>${checked(arr[i].dewormed)}</td>
        <td>${checked(arr[i].sterilized)}</td>
        <td>${arr[i].time}</td>
        <td><button type="button" class="btn btn-danger" onclick="deletePet('${
          arr[i].id
        }');">Delete</button>
        </td>
    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
// Hàm checked
function checked(bt) {
  if (bt) {
    return '<i class="bi bi-check-circle-fill"></i>';
  } else {
    return '<i class="bi bi-x-circle-fill"></i>';
  }
}
// Hàm lấy thông tin list breed
function breed_List() {
  var BreedArrString = localStorage.getItem("BreedArr");
  var BreedArr = BreedArrString === null ? [] : JSON.parse(BreedArrString);
  const breed = document.getElementById("input-breed");
  const type = document.getElementById("input-type").value;
  var select = "<option>Select Breed</option>";
  for (let i = 0; i < BreedArr.length; i++) {
    if (BreedArr[i].type === type) {
      select += `<option>${BreedArr[i].breed}</option>`;
    }
  }
  breed.innerHTML = select;
}
// Hàm xoá pet
function deletePet(id) {
  if (confirm("Bạn có đồng ý xoá Pet có ID: " + id + " ?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === id) {
        petArr.splice(i, 1);
        localStorage.setItem("petArr", JSON.stringify(petArr));
        viewData(petArr);
      }
    }
  }
}
// Hàm lọc danh sách pet khoẻ mạnh
function healthyPet() {
  const arr = [];
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
      arr.push(petArr[i]);
    }
  }
  viewData(arr);
}
