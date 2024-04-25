// test.js
// used for testing the searchArticles function
import searchArticles from './newsapi.js'; // Adjust the path as needed

// Function to test searchArticles
async function testSearchArticles() {
    const concept = "S&P 500"; // Example concept to search
    try {
        const articles = await searchArticles(concept); // Use await to handle the promise returned by searchArticles
        console.log("Articles found:", articles);
    } catch (error) {
        console.error("Error testing searchArticles:", error);
    }
}

// Call the test function
testSearchArticles();

// Example output:

// Articles found: [
//     {
//       title: 'Ouverture Paris : Sanofi, Verallia, BNP Paribas, gagnants du jour; Carrefour, Hermès parmi les perdants...',
//       url: 'https://www.boursier.com/indices/actualites/news/ouverture-paris-sanofi-verallia-bnp-paribas-gagnants-du-jour-carrefour-hermes-parmi-les-perdants-926964.html',
//       date: '2024-04-25',
//       image: 'https://cdn-static.boursier.com/illustrations/photos/l_euronext6.jpg'
//     },
//     {
//       title: '(LEAD) Seoul shares dip 1.76 pct over tech, battery slump | Yonhap News Agency',
//       url: 'https://en.yna.co.kr/view/AEN20240425002353320',
//       date: '2024-04-25',
//       image: 'https://img0.yna.co.kr/photo/yna/YH/2024/04/25/PYH2024042502190001301_P4.jpg'
//     }
//   ]
  
  