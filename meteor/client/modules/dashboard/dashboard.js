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
    Meteor.call('sendInvitation', receiverId, function(err) {
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
  endomondoAuthInfo: function() {
    return Session.get('endomondoAuthInfo', false);
  },
  endomondoTrips: function() {
    return Session.get('endomondoTrips', false);
  },
  loadingEndomondoTrips: function() {
    return Session.get('loadingEndomondoTrips', false);
  },
  formatStartTime: function(startTime) {
    return moment(startTime).format('MMMM DD YYYY, HH:MM');
  },
  formatDistance: function(distance) {
    return distance.toFixed(2);
  }
});


var callGetWorkouts = function(authInfo) {
  Meteor.call('getWorkouts', authInfo.username, authInfo.password, function(err, response) {
    if (err) {
      sAlert.error(err.reason);
    } else {
      if (response.statusCode === 204) {
        sAlert.info('No recent trips found on endomondo');
      } else {
        var receivedTrips = JSON.parse(response.content);
        var existingTrips = Trips.find({userId: Meteor.user()._id, endomondoId: {$ne: null}}).fetch();
        var trips = [];
        receivedTrips.forEach(function(el){
          var found = false;
          for (var i = 0; i< existingTrips.length; i++) {
            if (parseInt(existingTrips[i].endomondoId) === parseInt(el.id)) {
              found = true;
            }
          }
          if (!found) {
            trips.push(el);
          }
        });
        Session.set('endomondoTrips', trips);
        sAlert.info(trips.length + ' trips fetched from endomondo');
      }
    }
    Session.set('loadingEndomondoTrips', false);
  });
};

Template.endomondo.events({
  'submit #getWorkouts': function(event) {
    Session.set('loadingEndomondoTrips', true);
    event.preventDefault();
    var authInfo = {username: event.target.username.value, password: event.target.password.value};
    Session.set('endomondoAuthInfo', authInfo);
    callGetWorkouts(authInfo);
  },
  'submit #refreshWorkouts': function(event) {
    Session.set('endomondoTrips', false);
    Session.set('loadingEndomondoTrips', true);
    event.preventDefault();
    var authInfo = Session.get('endomondoAuthInfo');
    callGetWorkouts(authInfo);
  },
  'click #clearAuthInfo': function(event) {
    Session.set('endomondoAuthInfo', false);
    Session.set('endomondoTrips', false);
  },
  'click .endomondoTrip': function(event) {
    var endomondoId = event.target.dataset.id;
    console.log(event.target.dataset.start);
    var date = new Date(event.target.dataset.start.substr(0,10));
    if (Trips.find({userId: Meteor.user()._id, endomondoId: endomondoId}).count() == 0) {
      Trips.insert({
        endomondoId: endomondoId,
        distance: event.target.dataset.distance,
        date: date
      });
      sAlert.info('Trip was imported from endomondo');
    } else {
      sAlert.error('That trip has already been imported');
    }
    var updatedTrips = Session.get('endomondoTrips');
    lodash.remove(updatedTrips, function(x){
      var ret = parseInt(x.id) === parseInt(endomondoId);
      return ret;
    });
    Session.set('endomondoTrips', updatedTrips);
  }
});

Template.deleteTripButton.events({
  'click .deleteTrip': function() {
    Trips.remove(this._id);
    sAlert.info('Trip deleted');
  }
});
