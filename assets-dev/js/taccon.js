$(function(){
    $('.tc-overlay').hide();

    $('.tc-btn').on('click', function (e) {
        e.preventDefault();
        var toLoad = $(this).attr('data-load');
        $('body').addClass('tc-overlay-active ' + toLoad);
        $('.tc-item').not(":first").hide();
        $('.tc-footer').hide();
        $('.tc-overlay.' + toLoad).show();
    });

    $('.tc-item:first').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass();
        $('.tc-item').not(":first").show();
        $('.tc-footer').show();
        $('.tc-overlay').hide();
    });
});
