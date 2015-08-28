if (Meteor.isClient){
  SimpleSchema.debug = true;
}

orion.config.add('EMAIL_ADDR', 'server', {
  type: String,
  label: 'Email address used as sender',
  public: false
});

orion.config.add('ENDOMONDO_SERVICE_URL', 'server', {
  type: String,
  label: 'URL to the endomondo sync service',
  public: false
});

orion.config.add('START_DATE', 'settings', {
  type: Date,
  label: 'First date of the contest',
  public: true
});

orion.config.add('END_DATE', 'settings', {
  type: Date,
  label: 'Last date of the contest',
  public: true
});

// TODO
/*
orion.config.add('SIGNUP_CLOSED', 'settings', {
  type: Boolean,
  label: 'Close signups?',
  public: true
});
*/

Options.set('forbidClientAccountCreation', false);
