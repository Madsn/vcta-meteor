Players = new orion.collection('players', {
  singularName: 'player',
  pluralName: 'players',
  link: {
    title: 'Players'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Name' }
    ]
  }
})
