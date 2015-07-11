if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() < 1) {
      Players.insert({
        name: 'Player1'
      });
      Players.insert({
        name: 'Player2'
      });
      Players.insert({
        name: 'Player3'
      });
      Players.insert({
        name: 'Player4'
      });
    }
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
