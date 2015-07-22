Meteor.publish('userData', function() {
  return Meteor.users.find({}, {fields: {teamId: 1, username: 1, cyclingDays: 1, distance: 1}});
});

Meteor.publish('teams', function() {
  return Teams.find();
});

Meteor.publish('trips', function() {
  return Trips.find();
});

Meteor.publish('invitations', function() {
  return Invitations.find();
  //return Invitations.find({sendingTeam: Meteor.user().teamId});
});
