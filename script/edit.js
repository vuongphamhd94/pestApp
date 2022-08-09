"use strict";
// Hiển thị danh sách thú cưng
viewPet(petArr);

//Hàm Edit
function edit(index) {
  const container_form = document.getElementById("container-form");
  const submitBt = document.getElementById("submit-btn");
  const id = document.getElementById("input-id");
  const name = document.getElementById("input-name");
  const age = document.getElementById("input-age");
  const type = document.getElementById("input-type");
  const weight = document.getElementById("input-weight");
  const length = document.getElementById("input-length");
  const color = document.getElementById("input-color-1");
  const breed = document.getElementById("input-breed");
  const vaccinated = document.getElementById("input-vaccinated");
  const dewormed = document.getElementById("input-dewormed");
  const sterilized = document.getElementById("input-sterilized");
  //hien thi form
  container_form.removeAttribute("class", "hide");
  // ghi thong tin pet vao form
  id.value = petArr[index].id;
  name.value = petArr[index].name;
  age.value = petArr[index].age;
  type.value = petArr[index].type;
  weight.value = petArr[index].weight;
  length.value = petArr[index].leng;
  color.value = petArr[index].color;
  // danh sach breed va dan gia tri breed vao form
  breed_List();
  //truong hop breed khong con trong danh sach da luu-bi xoa
  if (!checkBreed(petArr[index].type, petArr[index].breed)) {
    var breedValue = document.createElement("option");
    breedValue.textContent = petArr[index].breed;
    breed.appendChild(breedValue);
  }
  breed.value = petArr[index].breed;
  vaccinated.checked = petArr[index].vaccinated;
  dewormed.checked = petArr[index].dewormed;
  sterilized.checked = petArr[index].sterilized;
  //ham kiem tra breed co trong danh sach
  function checkBreed(type, breed) {
    for (let i = 0; i < BreedArr.length; i++) {
      if (type === BreedArr[i].type && breed === BreedArr[i].breed) {
        return true;
      }
    }
  }
  // dan su kien lay danh sach breed khi chon type
  type.addEventListener("click", breed_List);
  //su kien khi click submit
  submitBt.addEventListener("click", submitEdit);
}
// Ham hien thi danh sach pet
function viewPet(arr) {
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
        <td><button style="background-color: orange; color:black; border-color:orange" type="button" class="btn btn-danger" onclick="edit('${i}');">Edit</button>
        </td>
    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
//ham khi click submit
function submitEdit(index) {
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
  if (!(addData.age >= 1 && addData.age <= 15)) {
    alert("Age must be between 1 and 15!");
  } else if (!(addData.weight >= 1 && addData.weight <= 15)) {
    alert("Weight must be between 1 and 15!");
  } else if (!(addData.leng >= 1 && addData.leng <= 100)) {
    alert("Length must be between 1 and 100!");
  } else if (addData.type == "Select Type") {
    alert("Please select Type!");
  } else if (addData.breed == "Select Breed") {
    alert("Please select Breed!");
  } else if (addData.name == "") {
    alert("chưa nhập Pet Name");
  } else {
    //thay doi thong tin
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id == addData.id) {
        petArr.splice(i, 1, addData);
      }
    }

    //Lưu lại danh sach pet vào localStorage
    localStorage.setItem("petArr", JSON.stringify(petArr));
    viewPet(petArr);

    const container_form = document.getElementById("container-form");
    container_form.setAttribute(
      "class",
      "row justify-content-center align-items-center mt-4 hide"
    );
  }
}
