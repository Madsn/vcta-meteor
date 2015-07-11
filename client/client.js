Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.editprofile.events({
  'click #deleteAccountBtn': function(){
    Meteor.call('deleteCurrentUser');
    Router.go('dashboard');
  }
})
