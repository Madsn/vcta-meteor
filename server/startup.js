Meteor.startup(function () {

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

Teams.after.insert(function (userId, doc) {
  Meteor.users.update(userId, {$set: {teamId: this._id}});
});

Teams.after.remove(function (userId, doc) {
  Meteor.users.update({teamId: doc._id}, {$unset: {teamId: ''}});
});

Meteor.publish('userData', function() {
  return Meteor.users.find(this.userId, {fields: {
    teamId: 1,
  }});
});
