"use strict";
// Thêm event submit
const submit = document.getElementById("submit-btn");
submit.addEventListener("click", addData);
// Thêm sự kiện khi chọn Breed
const type = document.getElementById("input-type");
type.addEventListener("click", breed_List);
//Hiển thị danh sách thú cưng
viewData(petArr);
//Them tính năng lọc danh sách pet khoẻ mạnh
const healthyBtn = document.getElementById("healthy-btn");
healthyBtn.addEventListener("click", function () {
  if (healthyBtn.textContent === "Show Healthy Pet") {
    healthyBtn.textContent = "Show all pet";
    healthyPet();
  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    viewData(petArr);
  }
});
