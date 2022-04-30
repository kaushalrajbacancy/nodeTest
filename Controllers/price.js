const coingeckoService = new (require("../Services/coingecko"))();
const etherspotService = new (require("../Services/etherspot"))();

const NodeCache = require('node-cache');
const longTermCache = new NodeCache({ stdTTL: 86400, checkperiod: 86400 });
const shortTermCache = new NodeCache({ stdTTL: 70, checkperiod: 70 });

const VS_CURRENCIES = ['USD', 'GBP'];

class PriceController {

    fetchPricesList = async (request, response) => {

        try {
            let isCoinCached = longTermCache.get('allCoins');
            if (!isCoinCached) {
                await this.cacheAllCoins()
            }

            let result = shortTermCache.get('cachedTokens') || await this.getTokensPrices()

            response.handler.success(result)
        } catch (error) {
            response.handler.serverError(error);
        }
    }

    cacheAllCoins = async () => {
        const coins = await coingeckoService.getCoinsList();
        if (!coins.data) {
            throw new Error('Oops! Something went wrong. Please try again after sometime.');
        }

        for (let index = 0; index < coins.data.length; index++) {
            const coin = coins.data[index];
            longTermCache.set(coin.symbol, coin.id)
        }
        longTermCache.set('allCoins', true)
    }

    getTokensPrices = async () => {
        let data = {};

        const tokens = await etherspotService.getTokens();
        if (!tokens.length)
            throw new Error('Oops! Something went wrong. Please try again after sometime.');

        // Map Tokens Symbol with Coins ID to retrive data from simple price
        let tokenIDs = [];
        tokens.forEach(token => {
            const tokenSymbol = token.symbol.toLowerCase()
            if (longTermCache.has(tokenSymbol)) {
                token.id = longTermCache.get(tokenSymbol)
                tokenIDs.push(token.id)
            }
        });

        // Call simple prices in batch
        const batchSize = 150;
        const batches = [];
        for (let tokenIndex = 0; tokenIndex < tokenIDs.length; tokenIndex += batchSize) {
            const chunk = tokenIDs.slice(tokenIndex, tokenIndex + batchSize);
            batches.push(coingeckoService.getSimplePrice(chunk, VS_CURRENCIES))
        }
        let results = await Promise.all(batches);

        // Max Iteration will be number of chunks only (Probably 10)
        for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {
            const result = results[resultIndex];

            if (result.data) {
                data = { ...data, ...result.data }
            }
        }

        const defaultValue = 0;
        for (let index = 0; index < tokens.length; index++) {
            const element = tokens[index];

            element.usd = defaultValue
            element.gbp = defaultValue
            if (data[element.id]) {
                element.usd = data[element.id].usd || defaultValue
                element.gbp = data[element.id].gbp || defaultValue
            }
        }

        shortTermCache.set('cachedTokens', tokens);

        return tokens;
    }
}

// Cache Data on Expire
shortTermCache.on("expired", (key, value) => {
    new PriceController().getTokensPrices();
});

// Cache Data on Expire
longTermCache.on("expired", (key, value) => {
    new PriceController().cacheAllCoins();
});

module.exports = PriceController;