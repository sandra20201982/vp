//Create variables here
var dog, happyDog, database, position, foodStock, feedPetButton, addFoodButton, fedTime, milkObj;
var feed,add,addFood,FeedTime;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(1300,800);

  database = firebase.database();
  console.log(database);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);

  milkObj = new Food();


  dog = createSprite(850,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  feed = createButton("FEED THE DOG");
  feed.position(850,95);
  feed.mousePressed(feedDog);

  add = createButton("ADD FOOD");
  add.position(1000,95);
  add.mousePressed(addFood)
}


function draw() {  
  background(46, 139, 87);

  milkObj.display();
  
  drawSprites();


//   fedTime = database.ref("Hour");
//   fedTime.on("value", function(data){
//   lastFed = data.val();
//   });
//   noStroke();
//   if (lastFed>=12) {
//     text("Last Fed:" + lastFed%12 + "PM", 500,100);
//   }else if(lastFed == 0){
//     text("Last Fed : 12AM",350,30);
//   }else{  text("Last Feed:" + lastFed + "AM",350,30);
// }

}


function addFood(){
  foods++
  database.ref('/').update({
  Food:foods
  })
}

function feedDog(){

    dog.addImage(happyDogImg);
    milkObj.updateFoodStock(milkObj.getFoodStock()-1);

    database.ref('/').update({
    Food:milkObj.getFoodStock(),
    FeedTime:hour()
  });
}
function showError(){
  console.log("Error in writing to the database");
}