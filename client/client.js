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

Template.custom_loginButtonsLoggedInDropdownActions.replaces('_loginButtonsLoggedInDropdownActions');

AutoForm.hooks({
  addTripForm: {
    onSubmit: function(insertDoc) {
      insertDoc.date.setHours(0,0,0,0);
      return true;
    }
  }
});
