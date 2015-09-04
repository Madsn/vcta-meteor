Meteor.publish('userData', function() {
  return Meteor.users.find({}, {fields: {teamId: 1, username: 1, cyclingDays: 1, distance: 1}});
});

Meteor.publish('teams', function() {
  return Teams.find();
});

Meteor.publish('trips', function() {
  return Trips.find();
});

Meteor.publish('teamInvitations', function() {
  return Invitations.find();
  //return Invitations.find({sendingTeam: Meteor.user().teamId});
});

Meteor.publish('notifications', function() {
  if (this.userId)
    return Notifications.find({userId: this.userId}, {sort: {dateTime: -1}, limit: 20});
});
