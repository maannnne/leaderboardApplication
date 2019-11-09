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
    return PlayersList.find({}, {sort: {score: -1, name: 1}}); //sort the players in score descending and name ascending order
  },
  'selectedClassHelper': function() {
    var playersID = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playersID == selectedPlayer){
      return "selected"; //this is the class name
    }
  },
  'showSelectedPlayer': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);  /*By using the findOne function, we can pass through the unique ID of a document as the only
    argument, and we’re able to avoid unnecessary overhead since this function will only ever
    attempt to retrieve a single document. It won’t look through the entire collection like the find
    function would. */
  }
});


Template.leaderboard.events({
    'click .player': function() {
      var playersID = this._id;
      Session.set('selectedPlayer', playersID);
    },

    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 1}});
    },

    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -   1}});
    },
    'click .removePlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
      PlayersList.remove({_id: selectedPlayer});
    }

});

Template.addNewPlayer.events({
  'submit form': function(e) {
    e.preventDefault(); //to prevent the browser default behaviour aka refresh after evey single click on submit 
    var newPlayerName = e.target.playerName.value;
    console.log(newPlayerName);
    var newPlayerScore = e.target.playerScore.value;
    console.log(newPlayerScore);
    PlayersList.insert({name: newPlayerName, score: newPlayerScore});
    newPlayerName = null;
  }
});