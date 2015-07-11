Router.map(function() {
  this.route('dashboard', {
    path: '/'
  });
  this.route('rules');
  this.route('scoreboard');
  this.route('editprofile');
})

Router.configure({
  layoutTemplate: 'layout'
});
