Meteor.methods({
  deleteCurrentUser: function() {
    var userId = Meteor.userId();
    Meteor.logout;
    Meteor.users.remove(userId);
  }
});
