TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Players = new Tabular.Table({
  name: 'PlayerList',
  collection: Meteor.users,
  columns: [
    { data: 'username', title: 'Name',
      render: function(val) {
        return '<a href="/user/' + val + '">' + val + '</a>';
      }
    },
    { data: 'getTeamName()', title: 'Team',
      render: function(val) {
        if (!val) {
          return '';
        }
        return '<a href="/team/' + val + '">' + val + '</a>';
      }
    },
    { data: 'cyclingDays', title: 'Cycling days' },
    { data: 'distance', title: 'Distance' }
  ],
  paging: true,
  lengthMenu: [[50, -1], [50, "All"]],
  searching: true,
  info: false,
  language: {
    zeroRecords: 'No users exist yet'
  },
  sub: new SubsManager()
});

TabularTables.Teams = new Tabular.Table({
  name: 'TeamsList',
  collection: Teams,
  columns: [
    { data: 'name', title: 'Name',
      render: function(val) {
        return '<a href="/team/' + val + '">' + val + '</a>';
      }
    },
    { data: 'getCaptainName()', title: 'Captain',
      render: function(val) {
        return '<a href="/user/' + val + '">' + val + '</a>';
      }
    },
    { data: 'cyclingDays', title: 'Cycling days' },
    { data: 'totalDistance', title: 'Distance' }
  ],
  extraFields: ['captainUserId'],
  paging: true,
  lengthMenu: [[50, -1], [50, "All"]],
  searching: true,
  info: false,
  language: {
    zeroRecords: 'Fetching teams'
  },
  sub: new SubsManager()
});

TabularTables.Trips = new Tabular.Table({
  name: 'TripsList',
  collection: Trips,
  columns: [
    { data: 'date', title: 'Day',
      render: function(val) {
        return moment(val).format('DD MMMM');
      }
    },
    { data: 'distance', title: 'Distance',
      render: function(val) {
        return val + ' km';
      }
    },
    { tmpl: Meteor.isClient && Template.deleteTripButton },
    { tmpl: Meteor.isClient && Template.editTripButton }
  ],
  lengthMenu: [[50, -1], [50, "All"]],
  paging: true,
  searching: false,
  info: false,
  language: {
    zeroRecords: 'No trips exist for this user'
  }
});

TabularTables.Members = new Tabular.Table({
  name: 'MembersList',
  collection: Meteor.users,
  columns: [
    { data: 'username', title: 'Name',
      render: function(val) {
        return '<a href="/user/' + val + '">' + val + '</a>';
      }
    },
    { data: 'cyclingDays', title: 'Cycling days' },
    { data: 'distance', title: 'Distance' }
  ],
  paging: false,
  searching: false,
  info: false,
  language: {
    zeroRecords: 'Fetching team members..'
  }
});

TabularTables.SentInvitations = new Tabular.Table({
  name: 'SentInvitationsList',
  collection: Invitations,
  columns: [
    { data: 'getReceiverName()', title: 'Receiver' },
    { tmpl: Meteor.isClient && Template.deleteInvitationButton }
  ],
  paging: true,
  lengthMenu: [[50, -1], [50, "All"]],
  searching: false,
  info: false,
  language: {
    zeroRecords: 'No invitations sent'
  },
  extraFields: ['sendingTeam', 'receiver'],
  sub: new SubsManager()
});

TabularTables.ReceivedInvitations = new Tabular.Table({
  name: 'ReceivedInvitationsList',
  collection: Invitations,
  columns: [
    { data: 'getReceiverName()', title: 'Receiver' },
    { tmpl: Meteor.isClient && Template.acceptInvitationButton },
    { tmpl: Meteor.isClient && Template.declineInvitationButton },
  ],
  paging: true,
  lengthMenu: [[50, -1], [50, "All"]],
  searching: false,
  info: false,
  language: {
    zeroRecords: 'No invitations received'
  },
  extraFields: ['sendingTeam', 'receiver'],
  sub: new SubsManager()
});
