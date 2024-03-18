let form = document.querySelector("form");
let input = document.querySelector("#inp");
let foodColumn = document.querySelector(".food-column");
let foodInner = document.querySelector(".food-inner");
let foodOverlay = document.querySelector(".food-overlay")
let foodRect = document.querySelector(".food-rect")
let details = document.querySelector(".details");
let close = document.querySelector("span.close");

form.addEventListener('submit', function (e) {
    e.preventDefault();
    getApi()
})

async function getApi() {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`,
        res = await fetch(url),
        data = await res.json(),
        html = "";
        if (input.value === "") {
            html += `<h1 class="error">Required The Meals</h1>`
        } else if (data.meals) {
            data.meals.map(el => {
                html+= `
                    <div class="col-lg-4 col-md-6" data-id=${el.idMeal}>
                        <div class="food-inner">
                            <img src="${el.strMealThumb}" alt="not found" class="img-fluid">
                            <div class="food-details">
                                <h1>${el.strMeal}</h1>
                                <h3>${el.strArea}</h3>
                                <button class="details">Read More</button>
                            </div>
                        </div>
                    </div>
                `
            })
        } else{
            html += `<h1 class="error">We didn't find any meals</h1>`
        }
    foodColumn.innerHTML = html;
    input.value = "";
}

foodColumn.onclick = async function (e) {
    if (e.target.classList.contains("details")) {
        let targetId = e.target.parentElement.parentElement.parentElement.dataset.id;
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${targetId}`,
        res = await fetch(url),
        data = await res.json(),
        html = "";
        html = `
            <span class="close">&times;</span>
            <img src="${data.meals[0].strMealThumb}" alt="">
            <h1>${data.meals[0].strMeal}</h1>
            <h3>${data.meals[0].strArea}</h3>
            <p>${data.meals[0].strInstructions}</p>
            <a href="${data.meals[0].strYoutube}" class="video" target="_blank">watch video</a>
        `
        foodOverlay.classList.add("show")
        foodRect.classList.add("show")
        foodRect.innerHTML = html;
    }
}

window.onclick = function (e) {
    if (e.target.classList.contains("close") || e.target == foodOverlay) {
        foodOverlay.classList.remove("show")
        foodRect.classList.remove("show")
    }
}

window.onkeydown = function (e) {
    if (e.key === "Escape" || e.keyCode === 27) {
        foodOverlay.classList.remove("show")
        foodRect.classList.remove("show")
    }
}