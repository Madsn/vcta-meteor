Meteor.methods({
  validUserForNewCaptain: function(name) {
    var user = Meteor.users.findOne({username: name});
    if (user === undefined || user === null) {
      throw new Meteor.Error(400, 'Error 500: Not found', 'the document is not found');
    }
    return true;
  }
});

