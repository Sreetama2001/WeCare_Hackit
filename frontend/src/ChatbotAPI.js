import axios from 'axios';

function moodGuesser(message) {
  const url = "http://tweetmoodchk.d7cgcshfajbxf6dv.eastus.azurecontainer.io";
  fetch(url, {
    method: 'get', // Default is 'get'
    mode: 'no-cors',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(response => console.log(response.json())).catch(err => console.log(err))
}

const API = {
  GetChatbotResponse: async message => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (message === "hi") resolve("Here I am  your mood guesser bot , I will send you jokes and memes which will make you happy!");

        else {
          moodGuesser(message);
          resolve("echo : " + message);
        }
      }, 2000);
    });
  }
};

export default API;
