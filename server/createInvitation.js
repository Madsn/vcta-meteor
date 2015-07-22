Meteor.methods({
  createInvitation: function(receiverId) {
    if (!Meteor.userId())
      throw new Meteor.Error('not-authorized');
    var invitation = Invitations.findOne({receiver: receiverId, sendingTeam: Meteor.user().teamId});
    if (invitation) {
      throw new Meteor.Error('already-invited', 'Invitation has already been sent to this user');
    } else {
      Invitations.insert({
        receiver: receiverId,
        sendingTeam: Meteor.user().teamId
      });
    }
  }
})
