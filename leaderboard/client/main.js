import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './main.html';
import './templates/addNewPlayerTemp.html';
import './templates/leaderboardTemp.html';
import './addNewPlayer';
import './leaderboard';


PlayersList = new Mongo.Collection('players');
Meteor.subscribe('thePlayers');

