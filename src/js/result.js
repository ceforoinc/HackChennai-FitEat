const name = document.getElementById('dishName');
let final, autocompleteOptions, totalConsumedCalories = [];
function callApi() {
  const search =
    'https://trackapi.nutritionix.com/v2/search/instant?query=' + name.value + '&detailed=true';


  const api_url = search;

  getapi(api_url);
}

async function getCalorieApi(itemName) {
  var searchUrl =
    "https://api.nutritionix.com/v1/search/" +
    itemName +
    "?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=323e3bf5&appKey=d146e0f262f36019ecb7ff30a480cc04";

  // const searchUrl = `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${itemName}`

  let res = await fetch(searchUrl,
    {
      headers: {
        'x-app-id': '323e3bf5',
        'x-app-key': 'd146e0f262f36019ecb7ff30a480cc04',
      }
    });
  let data = await res.json();
  return data.hits[0].fields.nf_calories;
}

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url, {
    headers: {
      'x-app-id': '323e3bf5',
      'x-app-key': 'd146e0f262f36019ecb7ff30a480cc04',
    },
  });


  // Storing data in form of JSON
  const data = await response.json();
  autocompleteOptions = [];

  // console.log(data);

  for (let i = 0; i < 5; i++) {
    let itemName = data.common[i].food_name;

    if (itemName.includes(name.value)) {
      final = itemName;
      autocompleteOptions.push(itemName);

      // Show Dropdown Options 
    }
  }
  // console.log(autocompleteOptions)
  autocomplete(document.getElementById('dishName'), autocompleteOptions);

  // postApi(final);

}

dishName.addEventListener('keyup', callApi);

// Autocomplete code
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener('input', function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement('DIV');
    a.setAttribute('id', this.id + 'autocomplete-list');
    a.setAttribute('class', 'autocomplete-items');
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement('DIV');
        /*make the matching letters bold:*/
        b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener('click', function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName('input')[0].value;
          /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener('keydown', function (e) {
    var x = document.getElementById(this.id + ' autocomplete-list');
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add('autocomplete-active');
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
    var x = document.getElementsByClassName('autocomplete-items');
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener('click', function (e) {
    closeAllLists(e.target);
  });
}

// Code for the Items consumed cart

const addBtn = document.getElementById('add-item-btn');

addBtn.addEventListener('click', addToCart);

async function addToCart() {
  const chosenDish = document.getElementById('dishName');
  const noOfServings = document.getElementById('quantity');

  const itemList = document.getElementById('items-list');
  const item = document.createElement('li');
  item.classList.add('item')
  item.innerHTML = `<p>${chosenDish.value}</p><p>X ${noOfServings.value}</p>`;

  itemList.append(item)


  const cal = await getCalorieApi(chosenDish.value);

  let totcal = document.querySelector('.total-calories');
  let prevCal = parseFloat(totcal.innerText);

  let newCal = prevCal + cal * noOfServings.value;

  newCal = Math.floor(newCal);
  totcal.innerText = newCal;


  chosenDish.value = '';
  noOfServings.value = '';

}

async function getFitnessData() {
  const url = '/api/v1/fitness';

  const res = await fetch(url);

  const data2 = await res.json();

  const reqCalCon = document.getElementById('req-cal-con-tod');
  const finalCalData = data2.data[data2.data.length - 1];
  reqCalCon.innerText = finalCalData.finalCalories;
  let totCalCon = parseFloat(document.getElementById('tot-cal-con-tod').innerText);
  const calToBe = document.getElementById('cal-to-be');

  let calToBeVal = document.getElementById('cal-to-be-val');

  // console.log(finalCalData.finalCalories)
  if (reqCalCon < totCalCon) {
    calToBe.innerText = 'Calories to be burnt';
    calToBeVal.value = totCalCon - parseFloat(reqCalCon);

  }
  else {
    calToBe.innerText = 'Calories to be consumed';
    calToBeVal.value = parseFloat(reqCalCon) - totCalCon;
    // console.log(totCalCon);
  }
}
async function getMealData() {
  const url = '/api/v1/meals';

  const res = await fetch(url);

  const data = await res.json();

  fillDashboardDetails(data.data);
}
function fillDashboardDetails(data) {
  const reqCalCon = document.getElementById('req-cal-con-tod').innerText;
  const calToBe = document.getElementById('cal-to-be');

  let calToBeVal = document.getElementById('cal-to-be-val');

  document.getElementById('tot-cal-con-tod').innerText = data.total;
  let totCalCon = parseFloat(document.getElementById('tot-cal-con-tod').innerText);

  if (reqCalCon < totCalCon) {
    calToBe.innerText = 'Calories to be burnt';
    calToBeVal.innerText = totCalCon - parseFloat(reqCalCon);

  }
  else {
    calToBe.innerText = 'Calories to be consumed';
    calToBeVal.innerText = parseFloat(reqCalCon) - totCalCon;
  }
}

async function postMealData(e) {
  e.preventDefault();
  const postMealsUrl = '/api/v1/meals';
  let meals = [];
  const itemsList = document.querySelectorAll('.item');
  itemsList.forEach((item) => {
    meals.push(item.firstChild.innerText);
  })

  const totalCalories = parseFloat(document.querySelector('.total-calories').innerText);

  const data = {
    mealItems: meals,
    totalCalories: totalCalories
  }

  const res = await fetch(postMealsUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const bla = await res.json();
  console.log(bla);
  itemsList.forEach((item) => {
    item.firstChild.innerText = '';
  })
  itemsList.forEach((item) => {
    item.firstChild.nextSibling.innerText = '';
  })

  location.reload();

}
const form = document.getElementById('form');

form.addEventListener('submit', postMealData);
document.addEventListener('DOMContentLoaded', getFitnessData);
document.addEventListener('DOMContentLoaded', getMealData);
