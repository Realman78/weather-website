const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationText = document.getElementById('locationID')
const forecastText = document.getElementById('forecastID')

weatherForm.addEventListener('submit', (e)=>{
    locationText.textContent = 'Loading...'
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
