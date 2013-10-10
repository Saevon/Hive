$(function() {
    $('.hive-wrapper').on('click', '.hex', function(event) {
        console.log('selection', this);
    });
    $('.hive-wrapper').on('click', '.allowed', function(event) {
        console.log('place', this);
    });
});
