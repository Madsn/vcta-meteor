Meteor.users.helpers({
  getTeamName: function() {
    console.log('getTeamName called');
    // TODO - refactor: https://dweldon.silvrback.com/common-mistakes
    var user = Meteor.users.findOne(this._id);
    if (!user.teamId) return '';
    var team = Teams.findOne(user.teamId);
    return team ? team.name : '';
  },
  hasTeam: function() {
    console.log('hasTeam called');
    var ret = this.teamId === undefined || this.teamId === '' ? false : true;
    return ret;
  },
  isCaptain: function() {
    console.log('isCaptain called');
    var team = Teams.findOne({_id: Meteor.user().teamId});
    return team ? team.captainUserId === this._id : false;
  },
  getCyclingDays: function() {
    console.log('getCyclingDays called');
    var days = _.uniq(Trips.find({userId: this._id})
                .fetch().map(function(x) {
                  return x.date;
                }), true);
    return days.length;
  },
  getTotalDistance: function() {
    console.log('getTotalDistance called');
    var distance = _.reduce(_.map(Trips.find({userId: this._id})
                    .fetch(), function(x) {
                      return x.distance;
                    }),
                    function(prev, current) {
                      return prev + current;
                    }, 0);
    return distance;
  },
  updateCyclingDaysAndDistance: function() {
    Meteor.users.direct.update(this._id,
      {$set: {cyclingDays: this.getCyclingDays(), distance: this.getTotalDistance()}});
  }
});

Teams.helpers({
  getCaptainName: function() {
    console.log('getCaptainName called');
    // TODO - refactor: https://dweldon.silvrback.com/common-mistakes
    var user = Meteor.users.findOne({_id: this.captainUserId});
    return user.username;
  },
  getCyclingDays: function() {
    console.log('getCyclingDays(Team) called');
    var days = _.reduce(Meteor.users.find({teamId: this._id})
                  .fetch().map(function(x) {
                    return x.cyclingDays;
                  }),
                  function(prev, current) {
                    return prev + current;
                  }, 0);
    return days;
  },
  getTotalDistance: function() {
    console.log('getTotalDistance(Team) called');
    var distance = _.reduce(Meteor.users.find({teamId: this._id})
                      .fetch().map(function(x) {
                        return x.distance;
                      }),
                      function(prev, current) {
                        return prev + current;
                      }, 0);
    return distance;
  },
  updateCyclingDaysAndDistance: function() {
    var cyclingDays = this.getCyclingDays();
    var totalDistance = this.getTotalDistance();
    var avgDays = cyclingDays / Meteor.users.find({teamId: this._id}).count();
    console.log(avgDays);
    Teams.direct.update(this._id,
      {$set: {cyclingDays: cyclingDays, totalDistance: totalDistance, avgDays: avgDays}});
  }
});

Invitations.helpers({
  getReceiverName: function() {
    console.log('getReceiverName');
    var user = Meteor.users.findOne({_id: this.receiver});
    return user.username;
  }
});
