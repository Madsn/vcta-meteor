Meteor.methods({
  acceptInvitation: function(invitationId) {
    if (!Meteor.userId())
      throw new Meteor.Error('not-authorized', 'Not authorized');

    var invitation = Invitations.findOne(invitationId);
    if (!invitation)
      throw new Meteor.Error('not-found', 'Invitation not found');

    var receiver = invitation.getReceiver();
    if (!receiver)
      throw new Meteor.Error('not-found', 'Receiver not found');

    var team = invitation.getTeam();
    if (!team)
      throw new Meteor.Error('not-found', 'Team not found');

    var captain = team.getCaptain();
    if (!captain)
      throw new Meteor.Error('not-found', 'Captain for team not found');

    Meteor.users.update({_id: invitation.receiver}, {$set: {teamId: invitation.sendingTeam}});
    Invitations.remove({_id: invitation._id});

    var captainEmail = captain.emails[0].address;
    if (captainEmail) {

      var subject = captain.username + ' has accepted your team invitation';
      var mailBody = 'Hello ' + Meteor.user().username + ',\n\n'
        + captain.username + ' has now joined your team, "' + team.name + '".';

      var emailOptions = {
        from: orion.config.get('email address'),
        to: captainEmail,
        subject: subject,
        text: mailBody
      };
      Email.send(emailOptions);
    }
  }
});
