Meteor.methods({
  deleteCurrentUser: function() {
    console.log(Meteor.userId());
    var userId = Meteor.user()._id;
    console.log(userId);
    Meteor.logout;
    Meteor.users.remove(userId);
  }
});
