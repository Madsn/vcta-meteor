Tracker.autorun(function () {
  Meteor.subscribe("userData");
  Meteor.subscribe('trips');
  Meteor.subscribe('teams');
});

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
});

Template._team_management.events({
  'click #deleteTeamBtn': function(){
    Meteor.call('deleteTeam');
  }
});

Template.deleteTripButton.events({
  'click .deleteTripButton': function(event) {
    Meteor.call('deleteTrip', event.target.id);
  }
})

Template.custom_loginButtonsLoggedInDropdownActions.replaces('_loginButtonsLoggedInDropdownActions');
