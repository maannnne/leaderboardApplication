//new Mongo.Collection('players');
PlayersList = new Mongo.Collection('players');
// PlayersList.insert({name: "David", score: 0});
// PlayersList.insert({name: "Bob", score: 0});
// PlayersList.insert({name: "Betty", score: 0});

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './main.html';


if(Meteor.isClient){
  console.log("Hello Client");
}

Template.leaderboard.helpers({
  'getPlayer': () => {
    return PlayersList.find();
  }
});


Template.leaderboard.events({
    'click .player': () => {
      Session.set('selectedPlayer', )
    }

})
