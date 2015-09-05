TabularTables.Trips = new Tabular.Table({
  name: 'TripsList',
  collection: Trips,
  columns: [
    { data: 'date', title: 'Day',
      render: function(val) {
        return moment(val).format('DD MMMM');
      }
    },
    { data: 'distance', title: 'Distance (km)',
      render: function(val) {
        return val.toFixed(2);
      }
    },
    { tmpl: Meteor.isClient && Template.deleteTripButton },
    { tmpl: Meteor.isClient && Template.editTripButton },
    { tmpl: Meteor.isClient && Template.importedFromEndomondo }
  ],
  extraFields: ['endomondoId'],
  lengthMenu: [[50, -1], [50, "All"]],
  paging: true,
  searching: false,
  info: false,
  language: {
    zeroRecords: 'No trips exist for this user'
  }
});

TabularTables.TripsReadOnly = new Tabular.Table({
  name: 'TripsListReadOnly',
  collection: Trips,
  columns: [
    { data: 'date', title: 'Day',
      render: function(val) {
        return moment(val).format('DD MMMM');
      }
    },
    { data: 'distance', title: 'Distance (km)',
      render: function(val) {
        return val.toFixed(2);
      }
    },
    { tmpl: Meteor.isClient && Template.importedFromEndomondo }
  ],
  extraFields: ['endomondoId'],
  lengthMenu: [[50, -1], [50, "All"]],
  paging: true,
  searching: false,
  info: false,
  language: {
    zeroRecords: 'No trips exist for this user'
  }
});
