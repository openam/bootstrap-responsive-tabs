if (typeof fakewaffle === 'undefined') {
    var fakewaffle = {};
}

fakewaffle.responsiveTabs = function (collapseDisplayed) {
    "use strict";
    var tabGroups         = $('.nav-tabs.responsive'),
        hidden            = '',
        visible           = '';

    if (typeof collapseDisplayed === 'undefined') {
        collapseDisplayed = ['phone', 'tablet'];
    }

    $.each(collapseDisplayed, function (index, value) {
        hidden  += ' hidden-' + value;
        visible += ' visible-' + value;
    });

    $.each(tabGroups, function () {
        var $tabGroup   = $(this),
            tabs        = $tabGroup.find('li a'),
            collapseDiv = $("<div></div>", {
                "class" : "accordion responsive" + visible,
                "id"    : 'collapse-' + $tabGroup.attr('id')
            });

        $.each(tabs, function () {
            var $this  = $(this),
                active = '';

            if ($this.parent().hasClass('active')) {
                active = ' in';
            }

            collapseDiv.append(
                $('<div>').attr('class', 'accordion-group').html(
                    $('<div>').attr('class', 'accordion-heading').html(
                        $('<a>', {
                            'class' : 'accordion-toggle',
                            'data-toggle': 'collapse',
                            'data-parent' : '#collapse-' + $tabGroup.attr('id'),
                            'href' : '#collapse-' + $this.attr('href').replace(/#/g, ''),
                            'html': $this.html()
                        })
                    )
                ).append(
                    $('<div>', {
                        'id' : 'collapse-' + $this.attr('href').replace(/#/g, ''),
                        'class' : 'accordion-body collapse' + active
                    }).html(
                        $('<div>').attr('class', 'accordion-inner').html(
                            $('#' + $this.attr('href').replace(/#/g, '')).html()
                        )
                    )
                )
            );
        });

        $tabGroup.after(collapseDiv);
        $tabGroup.addClass(hidden);
        $('.tab-content.responsive').addClass(hidden);
    });
};
