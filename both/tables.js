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
    { data: 'getCyclingDays()', title: 'Cycling days' },
    { data: 'getTotalDistance()', title: 'Distance' }
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
    { data: 'getCyclingDays()', title: 'Cycling days' },
    //{ data: 'getTotalDistance()', title: 'Distance' }
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
    { data: 'date', title: 'Day', searchable: false,
      render: function(val) {
        return moment(val).format('DD MMMM');
      }
    },
    { data: 'distance', title: 'Distance', searchable: false,
      render: function(val) {
        return val + ' km';
      }
    },
    {
      tmpl: Meteor.isClient && Template.deleteTripButton
    },
    {
      tmpl: Meteor.isClient && Template.editTripButton
    }
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
    { data: 'getCyclingDays()', title: 'Cycling days' },
    { data: 'getTotalDistance()', title: 'Distance' }
  ],
  paging: false,
  searching: false,
  info: false,
  language: {
    zeroRecords: 'Fetching team members..'
  }
});
