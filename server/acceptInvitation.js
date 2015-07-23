Meteor.methods({
  acceptInvitation: function(invitationId) {
    if (!Meteor.userId())
      throw new Meteor.Error('not-authorized', 'Not authorized');
    var invitation = Invitations.findOne(invitationId);
    if (!invitation)
      throw new Meteor.Error('not-found', 'Invitation not found');
    Meteor.users.update({_id: invitation.receiver}, {$set: {teamId: invitation.sendingTeam}});
    Invitations.remove({_id: invitation._id});
  }
});
