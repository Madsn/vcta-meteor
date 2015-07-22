Router.map(function() {
  this.route('dashboard');
  this.route('rules');
  this.route('scoreboard');
  this.route('manageaccount');
  this.route('root', {
    path: '/',
    action: function() {
      Router.go('/scoreboard');
    }
  });
  this.route('user', {
    path: '/user/:username',
    data: function() {
      var user = Meteor.users.findOne({username: this.params.username});
      return user;
    }
  });
  this.route('team', {
    path: '/team/:teamname',
    data: function() {
      var team = Teams.findOne({name: this.params.teamname});
      return team;
    }
  });
});

Router.configure({
  layoutTemplate: 'layout'
});
