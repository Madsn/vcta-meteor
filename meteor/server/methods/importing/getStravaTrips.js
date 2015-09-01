Meteor.methods({
  getStravaTrips: function(athleteId) {
    try {
      var result = HTTP.call('GET', 'https://www.strava.com/api/v3/athlete/activities',
          {params: {}});
      return result;
    } catch (ex) {
      throw new Meteor.Error('strava-sync-failed', 'Fetching trips from strava failed');
    }
  }
});
