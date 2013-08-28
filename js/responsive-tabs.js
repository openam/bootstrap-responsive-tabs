
(function($) {
    var tabGroups         = $('.nav-tabs.responsive');
    var collapseDisplayed = ['xs', 'sm'];
    var hidden            = '';
    var visible           = '';

    $.each(collapseDisplayed, function() {
        hidden  += ' hidden-'+this;
        visible += ' visible-'+this;
    });

    $.each(tabGroups, function(){
        var $tabGroup = $(this);
        var tabs = $tabGroup.find('li a');

        var collapseDiv = $( "<div></div>", {
            "class" : "panel-group responsive" + visible,
            "id"    : 'collapse-' + $tabGroup.attr('id'),
        });

        $.each(tabs, function() {
            var $this = $(this);
            var active = '';
            if ($this.parent().hasClass('active')) {
                active = ' in';
            };
            collapseDiv.append(
                $('<div>').attr('class', 'panel panel-default').html(
                    $('<div>').attr('class', 'panel-heading').html(
                        $('<h4>').attr('class', 'panel-title').html(
                            $('<a>', {
                                'class' : 'accordion-toggle',
                                'data-toggle': 'collapse',
                                'data-parent' : '#collapse-' + $tabGroup.attr('id'),
                                'href' : '#collapse-' + $this.attr('href').replace(/#/g, ''),
                                'text': $this.html()

                            })
                        )
                    )
                ).append(
                    $('<div>', {
                        'id' : 'collapse-' + $this.attr('href').replace(/#/g, ''),
                        'class' : 'panel-collapse collapse'+active
                    }).html(
                        $('<div>').attr('class', 'panel-body').html(
                            $('#'+$this.attr('href').replace(/#/g, '')).html()
                        )
                    )
                )
            );
        });

        $tabGroup.after(collapseDiv);
        $tabGroup.addClass(hidden);
        $('.tab-content.repsonsive').addClass(hidden);
    });
})(jQuery);
