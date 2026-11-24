//Imports Express Library
import express from 'express';

//Imports the node-fetch package to display a random background
import fetch from 'node-fetch';

//use import to follow Express syntax **IF A PACKAGE USES REQUIRE CHANGE TO AWAIT IMPORT**
const planets = (await import('npm-solarsystem')).default;

//Based on the Express package documentation. By convention uses "app" but can be any other name
const app = express();

//EJS is the templating engine used
app.set("view engine", "ejs");

//Folder for static files (images, css, etc.)
app.use(express.static("public"));

//Root route. / alone opens the root folder
app.get('/', async(req, res) => {
    let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
	let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render('index', {"image":randomImage}) //res = respose info the server sends to the browser
});

//Creating a new route for Earth
app.get('/earth', (req, res) => {
 let planetEarth = planets.getEarth();
 console.log(planetEarth);
 res.render('earth', {"planetEarth":planetEarth});
});

//Creating a route for Mars
app.get('/mars', (req, res) => {
 let planetMars = planets.getMars();
 console.log(planetMars);
 res.render('mars', {"planetMars":planetMars});
});

//Creating a route for NASA
app.get('/nasa', async(req, res) => {
 let apiKey = "9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";
 let url = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=${apiKey}`;

 let response = await fetch(url);
 let data = await response.json();

 console.log(data);

 res.render('nasa', {"nasaInfo":data});
});

//Route for all planets
app.get('/planet', (req, res) => {
 let planetName = req.query.planetName; //Stores the planet name passed in the query string
 let planetInfo = planets[`get${planetName}`](); //Invoking a function
 res.render('planet', { planetInfo, planetName }); //passing planetInfo to the object planetName
});

//Start the server using port 3000. 'server started' is a message in the terminal to communicate the server is running
app.listen(3000, () => {
   console.log('server started');
});