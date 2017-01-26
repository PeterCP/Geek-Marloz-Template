window.jQuery = require('jquery')
window.Tether = require('tether')
require('bootstrap')

var $ = window.jQuery;

$(document).ready(function () {
    $('.navbar-toggler').click(function () {
        $(this).find('.hamburger-icon').toggleClass('open');
    });

    var searchForm = $('.search-form'),
        searchInput = $('.search-input'),
        searchBtn = $('.search-btn'); 
    searchBtn.on('click', function(e) {
        e.preventDefault();
        if (searchForm.hasClass('open') && searchInput.val()) {
            // TODO handle submitting;
            alert('submitting!');
        }
        searchForm.toggleClass('open');
    });
});
