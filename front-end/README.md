How to run:
1. Start mongoDB: "systemctl start mongod"

2. Start backend service: 
2.1: "npm install 20"  then "nvm use 20"
2.2: "npm run start", will use port 3000

3. Start frondend service:
3.1: "npm install 20"  then "nvm use 20"
3.2: "npm run start", will use port 5000

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

List of features:
1. Business news: it uses free API of "https://newsapi.org" to retrieve business news.

2. Stocks Dashboard: 
2.1 Stock pricce history: it uses free API of "https://www.alphavantage.co" to retrieve stock price history, key in stock ticker will feedback the stock price trend chart. (example: AAPL, MSFT)
2.2 Stock price prediction: it simpliy used average method to predict next day's stock price. Click on the button will feedback the next day's stock price.
2.3 Search history: it uses mongoDB to record the searching history, including the stock's ticker and time.

3. Summary: it lists down this application's features and the authors information
