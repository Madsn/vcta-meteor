orion.dictionary.addDefinition('team_management', 'settings', {
  type: Boolean,
  label: 'Should team management be active?',
  defaultValue: true
});

orion.dictionary.addDefinition('message', 'banner', {
  type: String,
  label: 'Banner message'
});

orion.dictionary.addDefinition('class', 'banner', {
  type: String,
  label: 'Bootstrap class for banner message (danger, warning, info, success)',
});
