var addData = (ev) => {
  ev.preventDefault();
  let userData = {
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    goalWeight: document.getElementById("goalWeight").value,
    days: document.getElementById("days").value,
  };
  console.log(userData);
};
document.getElementById("btn").addEventListener("click", addData);
