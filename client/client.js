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
  selector: function() {
    return {receiver: Meteor.user()._id};
  }
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
    var receiverId = event.target.receiver.value;

    Invitations.insert({
      receiver: receiverId,
      sendingTeam: Meteor.user().teamId
    }, function(err) {
      if (err) {
        sAlert.error(err.reason);
      } else {
        sAlert.info('Invitation sent');
      }
    });
  }
});

Template._invite_players.rendered = function() {
  Meteor.typeahead.inject();
};

Template._invitations.helpers({
  selector: function() {
    return {sendingTeam: Meteor.user().teamId};
  }
});


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
