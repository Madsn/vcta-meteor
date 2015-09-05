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
