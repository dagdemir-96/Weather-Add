
//APİ KEY
const apiKey="f472dff42451eb70982a5a994b427b4d";

const getWeatherData = async (city) => {
  // Api'a istek at
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`
  );

  // Gelen veriyi js nesnesine çevir
  const data = await response.json();

  // Elde edilen değeri return et
  return data;
};


//!bayrak verisini alacak fonksiyon

const getFlagUrl=(countryCode)=>
 `https://flagcdn.com/108x81/${countryCode.toLocaleLowerCase()}.png`;


//const getWeatherData=(city)=>fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then((res)=> res.json())//api dan alına veriyi promis yapısı ile alıp js veritipine dönüştğrdük(bir yöntem de bu)

   // then((data)=> console.log(data))//!dönüştürülerek alınan bu veriyi bir sonra ki bloğa aktar dememiz gerekir bunu yapmak için de bir önce ki bloğu return etmemiz gerekir bunu da arrow functionlarda süslü parantezleri kaldırark yapıyoruz. yani json verisine dönüştürdükten sonra o veriyi da başka bir değişkene atamış olduk buna da data demiş olduk.(bu şekide yaptığımzda undefind döndüğü için bu sata atamasını main de yaptık?)




export {getWeatherData,getFlagUrl};