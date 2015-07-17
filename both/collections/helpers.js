Meteor.users.helpers({
  getTeamName: function() {
    console.log('getTeamName called');
    // TODO - refactor: https://dweldon.silvrback.com/common-mistakes
    var user = Meteor.users.findOne(this._id);
    console.log(user);
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
  }
});

Teams.helpers({
  getCaptainName: function() {
    console.log('getCaptainName called');
    // TODO - refactor: https://dweldon.silvrback.com/common-mistakes
    var user = Meteor.users.findOne(this.captainUserId);
    return user.username;
  }
});
