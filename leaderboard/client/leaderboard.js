import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import './main.html';
import './templates/leaderboardTemp.html';
import './main';

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
      var currentUserId = Meteor.userId();
      return PlayersList.findOne({createdBy: currentUserId, _id: selectedPlayer});
    },

    'getPlayers': function() {
      var currentUserId = Meteor.userId();
      return PlayersList.find({createdBy: currentUserId}).fetch();
    }
  });


  Template.leaderboard.events({
    'click .player': function() {
      var playersID = this._id;
      Session.set('selectedPlayer', playersID);
    },

    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('increment', selectedPlayer);
    },

    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('decrement',  selectedPlayer);
    },

    'click .removePlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayer', selectedPlayer);
    }
});
