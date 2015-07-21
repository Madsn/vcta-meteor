var updateUserAndTeam = function(doc, daysDiff, distanceDiff) {
  Meteor.users.update({_id: doc.userId},
    {$inc: {cyclingDays: daysDiff, distance: distanceDiff}});
  if (doc.teamId) {
    Teams.update({_id: doc.teamId}, {$inc: {cyclingDays: daysDiff, totalDistance: distanceDiff}});
  }
};


var updateIfTeamChanged = function(userId, doc, scope) {
  if (scope.previous.teamId !== doc.teamId) {
    Teams.update(scope.previous.teamId,
      {$inc: {cyclingDays: -scope.previous.cyclingDays, totalDistance: -scope.previous.distance}});
    if (doc) {
      Teams.update(doc.teamId, {$inc: {cyclingDays: doc.cyclingDays, totalDistance: doc.distance}});
    }
  }
};

Meteor.users.after.update(function(userId, doc) {
  updateIfTeamChanged(userId, doc, this);
});

Meteor.users.after.remove(function(userId, doc) {
  updateIfTeamChanged(userId, doc, this);
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
  var daysDiff = Trips.findOne({_id: {$ne: doc._id},
    userId: doc.userId, date: doc.date}) ? 0 : 1;
  updateUserAndTeam(doc, daysDiff, doc.distance);
});

Trips.after.remove(function (userId, doc) {
  var daysDiff = Trips.findOne({_id: {$ne: doc._id},
    userId: doc.userId, date: doc.date}) ? 0 : 1;
  updateUserAndTeam(doc, -daysDiff, -doc.distance);
});

Trips.after.update(function (userId, doc) {
  var cyclingDaysDiff = 0;
  var distanceDiff = doc.distance - this.previous.distance;
  if (this.previous.date !== doc.date) {
    var newDateIsUnique = Trips.findOne({userId: doc.userId,
      date: doc.date, _id: {$ne: doc._id}}) ? 0 : 1;
    var oldDateIsUnique = Trips.findOne({userId: doc.userId,
      date: this.previous.date, _id: {$ne: doc._id}}) ? 0 : 1;
    cyclingDaysDiff = newDateIsUnique - oldDateIsUnique;
  }
  updateUserAndTeam(doc, cyclingDaysDiff, distanceDiff);
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

