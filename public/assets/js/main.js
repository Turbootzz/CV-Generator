// form repeater
$(document).ready(function () {
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    })
})

function reloadJs(src) {
    src = $('script[src$="' + src + '"]').attr("src");
    $('script[src$="' + src + '"]').remove();
    $('<script/>').attr('src', src).appendTo('head');
}

// choose template
var $result = $('#result');
$('#change-template1').click(function () {
    $result.load('../../views/partials/template1.ejs');
    reloadJs('assets/js/generator.js');
});
$('#change-template2').click(function () {
    $result.load('../../views/partials/template2.ejs');
});
$('#change-template3').click(function () {
    $result.load('../../views/partials/template3.ejs');
});