Meteor.methods({
  deleteTeam: function() {
    if (!Meteor.userId())
      throw new Meteor.Error("not-authorized");
    Teams.remove({captainUserId: Meteor.userId()});
  }
});

