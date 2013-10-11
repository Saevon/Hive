$(function() {
    $('.hive-wrapper').on('click', '.bug', function(event) {
        console.log('select', this);
    });
    $('.hive-wrapper').on('click', '.allowed', function(event) {
        console.log('place', this);
    });
    $('.unused').on('click', '.bug', function(event) {
        console.log('select', this);
    });
});
