const express = require('express');
const app = express();

const words = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'flower', 'grape', 'horse', 'ice cream', 'jazz'];

const validate = (req, res, next) => {

  const authorizationHeader = req.headers.authorization;
  const regionHeader = req.headers.region;

  const header = req.headers['authorization'];
  const region = req.headers['region'];
  if (!authorizationHeader) {
    res.status(403).send('Forbidden: Authorization header missing');
  } else if (!regionHeader || regionHeader !== 'INDIA') {
    res.status(403).send('Forbidden: Invalid Region header');
  } else 
    next(); 
      
};

app.get('/timeofday',validate, (req, res,) => {
      
      /*
        new Date(): This creates a new JavaScript Date object, representing the current date and time.
        toLocaleTimeString(): This method converts the date object's time portion into a string,
        It returns a string representation of the time portion of the date.
        */

      const currentTime = new Date().toLocaleTimeString();
      res.send(`Current server time: ${currentTime}`);      
    }
  );

  app.get('/wordofday',validate, (req, res) => {
       
      /*
        Math.random(): returns a random floating-point number between 0 (inclusive) and 1 (exclusive).
        words.length: This returns the number of elements in the words array.
        Math.floor(): rounds down the random number to the nearest integer using the Math.floor() function.
        This ensures that the random index is a whole number and within the valid index range of the words array.
        */

      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      res.send(`Random word of the day: ${randomWord}`);
    }
  );
  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




        

        