const weather = document.querySelector(".js-weather");

const API_KEY = "90c8e09510d12dc1729d0bbc1bdd7eab";
const COORDS = 'coords';

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        //console.log(response.json());
        return response.json();
    })
    .then(function(json){
        console.log(json);
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`
    });
}

function saveCoords(coordesObj){
    localStorage.setItem(COORDS, JSON.stringify(coordesObj))
}

function hendleGeoSucces(position){
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // const coordesObj = {
    //     latitude:latitude,
    //     longitude:longitude
    // }; // JS 에서 KEY와 Velue 값이 같으면 축약해서 쓸수있다. 
    const coordesObj = {
        latitude,
        longitude
    };
    saveCoords(coordesObj);
    getWeather(latitude,longitude)
}

function hendleGeoError(){
    console.log("로케이션 정보를 가져오지 못했습니다.");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(hendleGeoSucces, hendleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null){
        askForCoords();
    } else {
        //날씨 가져올것
        const parseCoords = JSON.parse(loadedCords)
        //console.log(parseCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init(){
    loadCoords();
}
init();