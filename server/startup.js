if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}

Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    user.username = user.username || options.profile.name;
  }
  if (user.services && user.services.google) {
    user.emails = [{ address: user.services.google.email, verified: true }];
  }
  return user;
});

Teams.before.insert(function (userId, doc) {
  Meteor.users.update({_id: userId}, {$set: {team: doc.name}});
});
