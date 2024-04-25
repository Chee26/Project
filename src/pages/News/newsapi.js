// newsapi.js

// npm install eventregistry
// Load the EventRegistry module
import { EventRegistry, QueryArticlesIter, ArticleInfoFlags, ReturnInfo } from "eventregistry";

const er = new EventRegistry({ apiKey: "bd7f70d4-012a-47a2-824b-d39978c32959" });

async function searchArticles(concept) {
    try {
        const conceptUri = await er.getConceptUri(concept);
        console.log("Concept URI:", conceptUri);  // Log the URI to ensure it's correct
        if (conceptUri) {
            const query = new QueryArticlesIter(er, {
                conceptUri: conceptUri,
                sortBy: "date",
                maxItems: 12,
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
            // Use a promise to handle async operation within execQuery
            await new Promise((resolve, reject) => {
                query.execQuery((article) => {
                    if (article) {
                        articles.push({
                            title: article.title,
                            url: article.url,
                            date: article.datetime || article.date,
                            image: article.image
                        });
                    } else {
                        reject("No articles returned"); // Reject if no articles are found
                    }
                }, () => resolve()); // Resolve the promise once all articles are processed
            });

            console.log("Articles collected:", articles.length);  // Log how many articles were collected
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

export default searchArticles; // Export the function for use in other files
