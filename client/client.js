Tracker.autorun(function () {
  Meteor.subscribe("userData");
  Meteor.subscribe('trips');
  Meteor.subscribe('teams');
  Meteor.subscribe('invitations');
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
    Meteor.call('deleteTeam', null, function (err) {
      if (err) {
        sAlert.error('Team deletion failed');
      } else {
        sAlert.info('Team successfully deleted');
      }
    });
  }
});

Template._team_management.helpers({
  managementEnabled: function() {
    return true;
  },
});

Template._invite_players.helpers({
  users: function() {
    var teamId = Meteor.user().teamId;
    if (!teamId) return [];
    var users = Meteor.users.find(
      {teamId: {$ne: teamId}}, {sort: {username: 1}}).fetch();
    return users;
  }
});

Template._invite_players.events({
  'submit #invitePlayerForm': function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    Meteor.call('createInvitation', event.target.receiver.value, function(err) {
      if (err) {
        console.log(err);
        sAlert.error('Invitation could not be sent: <br/>' + err.reason);
      } else {
        sAlert.info('Invitation sent');
      }
    });
  }
});

Template._invite_players.rendered = function() {
  Meteor.typeahead.inject();
};

Template.custom_loginButtonsLoggedInDropdownActions.replaces('_loginButtonsLoggedInDropdownActions');

AutoForm.hooks({
  addTeamForm: {
    onSuccess: function(formType, result) {
      sAlert.info('Team created');
    },
    onError: function(formType, error) {
      sAlert.error('Team creation failed');
    },
  }
});
