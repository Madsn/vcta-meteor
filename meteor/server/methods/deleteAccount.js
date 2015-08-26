Meteor.methods({
  deleteAccount: function() {
    var userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error('not-authorized');
    } else {
      Trips.remove({user_id: userId});
      Invitations.remove({receiver: userId});
      Meteor.users.remove({_id: userId});
    }
  }
});
