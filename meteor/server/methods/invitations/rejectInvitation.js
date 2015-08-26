Meteor.methods({
  rejectInvitation: function(invitationId) {
    var invitation = Invitations.findOne(invitationId);
    var team = invitation.getTeam();
    var receiver = invitation.getReceiver();
    var captain = team.getCaptain();

    if (!Meteor.userId())
      throw new Meteor.Error('not-authorized', 'Not authorized');
    if (!team)
      throw new Meteor.Error('not-found', 'Team not found');
    if (!receiver)
      throw new Meteor.Error('not-found', 'Receiver not found');
    if (!catpain)
      throw new Meteor.Error('not-found', 'Captain not found');

    Invitations.remove(invitation._id);

    var captainEmail = captain.emails[0] ? captain.emails[0].address : null;

    if (captainEmail) {
      var subject = Meteor.user().username + ' has declined your team invitation';
      var mailBody = 'Hello ' + captain.username
        + ',\n\n' + Meteor.user().username + ' has declined to join your team: "' + team.name + '".';

      var emailOptions = {
        from: 'vcta@systematic-pf.dk',
        to: captainEmail,
        subject: subject,
        html: mailBody
      };
      Email.send(emailOptions);
    }
  }
});
