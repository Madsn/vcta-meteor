Teams.after.insert(function (userId, doc) {
  Meteor.users.update(userId, {$set: {teamId: this._id}});
});

Teams.after.remove(function (userId, doc) {
  Meteor.users.update({teamId: doc._id}, {$unset: {teamId: ''}});
});

Trips.after.insert(function (userId, doc) {
  var incrementCyclingDay = Trips.findOne({userId: doc.userId, date: doc.date}) ? 0 : 1;
  Meteor.users.update({_id: doc.userId}, {$inc: {cyclingDays: incrementCyclingDay, distance: doc.distance}});
});

Trips.after.remove(function (userId, doc) {
  var incrementCyclingDay = Trips.findOne({userId: doc.userId, date: doc.date, _id: {$ne: doc._id}}) ? 0 : 1;
  Meteor.users.update({_id: doc.userId}, {$inc: {cyclingDays: -incrementCyclingDay, distance: -doc.distance}});
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

