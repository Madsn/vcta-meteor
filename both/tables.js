TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Players = new Tabular.Table({
  name: "PlayerList",
  collection: Players,
  columns: [
    { data: 'name', title: 'Name' }
  ]
});
