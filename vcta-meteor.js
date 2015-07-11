if (Meteor.isClient) {
  Template.scoreboard.helpers({
    players: function() {
      return [
        {name: 'Player1'},
        {name: 'Player2'}
      ];
    }
  })
}
