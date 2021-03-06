Tracker.autorun(function () {
  Meteor.subscribe("userData");
  Meteor.subscribe('trips');
  Meteor.subscribe('teams');
  Meteor.subscribe('invitations');
  Meteor.subscribe('notifications');
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
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

Handlebars.registerHelper('toFixed', function(val) {
  return val.toFixed(2);
});

Template.layout.events({
  'click #addNotification': function() {
    Services.Notifications.add(Meteor.user()._id, 'Test message');
  }
});

Template.layout.helpers({
  notifications: function() {
    if (Meteor.userId()) {
      return Notifications.find();
    } else {
      return [];
    }
  }
})
