Meteor.publish('userData', function() {
  return Meteor.users.find({}, {fields: {teamId: 1}});
});

Meteor.publish('teams', function() {
  return Teams.find();
});

Meteor.publish('trips', function() {
  return Trips.find();
});
