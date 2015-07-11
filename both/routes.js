Router.route('/', function(){
  this.render('dashboard');
});

Router.route('/rules', function(){
  this.render('rules');
});

Router.route('/scoreboard', function(){
  this.render('scoreboard');
});

Router.configure({
  layoutTemplate: 'layout'
});
