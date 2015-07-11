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


Router.route('/', function(){
  this.render('home');
});

Router.route('/page1', function(){
  this.render('page1');
});

Router.route('/scoreboard', function(){
  this.render('scoreboard');
});

Router.configure({
  layoutTemplate: 'layout'
});
