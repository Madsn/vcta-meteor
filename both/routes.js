Router.map(function() {
  this.route('dashboard', {
    path: '/'
  });
  this.route('rules');
  this.route('scoreboard');
  this.route('manageaccount');
})

Router.configure({
  layoutTemplate: 'layout'
});
