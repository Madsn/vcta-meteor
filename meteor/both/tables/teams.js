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
    { data: 'distance', title: 'Distance', render: function(val) {return val.toFixed(2);}   }
  ],
  paging: true,
  searching: false,
  info: false,
  language: {
    zeroRecords: 'Fetching team members..'
  }
});

TabularTables.Teams = new Tabular.Table({
  name: 'TeamsList',
  collection: Teams,
  columns: [
    { data: null, title: '', orderable: false },
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
    { data: 'totalDistance', title: 'Distance', render: function(val) {return val.toFixed(2);}  },
    { data: 'avgDays', title: 'Days/member', render: function(val) {return val.toFixed(2);} },
    { data: 'avgDistance', title: 'Distance/member', render: function(val) {return val.toFixed(2);} },
  ],
  extraFields: ['captainUserId'],
  paging: true,
  lengthMenu: [[50, -1], [50, "All"]],
  searching: true,
  info: false,
  language: {
    zeroRecords: 'Fetching teams'
  },
  createdRow: function( row, data, dataIndex ) {
    var firstCell = row.querySelector('td');
    firstCell.innerHTML = dataIndex + 1;
  },
  sub: new SubsManager()
});

TabularTables.Players = new Tabular.Table({
  name: 'PlayerList',
  collection: Meteor.users,
  columns: [
    { data: null, title: '', orderable: false },
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
    { data: 'distance', title: 'Distance', render: function(val) {return val.toFixed(2);}  }
  ],
  paging: true,
  lengthMenu: [[50, -1], [50, "All"]],
  searching: true,
  info: false,
  language: {
    zeroRecords: 'No users exist yet'
  },
  createdRow: function( row, data, dataIndex ) {
    var firstCell = row.querySelector('td');
    firstCell.innerHTML = dataIndex + 1;
  },
  sub: new SubsManager()
});
