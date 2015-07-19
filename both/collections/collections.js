Teams = new Meteor.Collection('teams');
Trips = new Meteor.Collection('trips');
Invitations = new Meteor.Collection('Invitations');

var isTeamCaptain = function(userId, doc) {
  return userId && doc.captainUserId === userId;
};

Teams.allow({
  insert: function(userId, doc) {
    return userId && Teams.find({captainUserId: userId}).count() === 0;
  },
  update: function(userId, doc) {
    return isTeamCaptain(userId, doc);
  },
  remove: function(userId, doc) {
    return isTeamCaptain(userId, doc);
  }
});

var isTripOwner = function(userId, doc) {
  return userId && userId === doc.userId;
};

Trips.allow({
  insert: function(userId, doc) {
    return isTripOwner;
  },
  update: function(userId, doc) {
    return isTripOwner;
  },
  remove: function(userId, doc) {
    return isTripOwner;
  }
});

var isCaptainOfSendingTeam = function(userId, doc) {
  var team = Teams.findOne({_id: doc.sendingTeam});
  if (!team) return false;
  return team.captainUserId === userId;
};

Invitations.allow({
  insert: function(userId, doc) {
    return isCaptainOfSendingTeam(userId, doc);
  },
  update: function(userId, doc) {
    return isCaptainOfSendingTeam(userId, doc) || doc.receiver === userId;
  },
  remove: function(userId, doc) {
    return isCaptainOfSendingTeam(userId, doc) || doc.receiver === userId;
  }
});

Schema = {};

Schema.User = new SimpleSchema({
    username: {
      type: String,
      regEx: /^([a-z0-9A-Z_]{1,20}\s?){1,4}$/,
      optional: false
    },
    emails: {
      type: [Object],
      // this must be optional if you also use other login services like facebook,
      // but if you use only accounts-password, then it can be required
      optional: false
    },
    teamId: {
      type: String,
      optional: true
    },
    'emails.$.address': {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      optional: false
    },
    'emails.$.verified': {
      type: Boolean,
      optional: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ['admin'], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
      type: Object,
      optional: true,
      blackbox: true
    },
    services: {
      type: Object,
      optional: true,
      blackbox: true
    },
    cyclingDays: {
      type: Number,
      optional: false,
      defaultValue: 0,
      min: 0
    },
    distance: {
      type: Number,
      optional: false,
      defaultValue: 0,
      min: 0
    }
});

Meteor.users.attachSchema(Schema.User);

Schema.Trips = new SimpleSchema({
  userId: {
    type: String,
    optional: false,
    autoValue: function() {
      return Meteor.user()._id;
    }
  },
  date: {
    type: Date,
    optional: false,
    min: new Date(2015, 7, 2),
    max: new Date(2015, 7, 32),
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datepicker',
        datePickerOptions: {
          format: 'dd/mm/yyyy',
          weekStart: 1,
          autoclose: true
        }
      }
    }
  },
  distance: {
    type: Number,
    optional: false,
    decimal: true,
    min: 0,
    max: 350,
    autoform: {
      afFieldInput: {
        type: 'number'
      }
    }
  }
});

Trips.attachSchema(Schema.Trips);

Schema.Teams = new SimpleSchema({
  name: {
    type: String,
    optional: false,
    unique: true,
    regEx: /^([a-z0-9A-Z_]{1,20}\s?){1,4}$/,
  },
  captain: {
    type: Object,
    optional: false,
  },
  'captain.userId': {
    type: String,
    optional: false,
    autoValue: function() {
      return Meteor.user()._id;
    },
    custom: function() {
      if (Meteor.user().team !== undefined) {
        return 'Not permitted, user already belongs to a team';
      }
    }
  },
  'captain.username': {
    type: String,
    optional: false,
    autoValue: function() {
      return Meteor.user().username;
    }
  }
});

Teams.attachSchema(Schema.Teams);

Schema.Invitations = new SimpleSchema({
  receiver: {
    type: String,
    optional: false
  },
  sendingTeam: {
    type: String,
    optional: false
  }
});

Invitations.attachSchema(Schema.Invitations);
