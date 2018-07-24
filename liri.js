require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable.
let fs = require("fs");
let request =  require('request');
let keys = require("./keys.js");
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');

let spotify = new Spotify (keys.spotify);


// get artist from array
let artistName = (artist) => {
    return artist.name;
};//closes artistname


//get spotify to work
let makeWork = function (songName) {
    //checing to see if song works, if so, run fucction
    if (songName === undefined) {
        songName = "I want it that way";      
    } 
    spotify.search(
        {
         type: "track", 
         query: songName   
        },
        function (error, data) {
            if (error) {
                console.log("it's not working" + error);
                return;
            }
            let songs = data.tracks.items;
            for (let i = 0; i < songs.length; i++) {
                console.log(i);
                console.log('artist' + songs[i].artists.map(artistName));
                console.log('song name' + songs[i].name);
                console.log("preview song" + songs[i].preview_url);
                console.log('album' + songs[i].album.name);
                console.log('---------------------------------------------------');
            }
        }
    );
};//closes make work

let getTweets = () => {
    let client = new Twitter (keys.twitter);
    let params = {
        screen_name: "AllisonScollan"
    };//closes params
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {  
                console.log(tweets[i].created_at);  
                console.log('');
                console.log(tweets[i].text);
            }//closes forloop
        }//closes if
    }//closes get client
)//closes forloop
};//closes getTweets

let doWhatItSays = () => {
    fs.readFile ("random.txt", "utf8", function(error, data){
        console.log(data);
        let dataArray = data.split(",");
            if (dataArray.length === 2) {
                pick(dataArray[0], dataArray[1]);
            }
            else if (dataArray.length === 1) {
                pick(dataArray[0]);
            };
    })
};

// Function for running a Movie Search
var getMovie = function(movieName) {
    if (movieName === undefined) {
      movieName = "Mr Nobody";
    }
  
    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
  
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
      }
    });
  };

let pick = (caseData, functionData) => {
    switch (caseData){
        case "Tweets":
        getTweets();
        break;

        case "spotify-this-song":
        makeWork();
        break;

        case "movie":
        getMovie();
        break;

        case "do-what-it-says":
        doWhatItSays();
        break;

        default: 
        console.log("Liri does not know what this is, just like Siri");
    }//closes switch
}//closes pick

let run = (argOne, argTwo) => {
    pick(argOne, argTwo);
};//closes run


run(process.argv[2], process.argv[3]);

//copy get movie function and run it


