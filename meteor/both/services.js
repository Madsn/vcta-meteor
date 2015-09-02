Services = {};

Services.Notifications = {
  add: function(userId, msg) {
    console.log('Adding notification');
    Notifications.insert({userId: userId, message: msg});
  }
};
