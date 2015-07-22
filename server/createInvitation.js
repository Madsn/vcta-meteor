Meteor.methods({
  createInvitation: function(receiverId) {
    if (!Meteor.userId())
      throw new Meteor.Error('not-authorized');

  }
})
