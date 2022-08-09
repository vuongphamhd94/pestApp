"use strict";
//khai báo danh sách Beerd đã lưu
var BreedArrString = localStorage.getItem("BreedArr");
var BreedArr = BreedArrString === null ? [] : JSON.parse(BreedArrString);
//Hiển thị danh sách breed đã lưu
viewBreed(BreedArr);
// Thêm sự kiện cho nút Submit
const submitBt = document.getElementById("submit-btn");
submitBt.addEventListener("click", addBreed);
//Hàm thêm danh sách Breed từ thông tin người dùng nhập
function addBreed() {
  // Lấy thông tin người dùng nhập
  var data = {
    breed: document.getElementById("input-breed").value,
    type: document.getElementById("input-type").value,
  };
  // Kiểm tra thông tin người dùng nhập và thêm vào danh sach
  if (data.breed === "") {
    alert("Kiểm tra lại thông tin Breed!");
  } else if (data.type === "Select Type") {
    alert("Kiểm tra lại thông tin Type");
  } else if (checkBreed(data)) {
    alert("Breed đã tồn tại");
  } else {
    BreedArr.unshift(data);
    localStorage.setItem("BreedArr", JSON.stringify(BreedArr));
    //xoá form
    document.getElementById("input-breed").value = "";
    document.getElementById("input-type").value = "Select Type";
    viewBreed(BreedArr);
  }
  // Hàm kiểm tra breed đã tồn tại hay chưa
  function checkBreed(data) {
    for (let i = 0; i < BreedArr.length; i++) {
      if (data.breed === BreedArr[i].breed && data.type === BreedArr[i].type) {
        return true;
      }
    }
  }
}
//hàm hiển thị danh sách breed
function viewBreed(arr) {
  const tbody = document.getElementById("tbody");
  if (arr.lenght === 0) {
    tbody.innerHTML = "";
  } else {
    var table = "";
    for (let i = 0; i < arr.length; i++) {
      table += `<tr>
                    <td>${i}</td>
                    <td>${arr[i].breed}</td>
                    <td>${arr[i].type}</td>
                    <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${i}');">Delete</button></td>
                 </tr>`;
    }
    tbody.innerHTML = table;
  }
}
// Hàm xoá Breed.
var deleteBreed = (stt) => {
  if (confirm("xoá thông tin Breed: " + BreedArr[stt].breed + "?")) {
    BreedArr.splice(stt, 1);
    localStorage.setItem("BreedArr", JSON.stringify(BreedArr));
    viewBreed(BreedArr);
  }
};
