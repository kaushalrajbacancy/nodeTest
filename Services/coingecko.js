
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

class CoinGeckoService {
    
    getCoinsList = async () => {
        return await CoinGeckoClient.coins.list();
    }

    getSimplePrice = async (ids, vs_currencies = ['USD']) => {
        return await CoinGeckoClient.simple.price({
            ids,
            vs_currencies,
        });
    }
}

module.exports = CoinGeckoService;