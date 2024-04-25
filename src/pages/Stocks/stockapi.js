import axios from 'axios';

/**
 * Fetch daily time series stock data and format it for charting.
 * @param {string} symbol The stock symbol (e.g., "IBM").
 * @param {string} apiKey Your API key for accessing the Alpha Vantage API.
 * @param {string} outputsize The size of the output ("compact" or "full").
 * @returns {Promise<Array>} The formatted stock data suitable for charting.
 */
async function fetchStockData(symbol, apiKey, outputsize = 'compact') {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}&outputsize=${outputsize}`;

    try {
        const response = await axios.get(url, { headers: { 'User-Agent': 'axios' } });
        if (response.status === 200) {
            const data = response.data;
            if (data && data['Time Series (Daily)']) {
                // Format the data into a chart-compatible format
                const formattedData = Object.entries(data['Time Series (Daily)']).map(([date, info]) => ({
                    day: date, // Changed from 'year' to 'day'
                    value: parseFloat(info['4. close']) // Extract closing price
                }));
                console.log('Data formatted successfully:', formattedData.slice(0, 3));
                return formattedData.reverse(); // Assuming you want the earliest date first
            } else {
                console.error('No valid data found:', data);
                return [];
            }
        } else {
            console.error('Failed to fetch data:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return [];
    }
}

export default fetchStockData;
