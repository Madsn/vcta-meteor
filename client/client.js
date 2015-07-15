Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.manageaccount.events({
  'click #deleteAccountBtn': function(){
    Meteor.call('deleteAccount');
  }
});

Template.manageaccount.helpers({
  getCurrentUser: function() {
    return Meteor.user();
  }
});

Template.dashboard.helpers({
  userInTeam: function() {
    return Meteor.user().teamId === undefined || Meteor.user().teamId === '' ? false : true;
  }
});

Template.custom_loginButtonsLoggedInDropdownActions.replaces('_loginButtonsLoggedInDropdownActions');

Deps.autorun(function(){
  Meteor.subscribe('userData');
});
