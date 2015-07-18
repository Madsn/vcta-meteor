Meteor.methods({
  deleteTrip: function(tripId) {
    var trip = Trips.findOne(tripId);
    if (!trip || !Meteor.userId()
        || trip.userId !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    } else {
      Trips.remove(trip._id);
    }
  }
});
