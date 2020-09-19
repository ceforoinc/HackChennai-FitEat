function calNeeded(e) {
    e.preventDefault();
    let weight = parseInt(document.getElementById("weight").value);
    let height = parseInt(document.getElementById("height").value);
    let age = parseInt(document.getElementById("age").value);

    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;

    let exercise = document.getElementById('exercise');
    let exval = parseInt(exercise.value)
    let goalweight = parseInt(document.getElementById("goalWeight").value);
    let goaltime = parseInt(document.getElementById("days").value);

    let diff = weight - goalweight;
    let diffweek = diff / goaltime;
    let calday = 1000 * diffweek;
    let c = 0;
    switch (exval) {
        case 1: c = bmr * 1.2;
            break;
        case 2: c = bmr * 1.375;
            break;
        case 3: c = bmr * 1.55;
            break;
        case 4: c = bmr * 1.725;
            break;
        case 5: c = bmr * 1.9;
            break;
    }
    let finalCalories = c - calday;
    finalCalories = finalCalories.toFixed(2);
    postCalories(height, weight, finalCalories, age);
    location.href = 'results.html'

}

async function postCalories(height, weight, finalCalories, age) {

    const url = 'http://localhost:5000/api/v1/fitness';
    const data = {
        height: height,
        weight: weight,
        finalCalories: finalCalories,
        age: age
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const bla = await res.json();
    console.log(bla);
}
const form = document.getElementById('get-results-form');

form.addEventListener('submit', calNeeded);