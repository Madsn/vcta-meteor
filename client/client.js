Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.manageaccount.events({
  'click #deleteAccountBtn': function(){
    Meteor.call('deleteCurrentUser');
    Router.go('dashboard');
  },
  'submit #changePasswordForm': function(event){
    console.log('Changing password');
    Accounts.changePassword(event.target.oldPassword, event.target.newPassword);
  }
});

Template.manageaccount.helpers({
  getCurrentUser: function() {
    return Meteor.user();
  }
});

Template.custom_loginButtonsLoggedInDropdownActions.replaces('_loginButtonsLoggedInDropdownActions');
