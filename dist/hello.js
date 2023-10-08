"use strict";
const key = "40d7e5872fb280a11c84de32803ea816";
const form = document.querySelector("form");
const dataBox = document.querySelector(".data-box");
const input = document.getElementById("input");
const getData = (event) => {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}`)
        .then((res) => res.json())
        .then((data) => {
        dataBox.innerHTML = `
            <div class="data-name">
                <h1> ${data.name}</h1>
                <p>${data.weather[0].main}</p>
                <p>${data.weather[0].description}</p>
                <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}" alt="">
                <h5>${(data.main.temp - 273.15).toFixed(2)}&#176;</h5>
            </div>
            <div class="min-max">
                <div class="min">
                    <p>min</p>
                    <p>${(data.main.temp_min - 273.15).toFixed(2)}</p>
                </div>
                <div class="max">
                    <p>max</p>
                    <p>${(data.main.temp_max - 273.15).toFixed(2)}</p>
                </div>
            </div>
        `;
    }).catch(() => {
        if (input.value == "") {
            dataBox.innerHTML = `
            <h3 class="error"> Please enter a city name </h3>
        `;
        }
        else {
            dataBox.innerHTML = `
            <h3 class="error"> Invalid Input </h3>
        `;
        }
    });
    input.value = "";
};
form.addEventListener("submit", getData);
