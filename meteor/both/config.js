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

orion.config.add('TEAM_MANAGEMENT', 'vcta settings', {
                    type: Boolean,
                    label: 'Should team management be active?',
                    public: true
                });

orion.config.add('START_DATE', 'vcta settings', {
                    type: Date,
                    label: 'First date of the contest',
                    public: true
                });

orion.config.add('END_DATE', 'vcta settings', {
                    type: Date,
                    label: 'Last date of the contest',
                    public: true
                });

orion.config.add('SIGNUP_ENABLED', 'vcta settings', {
                    type: Boolean,
                    label: 'Creation of new users enabled?',
                    public: true
                });

orion.dictionary.addDefinition('message', 'banner', {
    type: String,
    label: 'Banner message'
});

orion.dictionary.addDefinition('class', 'banner', {
    type: String,
    label: 'Bootstrap class for banner message (danger, warning, info, success)',
});

Options.set('forbidClientAccountCreation', orion.config.get('SIGNUP_ENABLED'));
