import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  // code to run on server at startup
});

export const PlayersList = new Mongo.Collection('players');


if(Meteor.isServer){
  console.log("Hello Server");
}
