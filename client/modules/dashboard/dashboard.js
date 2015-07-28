Template._dash_trips.helpers({
  tripsSelector: function() {
    return {userId: Meteor.user()._id};
  }
});

Template._invitations.helpers({
  selector: function() {
    return {sendingTeam: Meteor.user().teamId};
  }
});

Template.acceptInvitationButton.events({
  'click .acceptInvitation': function(event) {
    bootbox.confirm('Are you sure?', function(result) {
      if (result) {
        Meteor.call('acceptInvitation', event.target.id, function(err) {
          if (err) {
            sAlert.error('Error accepting invitation:<br/>' + err.reason);
          } else {
            sAlert.info('Team invitation accepted');
          }
        })
      }
    });
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
