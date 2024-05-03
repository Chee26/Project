//To start the app follow below steps:
1. start the docker in Windows
2. in vs code go to the docker icon and right click on it5007_tutorial and select start
3. right click on it5007_tutorial and select Attach Shell
4. in the Shell type "bash" then enter
5. cd home
6. cd group38_project
7. under group38_project type in "nvm install 20"  (teacher gave us is Node.js version 10 which is old)
8. type "npm install eventregistry" for newsapi
9. type "npm install axios" for requests
10. then type in "nvm use 20"  to use version 20
11. type in "npm audit fix"
12. type in "npm run dev"   you will see the "Local:   http://localhost:3000/"

//Function introduce
1. there are 3 pages "Business News", "Stocks Dashboard" , "Summary"
2. Business News retrieves the title and images from NewsAPI search for "S&P 500" 
3. Stocks Dashboard shows daily stock price and search for Stock by name, default is "AAPL". A button is available to predict next days stock price.
4. Summary page is just briefly introduce this app and authors information.

//Files inside
1. Under group_project folder there's "index.html" links to main.jsx <script type="module" src="/src/main.jsx"></script>
2. "main.jsx" link to "App.jsx", which link to the 3 pages Route
3. inside the 3 pages, "index.jsx" contains all the codes. 
   a. The News page has a newsapi.js that contains the function to call NewsAPI, and test.js for unit testing
   b. The Stocks page has a stocksapi.js that contains the function to call AlphaVantage API, and test.js for unit testing

// References
1. [Alpha Vantage](https://www.alphavantage.co/documentation/)
2. [News API](https://newsapi.ai/documentation?tab=searchArticles)
