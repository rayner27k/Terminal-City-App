const { fetchCity, fetchWorldTime, fetchWeather, fetchCountry, fetchQuotes } = require('./apiFunctions');

// Função para exibir os dados sobre a cidade solicitada
async function displayData(city) {
    try {
        const cityData = await fetchCity(city);
        const worldTimeData = await fetchWorldTime(city);
        const weatherData = await fetchWeather(city);
        const countryData = await fetchCountry(city);
        
        console.log(`\n\x1b[1;4;91mDados geográficos para ${weatherData.name}\x1b[0m\n`);

        console.log(`\x1b[31mLatitude: \x1b[0m\x1b[97m${cityData[0].latitude}\x1b[0m`);
        console.log(`\x1b[31mLongitude: \x1b[0m\x1b[97m${cityData[0].longitude}\x1b[0m`);
        console.log(`\x1b[31mPopulação: \x1b[0m\x1b[97m${cityData[0].population} habitantes\x1b[0m\n`)
        
        console.log(`\x1b[1;4;92mDados temporais de ${weatherData.name}\x1b[0m\n`);

        console.log(`\x1b[32mFuso Horário: \x1b[0m\x1b[97m${worldTimeData.timezone}\x1b[0m`);
        console.log(`\x1b[32mData e Hora: \x1b[0m\x1b[97m${worldTimeData.datetime}\x1b[0m`);
        console.log(`\x1b[32mDia da Semana: \x1b[0m\x1b[97m${worldTimeData.day_of_week}\x1b[0m`);
        
        console.log(`\n\x1b[1;4;93mDados meteorológicos para ${weatherData.name}\x1b[0m\n`);

        console.log(`\x1b[33mTemperatura atual: \x1b[0m\x1b[97m${weatherData.main.temp} °C\x1b[0m`);
        console.log(`\x1b[33mSensação térmica: \x1b[0m\x1b[97m${weatherData.main.feels_like} °C\x1b[0m`);
        console.log(`\x1b[33mSituação: \x1b[0m\x1b[97m${weatherData.weather[0].description}\x1b[0m`);
        console.log(`\x1b[33mUmidade: \x1b[0m\x1b[97m${weatherData.main.humidity} %\x1b[0m`);
        console.log(`\x1b[33mVelocidade do vento: \x1b[0m\x1b[97m${weatherData.wind.speed} m/s\x1b[0m\n`);

        console.log(`\x1b[1;4;96mInformações sobre o país ao qual ${weatherData.name} pertence\x1b[0m\n`);

        console.log(`\x1b[36mPaís: \x1b[0m\x1b[97m${countryData[0].name}\x1b[0m`);
        console.log(`\x1b[36mCapital: \x1b[0m\x1b[97m${countryData[0].capital}\x1b[0m`);
        console.log(`\x1b[36mPopulação: \x1b[0m\x1b[97m${countryData[0].population * 1e3} habitantes\x1b[0m`);
        console.log(`\x1b[36mRegião: \x1b[0m\x1b[97m${countryData[0].region}\x1b[0m`);
        console.log(`\x1b[36mCódigo da Moeda: \x1b[0m\x1b[97m${countryData[0].currency.code}\x1b[0m`);
        console.log(`\x1b[36mNome da Moeda: \x1b[0m\x1b[97m${countryData[0].currency.name}\x1b[0m`);
        
    } catch (error) {
        console.error(`\x1b[1mErro ao exibir dados: \x1b[0m${error.message}`);
    }
}

// Função para exibir uma citação/reflexão
async function displayQuote() {
    try {
        const quoteData = await fetchQuotes();

        console.log(`\n\x1b[1;4;95mReflexão\x1b[0m\n`);

        console.log(`\x1b[35mCitação: " \x1b[0m\x1b[97m${quoteData[0].quote}\x1b[35m "\x1b[0m`);
        console.log(`\x1b[35mAutor: \x1b[0m\x1b[97m${quoteData[0].author}\x1b[0m`);
        console.log(`\x1b[35mCategoria: \x1b[0m\x1b[97m${quoteData[0].category}\x1b[0m\n`);

    } catch (error) {    
        console.error(`\x1b[1mErro ao exibir citação: \x1b[0m${error.message}`);
    }
}

module.exports = { displayData, displayQuote };