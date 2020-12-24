const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationText = document.getElementById('locationID')
const forecastText = document.getElementById('forecastID')
const $getMyLocation = document.querySelector('#myLocationButton')

weatherForm.addEventListener('submit', (e)=>{
    locationText.textContent = 'Loading...'
    forecastText.textContent = '';
    e.preventDefault()
    const location = search.value
    
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            locationText.textContent = data.error;
            forecastText.textContent = '';
        }else{
            locationText.textContent = data.location;
            forecastText.textContent = data.forecast;

        }
        
    })
})
})

$getMyLocation.addEventListener('click',(e)=>{
    locationText.textContent = 'Loading...'
    forecastText.textContent = '';
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((pos)=>{
        const myLocation = {
            latitude: parseFloat(pos.coords.latitude),
            longitude: parseFloat(pos.coords.longitude)
        }
        fetch(`/weather/geolocation?latitude=${myLocation.latitude}&longitude=${myLocation.longitude}`).then((response)=>{
            response.json().then((data)=>{
                if (data.error){
                    locationText.textContent = data.error;
                    forecastText.textContent = '';
                }else{
                    locationText.textContent = data.place_name;
                    forecastText.textContent = data.forecast;
                }
            })
        })
        })
})
