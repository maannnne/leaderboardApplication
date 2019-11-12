import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  // code to run on server at startup
});

export const PlayersList = new Mongo.Collection('players');


if(Meteor.isServer) {
    Meteor.publish('thePlayers', function(){ 
    return PlayersList.find({createdBy: this.userId});
   });


   Meteor.methods({
     'insertPlayer': function(newPlayerName, newPlayerScore) {
       var currentUserId = this.userId;
       PlayersList.insert({name: newPlayerName, score: newPlayerScore, createdBy: currentUserId});
     },

     'removePlayer': function(playerId) {
       var currentUserId = this.userId;
       PlayersList.remove({_id: playerId, createdBy: currentUserId});
     },

    //  'decrement': function(playerId) {
    //    PlayersList.update({score: {$inc: {score: -1}}})

    //  }
    //no ready yet
   });
}
