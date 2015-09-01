Meteor.methods({
  getEndomondoTrips: function(username, password) {
    try {
      var result = HTTP.call('POST', orion.config.get('endomondo service url'), {params: {username: username, password: password}});
      return result;
    } catch (ex) {
      throw new Meteor.Error('endomondo-sync-failed', 'Fetching trips from endomondo failed');
    }
    /*
      if (error) {
        console.log('throwing error');
        if (error.code && error.code === 'ECONNREFUSED') {
          throw new Meteor.Error('endomondo-sync-unreachable',
            'Sorry but it looks like the endomondo sync service is not running. Let the admin know, or try again later.');
        } else {
          throw new Meteor.Error('endomondo-sync-failed',
            'Something went wrong when attempting to fetch workouts from endomondo, possibly incorrect username/password combination');
        }
      } else {
        console.log('returning result');
        return result;
      }
    });
    console.log(result);
    return result;
    */
  }
});
