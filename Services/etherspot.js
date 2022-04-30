
const { Sdk } = require('etherspot');

class EtherspotService {
    getTokens = async () => {
        const sdk = new Sdk(process.env.ETHERSPOT_KEY);
        return await sdk.getTokenListTokens();
    }
}

module.exports = EtherspotService;