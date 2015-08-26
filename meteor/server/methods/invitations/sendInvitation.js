Meteor.methods({
  sendInvitation: function(receiverId) {
    var team = Teams.findOne({_id: Meteor.user().teamId});
    var receiver = Meteor.users.findOne({_id: receiverId});

    if (Meteor.userId() && team && receiver) {
      Invitations.insert({
        receiver: receiverId,
        sendingTeam: team._id
      });

      var subject = Meteor.user().username + ' has sent you a team invitation';
      var mailBody = 'Hello ' + receiver.username
        + ',\n\n' + Meteor.user().username + ' has invited you to join the team: "' + team.name + '".\n\n'
        + 'Log in at <a href="http://www.systematic-pf.dk">systeamtic-pf.dk</a> to accept or decline the offer.' ;

      var emailOptions = {
        from: 'vcta@systematic-pf.dk',
        to: receiver.emails[0].address,
        subject: subject,
        html: mailBody
      };
      Email.send(emailOptions);
    } else {
      throw new Meteor.Error('not-authorized', 'Not authorized');
    }
  }
});
