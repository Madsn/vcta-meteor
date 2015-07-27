var onUserModified = function(userId, doc, scope) {
  var user = Meteor.users.findOne(doc._id);
  if (user) {
    user.updateCyclingDaysAndDistance();
  }
  var oldTeam = Teams.findOne(scope.previous.teamId);
  var newTeam = Teams.findOne(doc.teamId);
  if (oldTeam && newTeam !== oldTeam) {
    oldTeam.updateCyclingDaysAndDistance();
  }
  if (newTeam) {
    newTeam.updateCyclingDaysAndDistance();
  }
};

var onTripModified = function(userId, doc, scope) {
  var user = Meteor.users.findOne(userId);
  user.updateCyclingDaysAndDistance();
  var team = Teams.findOne(user.teamId);
  if (team) {
    team.updateCyclingDaysAndDistance();
  }
};

Meteor.users.after.update(function(userId, doc) {
  onUserModified(userId, doc, this);
});

Meteor.users.after.remove(function(userId, doc) {
  onUserModified(userId, doc, this);
});

Teams.after.insert(function (userId, doc) {
  Meteor.users.update(userId, {$set: {teamId: this._id}});
  var captain = Meteor.user();
  Teams.update({_id: doc._id}, {$set: {cyclingDays: captain.cyclingDays, totalDistance: captain.distance}});
});

Teams.after.remove(function (userId, doc) {
  Meteor.users.update({teamId: doc._id}, {$unset: {teamId: ''}});
});

Trips.after.insert(function (userId, doc) {
  onTripModified(userId, doc, this);
});

Trips.after.remove(function (userId, doc) {
  onTripModified(userId, doc, this);
});

Trips.after.update(function (userId, doc) {
  onTripModified(userId, doc, this);
});

Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    user.username = user.username || options.profile.name;
  }
  if (user.services && user.services.google) {
    user.emails = [{ address: user.services.google.email, verified: true }];
  }
  return user;
});

Invitations.before.insert(function(userId, doc) {
  if (Invitations.findOne({receiver: doc.receiver, sendingTeam: doc.sendingTeam, _id: {$ne: doc._id}})) {
    throw new Meteor.Error('duplicate', 'That person has already been invited');
  }
});
