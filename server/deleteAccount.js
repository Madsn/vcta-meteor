Meteor.methods({
  deleteAccount: function() {
    var userId = this.userId;
    if (userId) {
      //Trips.remove({user_id: userId});
      Meteor.users.remove({_id: userId});
    }
  }
});
