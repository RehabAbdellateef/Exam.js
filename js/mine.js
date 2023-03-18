$(document).ready(() => {
    nameSearch("").then(() => {
        $(".loading").fadeOut(500)
    })
})

function close(){
    let left = $(".sidenav .left-side").outerWidth();
    $(".sidenav").animate({left: -left}, 500);

    $(".button").removeClass("fa-xmark");
    $(".button").addClass("fa-bars");

    $(".navlinks li").animate({top: 200}, 500);
}
function open(){
    $(".sidenav").animate({left: 0}, 500);

    $(".button").addClass("fa-xmark");
    $(".button").removeClass("fa-bars");

    for (let i = 0; i < 5; i++) {
        $(".navlinks li").eq(i).animate({top: 0},(i + 5)*100)
    }
    // $(".navlinks li").eq(0).animate({top: 0}, 500)
    // $(".navlinks li").eq(1).animate({top: 0}, 600)
    // $(".navlinks li").eq(2).animate({top: 0}, 700)
    // $(".navlinks li").eq(3).animate({top: 0}, 800)
    // $(".navlinks li").eq(4).animate({top: 0}, 900)
}
close();
$(".sidenav .button").click(function(){
    if($(".sidenav").css("left")=="0px")  close();
    else open();
})


// ------------------------------------------------------------------------------------------------------------------------------------
async function getCate() {
    close();
    $(".loadind-in").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    displayCategory(response.categories);
    $(".loadind-in").fadeOut(300);
}
function displayCategory(data) {
    let store="";
    for (let i = 0; i < data.length; i++) {
        store+= `<div class="col-md-3">
                    <div class="box position-relative overflow-hidden rounded-2" onclick="getCateMeal('${data[i].strCategory}')">
                        <img class="w-100" src="${data[i].strCategoryThumb}" alt="">
                        <div class="meal-name position-absolute  start-0 end-0 text-black p-3 text-center">
                            <h3>${data[i].strCategory}</h3>
                            <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("displayArray").innerHTML = store;
}
async function getCateMeal(category) {
    $(".loadind-in").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeal(response.meals.slice(0, 20));
    $(".loadind-in").fadeOut(300);
}

async function getArea() {
    close();
    $(".loadind-in").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    displayArea(response.meals);
    $(".loadind-in").fadeOut(300);
}
function displayArea(data) {
    let store="";
    for (let i = 0; i < data.length; i++) {
        store+= `<div class="col-md-3">
                    <div class="box position-relative overflow-hidden rounded-2 text-center" onclick="getAreaMeal('${data[i].strArea}')">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                    </div>
                </div>`
    }
    document.getElementById("displayArray").innerHTML = store;
}
async function getAreaMeal(area) {
    $(".loadind-in").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    displayMeal(response.meals.slice(0, 20));
    $(".loadind-in").fadeOut(300);
}

async function getIngre() {
    close();
    $(".loadind-in").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    displayIntgrediet(response.meals.slice(0, 20));
    $(".loadind-in").fadeOut(300);
}
function displayIntgrediet(data) {
    let store="";
    for (let i = 0; i < data.length; i++) {
        store+= `<div class="col-md-3">
                    <div class="box position-relative overflow-hidden rounded-2 text-center" onclick="getIngreMeal('${data[i].strIngredient}')">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>`
    }
    document.getElementById("displayArray").innerHTML = store;
}
async function getIngreMeal(ingredients) {
    $(".loadind-in").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    response = await response.json();
    displayMeal(response.meals.slice(0, 20));
    $(".loadind-in").fadeOut(300);
}

function displayMeal(data) {
    let store="";
    for (let i = 0; i < data.length; i++) {
        store+= `<div class="col-md-3">
                    <div class="box position-relative overflow-hidden rounded-2" onclick="getDetails('${data[i].idMeal}')">
                        <img class="w-100" src="${data[i].strMealThumb}" alt="">
                        <div class="meal-name position-absolute  start-0 end-0 text-black d-flex align-items-center p-3">
                            <h3>${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("displayArray").innerHTML = store;
}
async function getDetails(id) {
    $(".loading-in").fadeIn(300);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    respone = await respone.json();
    displayDetails(respone.meals[0]);
    $(".loading-in").fadeOut(300);
}
function displayDetails(data) {
    let recipes = "";
    for (let i = 0; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
        recipes+= `<li class="alert alert-info p-1 m-2">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }
    let tags = data.strTags?.split(",")
    if (!tags) tags = [];
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger p-1 m-2">${tags[i]}</li>`
    }
    let store=`<div class="col-md-4">
                    <img class="w-100 rounded-2" src="${data.strMealThumb}" alt="">
                    <h2>${data.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${data.strInstructions}</p>
                    <h3><span>Area: </span> ${data.strArea} </h3>
                    <h3><span>category: </span> ${data.strCategory} </h3>
                    <h3>Recipes: </h3>
                    <ul class="list-unstyled d-flex flex-wrap g-4">${recipes}</ul>
                    <h3>Tags: </h3>
                    <ul class="list-unstyled d-flex flex-wrap g-4">${tagsStr}</ul>
                    <a href="${data.strSource}" class="btn btn-success text-decoration-none">Source</a>
                    <a href="${data.strYoutube}" class="btn btn-danger text-decoration-none">Youtube</a>
                </div>`
    document.getElementById("displayArray").innerHTML = store;
}

// --------------------------------------------------------------------------------------------------------------------------------

function searchInput() {
    close();
    document.getElementById("searchInput").innerHTML = `<div class="row py-4" >
                                                            <div class="col-md-6">
                                                                <input onkeyup="nameSearch(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search by Name">
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input onkeyup="letterSearch(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search by First Latter">
                                                            </div>
                                                        </div>`
    document.getElementById("displayArray").innerHTML = "";
}
async function nameSearch(data) {
    $(".loading-in").fadeIn(300);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`);
    respone = await respone.json();
    displayMeal(respone.meals);
    $(".loading-in").fadeOut(300);
}
async function letterSearch(data) {
    $(".loading-in").fadeIn(300);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${data}`);
    respone = await respone.json();
    displayMeal(respone.meals);
    $(".loading-in").fadeOut(300);
}

// --------------------------------------------------------------------------------------------------------------------------------

function contact() {
    close();
    document.getElementById("displayArray").innerHTML = `<div class="d-flex justify-content-center align-items-center min-vh-100">
                                                            <div class="container w-75 text-center">
                                                                <div class="row g-4">
                                                                    <div class="col-md-6">
                                                                        <input id="name" type="text" placeholder="Enter Your Name" class="form-control">
                                                                        <div onkeyup="validation()" id="nameAlert" class="alert alert-danger w-100 my-2 d-none">
                                                                            <p>Special Character and Numbers not allowed</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input onkeyup="validation()" id="email" type="email" placeholder="Enter Your Email" class="form-control">
                                                                        <div id="emailAlert" class="alert alert-danger w-100 my-2 d-none">
                                                                            <p>Your Email not valid. "email@aaa.com"</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input onkeyup="validation()" id="phone" type="text" placeholder="Enter Your phone" class="form-control">
                                                                        <div id="phoneAlert" class="alert alert-danger w-100 my-2 d-none">
                                                                            <p>Enter valid Phone</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input onkeyup="validation()" id="age" type="number" placeholder="Enter Your Age" class="form-control">
                                                                        <div id="ageAlert" class="alert alert-danger w-100 my-2 d-none">
                                                                            <p>Wrong Age, Try Again</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input onkeyup="validation()" id="password" type="password" placeholder="Enter Your password" class="form-control">
                                                                        <div id="passwordAlert" class="alert alert-danger w-100 my-2 d-none">
                                                                            <p>Your password not valid. Minimum 8 Character, at least one latter and one number</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input onkeyup="validation()" id="repassword" type="password" placeholder="Repassword" class="form-control">
                                                                        <div id="repasswordAlert" class="alert alert-danger w-100 my-2 d-none">
                                                                            <p>your password not identical</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button id="submit" class="btn btn-outline-danger px-2 my-3" disabled>Submit</button>
                                                            </div>
                                                        </div>`

    document.getElementById("name").addEventListener("focus", () => {nameOn = true})
    document.getElementById("email").addEventListener("focus", () => {emailOn = true})
    document.getElementById("phone").addEventListener("focus", () => {phoneOn = true})
    document.getElementById("age").addEventListener("focus", () => {ageOn = true})
    document.getElementById("password").addEventListener("focus", () => {passwordOn = true})
    document.getElementById("repassword").addEventListener("focus", () => {repasswordOn = true})
}
function validation(){
    if (nameOn) {
        if (/^[a-zA-Z]+$/.test(document.getElementById("name").value)) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailOn) {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("email").value)) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }
    if (phoneOn) {
        if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(document.getElementById("phone").value)) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }
    if (ageOn) {
        if (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value)) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }
    if (passwordOn) {
        if (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value)) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordOn) {
        if (document.getElementById("repassword").value == (document.getElementById("password").value)) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }
    }

    if((/^[a-zA-Z]+$/.test(document.getElementById("name").value))
        && (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("email").value))
        && (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(document.getElementById("phone").value))
        && (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
        && (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
        && (document.getElementById("repassword").value == (document.getElementById("password").value))) {
            document.getElementById("submit").removeAttribute("disabled")
    }else  document.getElementById("submit").setAttribute("disabled")
}