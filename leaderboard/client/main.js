import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import './main.html';
//new Mongo.Collection('players');
PlayersList = new Mongo.Collection('players');
//PlayersList.insert({name: "David", score: 0});


Template.leaderboard.helpers({
  'getPlayer': () => {
    return PlayersList.find().fetch();
  },
  'selectedClassHelper': function() {
    var playersID = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playersID == selectedPlayer){
      return "selected"; //this is the class name
    }
  }
});


Template.leaderboard.events({
    'click .player': function() {
      var playersID = this._id;
      Session.set('selectedPlayer', playersID);
    },

    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 1}});
    },

    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -1}});
    }
    //DO NOT USE ARROW FUNTIONS WHEN U NEED TO USE THIS KEYWORD
    //BASED ON CONTEXT IN WHICH IT IS CALLED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

});