import { getFlagUrl, getWeatherData } from "./api.js";
import cities  from "./constant.js";
import { createDataListOption, displayWeatherData, renderError, renderLoader, uiElement, updateThemeIcon } from "./ui.js";
//body
const body=document.body;
//tema değeri

const theme=localStorage.getItem("data-theme") ||"light";


//body e theme değerini attribute olarak ekle
body.setAttribute("data-theme",theme);

//sayfa yüklendiği anda optionları oluşturacak fonk.
document.addEventListener("DOMContentLoaded",()=>{
    createDataListOption(cities);
});

//const data= await getWeatherData("istanbul"); yazdığımız ilk yöndemden dataya atama

//searchFormun gönerilmesini izle
uiElement.searchInput.addEventListener("submit", async (e) => {
    e.preventDefault();

    //input içerisindeki şehre eriş ve içerisindeki boşlukları kaldır

    const cityName = e.target[0].value.trim();
    //eğer şehir adı girilmemiş ise kullanıcıya uyarı ver

    if (!cityName) {
        alert("Şehir adı girilmesi zorunludur. Lütfen şehir adı giriniz.")
        //eğer boş geçilmiş ise fonksiyonu durudur
        return;
    }

    //loaderı render ett
renderLoader();
    try {
        //hava durumu verisi isteği için api isteği atılıp girilen değer getirilecek

        const weatherData = await getWeatherData(cityName);

        //dinamik bayrak url i dönder
        const flag = getFlagUrl(weatherData.sys.country);
//console.log(weatherData);
//console.log(flag);

        //arayüzü dinamik olraka render et

        displayWeatherData(weatherData,flag);
    }
    catch (error) {
       renderError();
    }finally{renderLoader()}
});

//themebtn e tıklanma olayını izle
uiElement.themeBtn.addEventListener("click",()=>{
   
    //mevcut tema değerine eriş
    const currentTheme=body.getAttribute("data-theme");
    //ERİŞİLEN THEME DEĞERİNİİN ZITTINI AL
     const newTheme=currentTheme=== "light"?"dark":"light";
     //THEME DEĞERİNİ BODY E ATTRİBUTE OLARAK EKLE
     body.setAttribute("data-theme",newTheme);
     //THEME DEĞERİNİ LOCALE BİLDİR.
     localStorage.setItem("data-theme",newTheme);


     //theme ikonu güncelle
     updateThemeIcon(newTheme);
})
