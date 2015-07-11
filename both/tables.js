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
    { data: 'date', title: 'Day', searchable: false },
    { data: 'distance', title: 'Distance', searchable: false }
  ],
  paging: false,
  searching: false,
  info: false,
  language: {
    zeroRecords: 'No trips exist for this user'
  }
});
