if (Meteor.isClient){
  SimpleSchema.debug = true;
}

orion.config.add('email address', 'config', {
                    type: String,
                    label: 'Email address used as sender',
                    public: false
                });

orion.config.add('team management', 'config', {
                    type: Boolean,
                    label: 'Should team management be active?',
                    public: true
                });

orion.config.add('start date', 'config', {
                    type: Date,
                    label: 'First date of the contest',
                    public: true
                });

orion.config.add('end date', 'config', {
                    type: Date,
                    label: 'Last date of the contest',
                    public: true
                });

orion.config.add('endomondo service url', 'config', {
                    type: String,
                    label: 'URL to the endomondo sync service',
                    public: false
                });

orion.config.add('signup enabled', 'config', {
                    type: Boolean,
                    label: 'Creation of new users enabled?',
                    public: false
                });