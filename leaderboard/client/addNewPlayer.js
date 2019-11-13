import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import './main.html';
import './templates/addNewPlayerTemp.html';
import './main';



Template.addNewPlayer.events({
    'submit form': function(e) {
      e.preventDefault();
      var newPlayerName = e.target.playerName.value;
      //var newPlayerName = $('[name=playerName]').val(); can do this too
      var newPlayerScore = Number(e.target.playerScore.value);
      if(newPlayerName.trim().length != 0){
        Meteor.call('insertPlayer', newPlayerName, newPlayerScore, Meteor.userId());
      }
      else {
        alert('Please select a valid string');
      }
      e.target.playerName.value = null;
      e.target.playerScore.value = null;
    }
});