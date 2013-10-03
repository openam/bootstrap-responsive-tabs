if (typeof fakewaffle === 'undefined') {
    var fakewaffle = {};
}

fakewaffle.responsiveTabs = function (collapseDisplayed) {
    "use strict";
    var tabGroups         = $('.nav-tabs.responsive'),
        hidden            = '',
        visible           = '';

    if (typeof collapseDisplayed === 'undefined') {
        collapseDisplayed = ['xs', 'sm'];
    }

    $.each(collapseDisplayed, function (index, value) {
        hidden  += ' hidden-' + value;
        visible += ' visible-' + value;
    });

    $.each(tabGroups, function () {
        var $tabGroup   = $(this),
            tabs        = $tabGroup.find('li a'),
            collapseDiv = $("<div></div>", {
                "class" : "panel-group responsive" + visible,
                "id"    : 'collapse-' + $tabGroup.attr('id')
            });

        $.each(tabs, function () {
            var $this  = $(this),
                active = '';

            if ($this.parent().hasClass('active')) {
                active = ' in';
            }

            collapseDiv.append(
                $('<div>').attr('class', 'panel panel-default').html(
                    $('<div>').attr('class', 'panel-heading').html(
                        $('<h4>').attr('class', 'panel-title').html(
                            $('<a>', {
                                'class' : 'accordion-toggle',
                                'data-toggle': 'collapse',
                                'data-parent' : '#collapse-' + $tabGroup.attr('id'),
                                'href' : '#collapse-' + $this.attr('href').replace(/#/g, ''),
                                'html': $this.html()

                            })
                        )
                    )
                ).append(
                    $('<div>', {
                        'id' : 'collapse-' + $this.attr('href').replace(/#/g, ''),
                        'class' : 'panel-collapse collapse' + active
                    }).html(
                        $('<div>').attr('class', 'panel-body').html(
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
