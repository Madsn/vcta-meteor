Meteor.startup(function () {

    sAlert.config({
        effect: 'genie',
        position: 'bottom-right',
        timeout: 2500,
        html: true,
        onRouteClose: false,
        stack: true,
        offset: 0
    });

});
