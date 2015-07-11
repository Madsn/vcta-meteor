Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.editprofile.events({
  'click #deleteAccountBtn': function(){
    Meteor.call('deleteCurrentUser');
    Router.go('dashboard');
  }
});

Template.editprofile.helpers({
  getCurrentUser: function() {
    console.log(Meteor.user());
    return Meteor.user();
  }
});
