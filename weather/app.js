let valueSearch = document.getElementById('valueSearch')
let city= document.getElementById('city')
let temparature = document.getElementById('temparature')
let description = document.querySelector('.description')
let clouds=document.getElementById("clouds")
let humidity = document.getElementById('humidity')
let pressure = document.getElementById('pressure')
let main = document.querySelector('main')
let form = document.querySelector('form')
const searchButton = document.getElementById('searchButton');
        const errorSound = document.getElementById('errorSound');

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(valueSearch.value != ''){
        searchWeather()
    }
})

let id = '9505fd1df737e20152fbd78cdb289b6a'
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id
const searchWeather=()=>{
    fetch(url + '&q=' + valueSearch.value)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if(data.cod == 200){
            city.querySelector('figcaption').innerHTML = data.name;
            city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
            temparature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            temparature.querySelector('figcaption span').innerText = data.main.temp
            description.innerText = data.weather[0].description;

            clouds.innerText = data.clouds.all
            humidity.innerText = data.main.humidity
            pressure.innerText = data.main.pressure
         }else{
            main.classList.add('error')
              // Play error sound and apply animation
              triggerError();
            }
        })
        .catch(() => {
            // Handle errors (e.g., network issues)
            triggerError();
        });
};

// Trigger Error Effect
const triggerError = () => {
    const mainElement = document.querySelector('main');
    mainElement.classList.add('error');

    // Play error sound
    if (errorSound.paused) {
        errorSound.play();
    }

    // Remove error class after animation ends
    setTimeout(() => {
        mainElement.classList.remove('error');
    }, 300);
};

// Add event listener to search button
searchButton.addEventListener('click', () => {
    if (valueSearch.value.trim() !== '') {
        searchWeather();
    } else {
        triggerError(); // Trigger error if input is empty
    }
});

const initApp = () =>{
    valueSearch.value = 'Kolkata'
    searchWeather()
}
initApp()





