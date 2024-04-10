const { fetchCity } = require('./apiFunctions.js');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para obter através do usuário um nome de cidade
async function getCity() {
    let city;
    let cityData;
    do {
        city = await new Promise((resolve) => {
            rl.question('\n\x1b[1;34mDigite o nome da cidade: \x1b[0m\x1b[97m', (city) => {
                resolve(city);
            });
        });

        cityData = await fetchCity(city);

        if (!cityData || cityData.length === 0) {
            console.log('\n\x1b[34mCidade não encontrada. Por favor, digite o nome de uma cidade válida.\x1b[0m');
        }
    } while (!cityData || cityData.length === 0);

    return city;
}

// Função para obter a resposta do usuário sobre visualizar uma citação ou não
async function getQuoteResponse() {
    let answer;
    do {
        answer = await new Promise((resolve) => {
            rl.question('\n\x1b[1;34mDeseja ver uma citação do dia?\x1b[0m\x1b[97m (S/N) ', (response) => {
                setTimeout(() => {
                    resolve(response.trim().toLowerCase());
                }, 700);
            });
        });

        if (answer !== 's' && answer !== 'n') {
            console.log('\n\x1b[1;35mResposta inválida. Por favor, responda com "S" para sim ou "N" para não.\x1b[0m');
        }

        await new Promise((resolve) => {
            setTimeout(resolve, 900);
        });

    } while (answer !== 's' && answer !== 'n');

    return answer;
}

module.exports = { rl, getCity, getQuoteResponse };