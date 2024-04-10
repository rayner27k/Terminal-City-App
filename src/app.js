const { displayData, displayQuote } = require('./displayFunctions.js');
const { rl, getCity, getQuoteResponse } = require('./userInput.js');

// Função principal
async function main() {
    try {
        console.log('\n\x1b[4;37;44mBem-vindo ao City App!\x1b[0m');
        await new Promise(resolve => setTimeout(resolve, 700));

        const city = await getCity();
        await displayData(city);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const answer = await getQuoteResponse();

        if (answer === 's') {
                await displayQuote();
        } else if (answer === 'n') {
            console.log('\n\x1b[1;35mCitação não solicitada.\x1b[0m\n');
        }

        await new Promise((resolve) => {
            setTimeout(resolve, 1200);
        });
        
    } catch (error) {
        console.error('\x1b[1mErro ao executar o programa: \x1b[0m', error.message);
    } finally {
        rl.close();
    }
}

main();
