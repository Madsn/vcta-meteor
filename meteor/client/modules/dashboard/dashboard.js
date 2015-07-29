Template._dash_trips.helpers({
  tripsSelector: function() {
    return {userId: Meteor.user()._id};
  },
  importFromEndomondo: function() {
    return Session.get('importFromEndomondo', false);
  }
});

Template._dash_trips.events({
  'click #importFromEndomondo': function() {
    Session.set('importFromEndomondo', true);
  },
  'click #closeEndomondoImport': function() {
    Session.set('importFromEndomondo', false);
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

Template.endomondo.helpers({
  loadingEndomondo: function() {
    return Session.get('loadingEndomondo', false);
  }
});

Template.endomondo.events({
  'submit #getWorkouts': function(event) {
    event.preventDefault();
    Session.set('loadingEndomondo', true);

    Meteor.call('getWorkouts', event.target.username.value, event.target.password.value, function(err, response) {
      Session.set('loadingEndomondo', false);
      if (err) {
        sAlert.error(err.reason);
      } else {
        if (response.statusCode === 204) {
          sAlert.info('No recent trips found on endomondo');
        } else {
          var trips = JSON.parse(response.content);
          sAlert.info(trips.length + ' trips fetched from endomondo');
        }
      }
    });
  }
})
