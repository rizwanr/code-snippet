var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var animals = [
  {
    animalType: 'dog',
    pet: true,
    fierceness: 4
  },
  {
    animalType: 'cat',
    pet: true,
    fierceness: 10
  },
  {
    animalType: 'giraffe',
    pet: false,
    fierceness: 4
  },
  {
    animalType: 'zebra',
    pet: false,
    fierceness: 8
  },
  {
    animalType: 'lion',
    pet: false,
    fierceness: 10
  }
];

app.get('/dog', function(req, res) {
  // Handlebars requires an object to be sent to the dog.handlebars file. Lucky for us, animals[0] is an object!

  // 1. Send the dog object from the animals array to the dog.handlebars file.
  animals.forEach(animal => {
    if (animal.animalType === 'dog') {
      return res.render('dog', animal);
    }
  });
});

app.get('/all-pets', function(req, res) {
  var pets = [];
  for (var i = 0; i < animals.length; i++) {
    if (animals[i].pet) {
      pets.push(animals[i]);
    }
  }
  console.log(pets);
  console.log({
    animals: pets
  });
  /**
   {
  animals: [
    { animalType: 'dog', pet: true, fierceness: 4 },
    { animalType: 'cat', pet: true, fierceness: 10 }
  ]
}
  */
  res.render('index', {
    animals: pets
  });
});

app.get('/all-non-pets', function(req, res) {
  // Handlebars requires an object to be sent to the index.handlebars file.
  // 3. Send all the animals that are not pets to the index.handlebars file.

  var data = {
    animals: []
  };
  for (var i = 0; i < animals.length; i++) {
    var currentAnimal = animals[i];
    if (!currentAnimal.pet) {
      data.animals.push(currentAnimal);
    }
  }
  console.log(data);
  /*
  {
  animals: [
    { animalType: 'giraffe', pet: false, fierceness: 4 },
    { animalType: 'zebra', pet: false, fierceness: 8 },
    { animalType: 'lion', pet: false, fierceness: 10 }
  ]
} */
  res.render('index', data);
});

// let nonpets = [];
//   animals.forEach(animal => {
//     if (animal.pet === 'false') {
//       nonpets.push(animal);
//       for (var i = 0; i < nonpets.length; i++) {
//         return res.render('index', nonpets[i]);
//       }
//   };

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log('Server listening on: http://localhost:' + PORT);
});
