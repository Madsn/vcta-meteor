Router.route('/', function(){
  this.render('home');
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
