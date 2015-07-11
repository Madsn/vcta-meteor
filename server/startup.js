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
