TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Players = new Tabular.Table({
  name: 'PlayerList',
  collection: Players,
  columns: [
    { data: 'name', title: 'Name' }
  ],
  paging: true,
  iDisplayLength: 50,
  searching: true,
  info: false,
  language: {
    zeroRecords: 'No users exist yet'
  }
});

TabularTables.Trips = new Tabular.Table({
  name: 'TripsList',
  collection: Trips,
  columns: [
    { data: 'date', title: 'Day', searchable: false,
      render: function(val) {
        console.log('formatting');
        return moment(val).format('DD MMMM');
      }
    },
    { data: 'distance', title: 'Distance', searchable: false,
      render: function(val) {
        return val + " km";
      }
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
