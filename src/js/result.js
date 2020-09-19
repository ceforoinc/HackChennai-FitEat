const name = document.getElementById("dishName");

function callApi() {
  //   console.log(name.value);
  const search =
    "https://trackapi.nutritionix.com/v2/search/instant?query=" + name.value;

  //   const api_url2 =
  //     "https://trackapi.nutritionix.com/v2/chicken/nutrients?query=chicken";
  const api_url = search;

  getapi(api_url);
}

// api url

// Defining async function
async function getapi(url) {
  const postApiUrl = "https://trackapi.nutritionix.com/v2/natural/nutrients";

  // Storing response
  const response = await fetch(url, {
    headers: {
      "x-app-id": "bfb78a61",
      "x-app-key": "fcf812160a8923b20ad6ffe8c7294e67",
    },
  });

  // Storing data in form of JSON
  const data = await response.json();

  //   console.log(data);

  for (let i = 0; i < 5; i++) {
    let itemName = data.common[i].food_name;

    if (itemName.includes(name.value)) {
      const res = await fetch(postApiUrl, {
        method: "POST",
        headers: {
          "x-app-id": "bfb78a61",
          "x-app-key": "fcf812160a8923b20ad6ffe8c7294e67",
          "Content-type": "application/json",
        },
        body: JSON.stringify(itemName),
      });
      console.log(res);
    }
  }

  //   console.log(data.hits[0].fields.nf_calories);
  //   let calorie = data.hits[0].fields.nf_calories;
  //   console.log(calorie);

  // if (response) {
  //   hideloader();
  // }
  // show(data);
}
// Calling that async function
// getapi(api_url);

dishName.addEventListener("keyup", callApi);
