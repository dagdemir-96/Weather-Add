const uiElement={
    searchInput:document.querySelector("form"),
    weatherContainer:document.querySelector(".weather-container"),
    errorContainer:document.querySelector("#error-message"),
    loaderContainer:document.querySelector("#loader"),
    dataList:document.querySelector("#city-list"),
    themeBtn:document.querySelector("#theme-btn"),
};

//hava durumu verilen dinamik şekide render eden fon.
const displayWeatherData=(data,flagUrl)=>
{
    //güncel bir tarih verisi elde et(apide olmadığı için eriştik)

    const date=new Date(). toLocaleDateString("tr",{
        day:"2-digit",
        month:"long",
        year:"numeric",
        weekday:"long",
    });
//weather containerin içini sıfırıla
    uiElement.weatherContainer.innerHTML="";

    //console.log(date);
//bir tane div oluştur
const card=document.createElement("div");

//weather containera active classı ekleme
uiElement.weatherContainer.classList.add("active");

    //oluşturulan bu div e  class ekle
card.className="weather-card";

    //oluşturulan class eklenen elemanın html içeriğini belirle
card.innerHTML=`
<div class="weather-header">
                    <div class="location-info">
                        <h2 id="location">${data.name}.${data.sys.country}</h2>
                        <div class="country-flag">
                            <img src="${flagUrl}" />
                        </div>
                    </div>

                    <p id="date">${date}</p>
                </div>
               
                <div class="weather-info">

                    <div class="temperature">
                        <h3 id="temperature">${Math.round(data.main.temp)}°C</h3>
                        <p>Hissedilen <span id="feel-like">${Math.round(data.main.feels_like)}°C</span></p>
                    </div>

                    <div class="weather-icon">
                    <img
                src="https://openweathermap.org/img/wn/${
                  data.weather[0].icon
                }@2x.png"
                alt="weather-icon"
              />

                        <p id="weather-description">${
                  data.weather[0].description
                }</p>
                    </div>
                </div>
             

                <div class="weather-details">
                    <div class="details">
                        <i class="fa-solid fa-wind"></i>
                        <div>
                            <p>Rüzgar Hızı</p>
                            <p id="wind-speed">${data.wind.speed} m/s</p>
                        </div>
                    </div>
                    <div class="details">
                        <i class="fa-solid fa-droplet"></i>
                        <div>
                            <p>Nem</p>
                            <p id="humidity">${data.main.humidity} %</p>
                        </div>
                    </div>
                    <div class="details">
                        <i class="fa-solid fa-minimize"></i>
                        <div>
                            <p>Basınç</p>
                            <p id="pressure">${data.main.pressure} hPa</p>
                        </div>
                    </div>
                </div>`;

                console.log(card);


    //oluşturulan card yapısını html kısmına ekle
    uiElement.weatherContainer.appendChild(card);
//erroru gizle
    uiElement.errorContainer.classList.remove("show");
};

//Error u render eden fon.
const renderError=()=>{
    uiElement.errorContainer.classList.toggle("show");
    uiElement.weatherContainer.classList.toggle("active");
};



//Loaderı render eden fon.
const renderLoader=()=>{
uiElement.loaderContainer.classList.toggle("show");
};

// Data List elemanın içerisine dinamik şekilde şehir option'ları ekleyecek fonksiyon
const createDataListOption = (cities) => {
  // Dışarıdan verilen cities dizisinin her elemanı için bir option elemanı oluştur
  cities.forEach((city) => {
    // Option elemanı oluştur
    const optionEleman = document.createElement("option");

    // Optionların value'sunu ayarla
    optionEleman.value = city;

    // Option'ları datalist elemanın içerisine ekle
    uiElement.dataList.appendChild(optionEleman);
  });
};


//TEMA İKONU GÜNCELLEYEN FONK.

const updateThemeIcon=(theme)=>{

    const themeIcon=uiElement.themeBtn.querySelector("i");

   themeIcon.className=theme==="light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
}



export {uiElement,displayWeatherData,renderError,renderLoader,createDataListOption,updateThemeIcon};