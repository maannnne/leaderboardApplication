import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import './main.html';
//new Mongo.Collection('players');
PlayersList = new Mongo.Collection('players');
// PlayersList.insert({name: "David", score: 0});
// PlayersList.insert({name: "Bob", score: 0});
// PlayersList.insert({name: "Amy", score: 0});



if(Meteor.isClient){
  console.log("Hello Client");
}

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
    // 'click .player': (e) => {  
    //   var playersID = e.target.id; //playersID-in talis enq targeted player i unique ID-n
    //   Session.set('selectedPlayer', playersID); //session enq sarqum selectedPlayer anunov u iran talis enq playersID-i arjeqy
    //   var selectedPlayer = Session.get('selectedPlayer'); //session-ic get enq anum ed arjeqy u talis enq selectedPlayer var-in 
    //   console.log(selectedPlayer); //output enq anum iran console um
    // }
    'click .player': function() {
      var playersID = this._id;
      Session.set('selectedPlayer', playersID);
    },
    'click .increment': function(){

    }
    //DO NOT USE ARROW FUNTIONS WHEN U NEED TO USE THIS KEYWORD
    //BASED ON CONTEXT IN WHICH IT IS CALLED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

});