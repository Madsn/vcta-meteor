if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Router.route('/', function(){
  this.render('home');
});

Router.route('/page1', function(){
  this.render('page1');
});

Router.route('/page2', function(){
  this.render('page2');
});

Router.configure({
  layoutTemplate: 'layout'
});
