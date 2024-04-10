const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'keys.env') });

const openWeatherApiKey = process.env.OpenWeatherAK;
const ninjasApiKey = process.env.NinjasAK;

// API Ninjas City
async function fetchCity(city) {
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${city}`, {
            headers: {
                'X-Api-Key': ninjasApiKey
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Erro ao buscar cidade: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao buscar cidade:', error.message);
        throw error;
    }
}

// API Ninjas WorldTime
async function fetchWorldTime(city) {
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/worldtime?city=${city}`, {
            headers: {
                'X-Api-Key': ninjasApiKey
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Erro ao buscar tempo atual: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao buscar tempo atual:', error.message);
        throw error;
    }
}

// OpenWeather API
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric&lang=pt_br`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Erro ao buscar dados meteorológicos: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao buscar dados meteorológicos:', error.message);
        throw error;
    }
}

// API Ninjas Country
async function fetchCountry(city) {
    try {
        const weatherData = await fetchWeather(city);
        const response = await fetch(`https://api.api-ninjas.com/v1/country?name=${weatherData.sys.country}`, {
            headers: {
                'X-Api-Key': ninjasApiKey
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Erro ao buscar país: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao buscar país:', error.message);
        throw error;
    }
}

// API Ninjas Quotes
async function fetchQuotes() {
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
            headers: {
                'X-Api-Key': ninjasApiKey
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Erro ao buscar citação: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao buscar citação:', error.message);
        throw error;
    }
}

module.exports = {
    fetchCity,
    fetchWorldTime,
    fetchWeather,
    fetchCountry,
    fetchQuotes
};