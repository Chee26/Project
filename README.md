//To start the app follow below steps:
1. start the docker in Windows
2. in vs code go to the docker icon and right click on it5007_tutorial and select start
3. right click on it5007_tutorial and select Attach Shell
4. in the Shell type "bash" then enter
5. cd home
6. cd group38_project
7. under group38_project type in "nvm install 20"  (teacher gave us is Node.js version 10 which is old)  
8. then type in "nvm use 20"  to use version 20
9. type "npm install eventregistry" for newsapi
10. type in "npm audit fix"
11. type in "npm run dev"   you will see the "Local:   http://localhost:3000/"

//Function introduce
1. there are 3 pages "Business News", "Stocks Dashboard" , "Summary"
2. Business News now only contains some gif image, to keep space for future news retrieve from API 
3. Stocks Dashboard will show stock price trend and search for Stock by name. Now inside are all mock data
and below there's button, click on it will predict next days stock price.
4. Summary page is just briefly introduce this app and authors information.

//Files inside
1. Under group_project folder there's "index.html" links to main.jsx <script type="module" src="/src/main.jsx"></script>
2. "main.jsx" link to "App.jsx", which link to the 3 pages Route
3. inside the 3 pages, "index.jsx" contains all the codes. 
