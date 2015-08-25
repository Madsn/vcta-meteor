Meteor.methods({
  acceptInvitation: function(invitationId) {
    if (!Meteor.userId())
      throw new Meteor.Error('not-authorized', 'Not authorized');

    var invitation = Invitations.findOne(invitationId);

    if (!invitation)
      throw new Meteor.Error('not-found', 'Invitation not found');

    Meteor.users.update({_id: invitation.receiver}, {$set: {teamId: invitation.sendingTeam}});
    Invitations.remove({_id: invitation._id});

    var captainEmail = invitation.getTeam().getCaptain().emails[0].address;
    if (captainEmail) {

      var subject = invitation.getReceiver().username + ' has accepted your team invitation';
      var mailBody = 'Email body text';

      var emailOptions = {
        from: 'vcta@systematic-pf.dk',
        to: captainEmail,
        subject: subject,
        text: mailBody
      };
      Email.send(emailOptions);
    }
  }
});
