import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import './main.html';


PlayersList = new Mongo.Collection('players');

console.log(Meteor.users);

if(Meteor.isClient){
  Template.leaderboard.helpers({
    'getPlayer': () => {
      var currentUserId = Meteor.userId(); 
      return PlayersList.find({createdBy: currentUserId}, {sort: {score: -1, name: 1}}); //sort the players in score descending and name ascending order
      //each user now has their own unique leaderboard w current user ID
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
        PlayersList.update(selectedPlayer, {$inc: {score: -1}});
      },

      'click .removePlayer': function() {
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.remove({_id: selectedPlayer});
      }
  });

  Template.addNewPlayer.events({
    'submit form': function(e) {
      e.preventDefault(); //to prevent the browser default behaviour aka refresh after every single click on submit 
      var newPlayerName = e.target.playerName.value;
      var newPlayerScore = Number(e.target.playerScore.value);
      var currentUserId = Meteor.userId();
      console.log(currentUserId);
      if(newPlayerName){
        PlayersList.insert({name: newPlayerName, score: newPlayerScore, createdBy: currentUserId});
      }
      e.target.playerName.value = null;
      e.target.playerScore.value = null;
    }
    
  });
}