const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require('cors');
const moment = require('moment');
const lod = require('lodash');

mongoose
  .connect('mongodb://127.0.0.1:27017/TestDB')
  .then((result) => console.log("connected to database"))
  .catch((err) => console.log(err));

  mongoose.connection.on("connected", () => {
    console.log("connect success!");
  });

  app.listen(3000, () => {
    console.log("Listening on 3000");
  });

  app.use(bodyParser.json());
  app.use(cors());
  
const schema = new mongoose.Schema({
    ID: {type: String},
    'First Name': {type: String},
    'Last Name': {type: String},
    'Felony Date': {type: String},
    'Felony Type': {type: String},
  });
const Felony = mongoose.model('Felony',schema,"Felonies");

function weightedHarmonicMean(values, weights) {
  let numerator = values.length;
  let denominator = 0;
  
  for (let i = 0; i < values.length; i++) {
    denominator += (weights[i] * values[i]);
  }
  let score = (numerator / denominator) * 100;
  return score;
}

function CalcLastDate(felonies_arr){
  let last_felony_date= lod.sortBy(felonies_arr, 'Felony Date').reverse()[0]["Felony Date"];
  const currentDate = moment().format("YYYY-MM-DD");
  let difference = moment.duration(moment(currentDate).diff(moment(last_felony_date)));
  let weight = 1;
  let delta = "";

  if(difference.asYears() < 1){
    if(difference.asMonths() <1 ){
      difference = difference.asDays();
      weight = 5;
      delta = "days";
    }
    // more then one month
    else {
      difference=difference.asMonths();
      weight = 4;
      delta = "months";
    }
  }
  // more then one year
  else{
    difference = difference.asYears();
    delta = "years";
    if(difference > 20){
      weight = 0.5;
    }
    else if(difference > 10){
      weight = 1;
    }
    else if(difference >1){
      weight = 2;
    } 
  }
  return {"units":delta, "difference": difference,"weight":weight};
}

function CalcWeight(str_felonyType,specificFelonies,GeneralFelonies){
  let weight = 1;
  if(str_felonyType == "Traffic" ){
    if(specificFelonies > 5){
      weight = 2;
    }
    else{
      weight = 0.5;
    }
  }
  else if(str_felonyType == "Child Abuse"){
    if(specificFelonies > 0){
      weight = 2;
    }
    else{
      weight = 1;
    }
  }
  return weight;
}

app.get("/GetFelonies/:ID/:Felony", (req, res) => {
let felonyType=req.params.Felony;
let ID = req.params.ID;
let final_score=0;
let specific_count=0;
let general_count=0;
let date_weight = 0;
let description_specific="";
Felony.find({'ID': ID}).then((result) => {
  if(result.length === 0){
    final_score=100;
  }
  else {
    specific_count = result.filter(function(item){
    return item["Felony Type"]==felonyType;
  }).length;
  if(specific_count === 0){
    date_weight={"units":"", "difference": "","weight":0.1};
  }
  else {
    // calling a function to calculate a weight based on when is the last time the person commited a felony of that specific type //
    date_weight = CalcLastDate(result.filter(function(item){
    return item["Felony Type"]==felonyType;
  }));
  }
  general_count = result.filter(function(item){
    return (item["Felony Type"]=="Drugs" || item["Felony Type"]=="Violence");
  }).length;

  let felonies_weight = CalcWeight(felonyType,specific_count,general_count);

  final_score=weightedHarmonicMean([specific_count,general_count],[date_weight.weight,felonies_weight]);
  if(final_score == Infinity || final_score > 100){
    final_score=100;
  }
  }
  if(specific_count !=0){
    description_specific = "The last " + "'"+felonyType+"'" +" Felony was commited " + date_weight.difference + " "+ date_weight.units + " ago";
  }
  else{
    description_specific = "No felonies of type " + "'"+felonyType+"'" +" was commited";
  }
  
  let description_general = "There are " + general_count + " more felonies that were commited in the areas of 'Drugs' and 'Violence'";
  res.send({
    "Score": final_score,
    "Total_Specific_Felonies": specific_count,
    "Description_Specific": description_specific,
    "Description_General" : description_general
  });
  console.log(final_score);
  console.log(final_score);
});
})





