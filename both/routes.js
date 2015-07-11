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
})

Router.configure({
  layoutTemplate: 'layout'
});
