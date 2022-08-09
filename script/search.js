"use strict";
// dan sự kiên khị click find
const findBt = document.getElementById("find-btn");
findBt.addEventListener("click", find);
// danh sach breed select
let breed = document.getElementById("input-breed");
let breedSelect = "<option>Select Breed</option>";
for (let i = 0; i < BreedArr.length; i++) {
  breedSelect += "<option>" + BreedArr[i].breed + "</option>";
}
breed.innerHTML = breedSelect;
// Hàm find
function find() {
  // Danh sach thong tin thu cung
  let petArrString = localStorage.getItem("petArr");
  let petArr = petArrString === null ? [] : JSON.parse(petArrString);
  // Thong tin nguoi dung nhap
  let id = document.getElementById("input-id").value;
  let name = document.getElementById("input-name").value;
  let type = document.getElementById("input-type").value;
  let breed = document.getElementById("input-breed").value;
  let vaccinated = document.getElementById("input-vaccinated").checked;
  let dewormed = document.getElementById("input-dewormed").checked;
  let sterilized = document.getElementById("input-sterilized").checked;
  // loc thong tin
  if (
    id !== "" ||
    name !== "" ||
    type !== "Select Type" ||
    breed !== "Select Breed" ||
    vaccinated ||
    dewormed ||
    sterilized
  ) {
    if (id !== "") {
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id.indexOf(id) < 0) {
          petArr.splice(i, 1);
          i--;
        }
      }
    }
    if (name !== "") {
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].name.indexOf(name) < 0) {
          petArr.splice(i, 1);
          i--;
        }
      }
    }
    if (type !== "Select Type") {
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].type !== type) {
          petArr.splice(i, 1);
          i--;
        }
      }
    }
    if (breed !== "Select Breed") {
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].breed !== breed) {
          petArr.splice(i, 1);
          i--;
        }
      }
    }
    if (vaccinated) {
      for (let i = 0; i < petArr.length; i++) {
        if (!petArr[i].vaccinated) {
          petArr.splice(i, 1);
          i--;
        }
      }
    }
    if (dewormed) {
      for (let i = 0; i < petArr.length; i++) {
        if (!petArr[i].dewormed) {
          petArr.splice(i, 1);
          i--;
        }
      }
    }
    if (sterilized) {
      for (let i = 0; i < petArr.length; i++) {
        if (!petArr[i].sterilized) {
          petArr.splice(i, 1);
          i--;
        }
      }
    }
    viewFind(petArr);
  } else {
    alert("Chưa nhập thông tin tìm kiếm");
  }
}
//ham hien thi danh sach find
function viewFind(arr) {
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

    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
