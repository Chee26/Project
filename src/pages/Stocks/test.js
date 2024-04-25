// Import the fetchStockData function
import fetchStockData from './stockapi.js'; // Adjust the path as needed

// Function to test fetchStockData
async function testFetchStockData() {
    const symbol = "AAPL"; // Example stock symbol to fetch
    const apiKey = "VVM67WWF4DBHEVX7"; // Replace with your actual API key
    try {
        const stockData = await fetchStockData(symbol, apiKey); // Use await to handle the promise returned by fetchStockData
        console.log("Stock data fetched:", stockData.slice(0, 3));
    } catch (error) {
        console.error("Error testing fetchStockData:", error);
    }
}

// Call the test function
testFetchStockData();


// example output
// Stock data fetched: [
//     { day: '2023-11-30', value: 189.95 },
//     { day: '2023-12-01', value: 191.24 },
//     { day: '2023-12-04', value: 189.43 },
//     { day: '2023-12-05', value: 193.42 },
//     { day: '2023-12-06', value: 192.32 },
//     { day: '2023-12-07', value: 194.27 },
//     { day: '2023-12-08', value: 195.71 },
//     { day: '2023-12-11', value: 193.18 },
//     { day: '2023-12-12', value: 194.71 },
//     { day: '2023-12-13', value: 197.96 },
//     { day: '2023-12-14', value: 198.11 },
//     { day: '2023-12-15', value: 197.57 },
//     { day: '2023-12-18', value: 195.89 },
//     { day: '2023-12-19', value: 196.94 }]



// API call output

// {
//     "Meta Data": {
//         "1. Information": "Daily Prices (open, high, low, close) and Volumes",
//         "2. Symbol": "IBM",
//         "3. Last Refreshed": "2024-04-24",
//         "4. Output Size": "Compact",
//         "5. Time Zone": "US/Eastern"
//     },
//     "Time Series (Daily)": {
//         "2024-04-24": {
//             "1. open": "183.1700",
//             "2. high": "184.2900",
//             "3. low": "181.4000",
//             "4. close": "184.1000",
//             "5. volume": "7616643"
//         },
//         "2024-04-23": {
//             "1. open": "182.7300",
//             "2. high": "184.6800",
//             "3. low": "179.0000",
//             "4. close": "182.1900",
//             "5. volume": "5950229"
//         },
//         "2024-04-22": {
//             "1. open": "182.4500",
//             "2. high": "183.3150",
//             "3. low": "180.4500",
//             "4. close": "181.9000",
//             "5. volume": "3076451"
//         }
//     }

