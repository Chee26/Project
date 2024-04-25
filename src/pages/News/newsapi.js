// newsapi.js

// npm install eventregistry
// Load the EventRegistry module
const { EventRegistry, QueryArticlesIter, ArticleInfoFlags, ReturnInfo, RequestArticlesInfo, QueryItems } = require("eventregistry");

const er = new EventRegistry({ apiKey: "YOUR_API_KEY" });

// Function to search and print articles about a given concept
async function searchArticles(concept) {
    try {
        const conceptUri = await er.getConceptUri(concept);
        if (conceptUri) {
            const query = new QueryArticlesIter(er, {
                conceptUri: conceptUri,
                sortBy: "date",
                maxItems: 12,  // Assuming you want to limit the results to fit into your card layout
                returnInfo: new ReturnInfo({
                    articleInfo: new ArticleInfoFlags({
                        title: true,
                        bodyLen: 200,
                        image: true,
                        date: true
                    })
                })
            });

            const articles = [];
            await query.execQuery((article) => {
                articles.push({
                    title: article.title,
                    url: article.url,
                    date: article.datetime || article.date,
                    image: article.image
                });
            });
            return articles;
        } else {
            console.log("Concept not found for:", concept);
            return [];
        }
    } catch (error) {
        console.error("Error during API call:", error);
        return [];
    }
}

// Example usage
module.exports = searchArticles; // Export the function for use in other files
