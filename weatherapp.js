const wrapper = document.querySelector('.wrapper'),
inputPart = wrapper.querySelector('.input-part'),
infoTxt = inputPart.querySelector('.info-txt'),
inputField = inputPart.querySelector('input'),
locationBtn = inputPart.querySelector('button');
let api

inputField.addEventListener('keyup', e=>{
    if (e.key =='Enter' && inputField.value != ""){
        requestApi(inputField.value)
    }
})
locationBtn.addEventListener('click', ()=> {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else{
        alert('Your Browser not support geolocation api')
    }
})
function onSuccess(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=936f08e6273ee561197392104718144f`
}
function onError(error){
    infoTxt.innerText= error.message;
    infoTxt.classList.add('error')
}
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=936f08e6273ee561197392104718144f`
    fetchData()
}
function fetchData(){
    infoTxt.innerText = "Getting weather details..."
    infoTxt.classList.add('pending')
    fetch(api).then(function(response){response.json().then(function(result){weatherDetails(result)})})
}
function weatherDetails(info){
    infoTxt.classList.replace("pending", "error")
    if (info.cod == "404"){
        infoTxt.innerText = `${inputField.value} isn't a valid city name`
    } else{
        
    infoTxt.classList.remove("pending", "error")
    wrapper.classList.add('active')
    console.log(info)
    }
}