var isTeamCaptain = function(userId, doc) {
  return userId && doc.captainUserId === userId;
};
/*
Teams.allow({
  insert: function(userId, doc) {
    return userId && Teams.find({captainUserId: userId}).count() === 0;
  },
  update: function(userId, doc) {
    return isTeamCaptain(userId, doc);
  },
  remove: function(userId, doc) {
    return isTeamCaptain(userId, doc);
  }
});

var isTripOwner = function(userId, doc) {
  return userId && userId === doc.userId;
};

Trips.allow({
  insert: function(userId, doc) {
    return isTripOwner;
  },
  update: function(userId, doc) {
    return isTripOwner;
  },
  remove: function(userId, doc) {
    return isTripOwner;
  }
});

var isCaptainOfSendingTeam = function(userId, doc) {
  var team = Teams.findOne({_id: doc.sendingTeam});
  if (!team) return false;
  return team.captainUserId === userId;
};

Invitations.allow({
  insert: function(userId, doc) {
    return isCaptainOfSendingTeam(userId, doc);
  },
  update: function(userId, doc) {
    return isCaptainOfSendingTeam(userId, doc) || doc.receiver === userId;
  },
  remove: function(userId, doc) {
    return isCaptainOfSendingTeam(userId, doc) || doc.receiver === userId;
  }
});
*/
