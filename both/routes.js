Router.map(function() {
  this.route('dashboard', {
    path: '/'
  });
  this.route('rules');
  this.route('scoreboard');
})

Router.configure({
  layoutTemplate: 'layout'
});
