Teams = new orion.collection('teams', {
  singularName: 'team', // The name of one of these items
  pluralName: 'teams', // The name of more than one of these items
  link: {
    title: 'Teams'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'name' },
    ]
  }
});

Trips = new orion.collection('trips', {
  singularName: 'trip', // The name of one of these items
  pluralName: 'trips', // The name of more than one of these items
  link: {
    title: 'Trips'
  },
  tabular: {
    columns: [
      { data: "userId", title: 'user' },
    ]
  }
});

Invitations = new orion.collection('teamInvitations', {
  singularName: 'invitation', // The name of one of these items
  pluralName: 'invitations', // The name of more than one of these items
  link: {
    title: 'Invitations'
  },
  tabular: {
    columns: [
    ]
  }
});

Notifications = new orion.collection('notifications', {
  singularName: 'notification',
  pluralName: 'notifications',
  link: {
    title: 'Notifications'
  },
  tabular: {
    columns: [
    ]
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
      decimal: true,
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
    /*
    min: new Date(2015, 7, 2),
    max: new Date(2015, 7, 32),
    */
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
    decimal: true,
    optional: false,
    min: 0.0,
    max: 350.0,
    autoform: {
      afFieldInput: {
        type: 'number'
      }
    }
  },
  endomondoId: {
    type: String,
    optional: true
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
  captainUserId: {
    type: String,
    optional: false,
    defaultValue: function() {
      return Meteor.user()._id;
    },
    custom: function() {
      if (Meteor.user().team !== undefined) {
        return 'Not permitted, user already belongs to a team';
      }
    }
  },
  cyclingDays: {
    type: Number,
    optional: false,
    defaultValue: 0
  },
  totalDistance: {
    type: Number,
    decimal: true,
    optional: false,
    defaultValue: 0
  },
  avgDays: {
    type: Number,
    optional: false,
    decimal: true,
    defaultValue: 0
  },
  avgDistance: {
    type: Number,
    optional: false,
    decimal: true,
    defaultValue: 0
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

Schema.Notifications = new SimpleSchema({
  userId: {
    type: String,
    optional: false
  },
  dateTime: {
    type: Date,
    optional: false,
    defaultValue: new Date()
  },
  message: {
    type: String,
    optional: false
  }
});

Notifications.attachSchema(Schema.Notifications);
