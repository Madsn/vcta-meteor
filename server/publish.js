Meteor.publish('userData', function() {
  return Meteor.users.find({}, {fields: {teamId: 1, username: 1, cyclingDays: 1, distance: 1}});
});

Teams.publish('teams', function() {
  return Teams.select();
});

Trips.publish('trips', function() {
  return Trips.select();
});

Invitations.publish('invitations', function() {
  return Invitations.select();
  //return Invitations.find({sendingTeam: Meteor.user().teamId});
});
