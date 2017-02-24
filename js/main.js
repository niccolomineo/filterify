(function ($) {

    /*
     * Filterify 1.1
     * by Niccolò Mineo
     * www.github.com/niccolomineo/filterify
     */

    $(document).ready(function () {

        $.fn.filterify = function (options) {

            var $selects = this.not('.btn-group');

            var $buttons = $selects.siblings('button'),
                settings = $.extend({
                    containerId: 'filters-view',
                    searchInputId: 'filters-search',
                    searchedElements: 'h2',
                    searchedElementsParent: '.row',
                    parentElementBgColor: '#8E201F'
                }, options);

            var selectsClass = $selects.attr('class').replace(/^|\s+/g, '.'),
                buttonsClass = '.bootstrap-select button',
                $container = $('#' + settings.containerId),
                containerMacroCategory = ' > *[data-tokens]',
                $searchInput = $("#" + settings.searchInputId);

            var $containerMacroCategory = $('#' + settings.containerId + containerMacroCategory),
                $categoriesButFirst = $buttons.not(':eq(0)').siblings('.dropdown-menu').find(' li[data-original-index=0] .text'),
                categoriesNamesButFirst = [];

            $selects
                .not(':eq(0)')
                .prop('disabled', true);

            $buttons
                .not(':eq(0)')
                .addClass('disabled');

            $selects
                .eq(0)
                .parent()
                .css({'background-color': settings.parentElementBgColor});

            $buttons
                .eq(0)
                .closest('.filter')
                .css({'background-color': settings.parentElementBgColor});

            $(selectsClass + ':gt(0)')
                .find('option')
                .hide();

            $(buttonsClass + ':gt(0)')
                .siblings('.dropdown-menu')
                .find('li')
                .hide();

            $containerMacroCategory
                .hide();

            $selects
                .on('change', function (e) {

                    var currentSelectIndex = $selects.index(this);

                    var $nextSelect = $selects.eq(currentSelectIndex + 1),
                        $nextButton = $buttons.eq(currentSelectIndex + 1),
                        $nextSelects = $(selectsClass + ':gt(' + currentSelectIndex + ')'),
                        $nextButtons = $(buttonsClass + ':gt(' + currentSelectIndex + ')'),
                        currentOptionAttr = $(this).find(':selected').attr('data-tokens'),
                        currentListItemAttr = $(this).siblings('.dropdown-menu').find('li.selected a').attr('data-tokens');

                    var $nextOptionsNotMatching = $nextSelect.find('option:not([data-tokens*="' + currentOptionAttr + '"])'),
                        $nextAnchorsNotMatching = $nextButton.siblings('.dropdown-menu').find('li a:not([data-tokens*="' + currentListItemAttr + '"])'),
                        $nextOptionsMatching = $nextSelect.find('option[data-tokens*="' + currentOptionAttr + '"]'),
                        $nextAnchorsMatching = $nextButton.siblings('.dropdown-menu').find('li a[data-tokens*="' + currentListItemAttr + '"]'),
                        $childrenNotMatchingCurrentOption = $container.find(' > *:not([data-tokens*="' + currentOptionAttr + '"])'),
                        $childrenNotMatchingCurrentListItem = $container.find(' > *:not([data-tokens*="' + currentListItemAttr + '"])'),
                        $childrenMatchingCurrentOption = $container.find(' > *[data-tokens*="' + currentOptionAttr + '"]'),
                        $childrenMatchingCurrentListItem = $container.find(' > *[data-tokens*="' + currentListItemAttr + '"]');

                    $nextOptionsNotMatching
                        .hide();

                    $nextAnchorsNotMatching
                        .closest('li')
                        .hide();

                    $nextSelects
                        .prop('disabled', true);

                    $nextButtons
                        .addClass('disabled');

                    $childrenNotMatchingCurrentOption
                        .hide();

                    $childrenNotMatchingCurrentListItem
                        .hide();

                    if ($nextOptionsMatching.length > 0 || $nextAnchorsMatching.length > 0) {

                        $nextSelect
                            .prop('disabled', false);

                        $nextButton
                            .removeClass('disabled');

                        $buttons
                            .siblings('.dropdown-menu')
                            .find('li[data-original-index=0]')
                            .show();

                        // $nextSelect
                        //     .not(':disabled')
                        //     .parent()
                        //     .css({'background-color': settings.parentElementBgColor});

                        $nextButton
                            .not('.disabled')
                            .closest('.filter')
                            .css({'background-color': settings.parentElementBgColor});

                    }

                    if ($selects.is(':disabled') || $buttons.hasClass('disabled')) {

                        $(selectsClass + ':disabled')
                            .parent()
                            .removeAttr('style');

                        $(buttonsClass + '.disabled')
                            .closest('.filter')
                            .removeAttr('style');

                        $categoriesButFirst.each(function () {
                            categoriesNamesButFirst.push($(this).text());
                        });

                        $buttons
                            .not(':eq(0)')
                            .find('.filter-option')
                            .each(function (i) {

                                $(this)
                                    .closest('button')
                                    .attr({
                                        'title': categoriesNamesButFirst[i]
                                    });

                                $(this)
                                    .text(categoriesNamesButFirst[i]);
                            });

                    }

                    $(this)
                        .siblings('button')
                        .attr({
                            'title': e.target.value
                        });

                    $(this)
                        .siblings('button')
                        .find('.filter-option')
                        .text(e.target.value);

                    $(this)
                        .find('option')
                        .eq(0)
                        .text(e.target.value);

                    $nextOptionsMatching
                        .show();

                    $nextAnchorsMatching
                        .closest('li')
                        .show();

                    $nextSelects
                        .find('option:nth-of-type(1)')
                        .prop('selected', true);

                    $nextButtons
                        .siblings('.dropdown-menu')
                        .find('li[data-original-index=0]')
                        .addClass('selected');

                    $childrenMatchingCurrentOption
                        .show();

                    $childrenMatchingCurrentListItem
                        .show();

                    // Add bottom border to results
                    $('#' + settings.containerId + ' > *[data-tokens] > ' + settings.searchedElementsParent + ' ' + settings.searchedElements)
                        .closest(settings.searchedElementsParent)
                        .removeClass('border-bottom');

                    $('#' + settings.containerId + ' > *[data-tokens] > ' + settings.searchedElementsParent + ' ' + settings.searchedElements + ':visible:not(:last)')
                        .closest(settings.searchedElementsParent)
                        .addClass('border-bottom');

                });

            $searchInput.on("change paste keyup", function () {

                var $childrenContent = $('#' + settings.containerId + ' > *[data-tokens] ' + settings.searchedElementsParent + ' ' + settings.searchedElements + ':contains(' + $(this).val() + ')');

                $selects
                    .not(':eq(0)')
                    .prop('disabled', true);

                $buttons
                    .not(':eq(0)')
                    .addClass('disabled');

                $selects
                    .find('option:nth-of-type(1)')
                    .prop('selected', true);

                $buttons
                    .siblings('.dropdown-menu')
                    .find('li')
                    .removeClass('selected');

                $categoriesButFirst.each(function () {
                    categoriesNamesButFirst.push($(this).text());
                });

                $buttons
                    .not(':eq(0)')
                    .find('.filter-option')
                    .each(function (i) {

                        $(this)
                            .closest('button')
                            .attr({
                                'title': categoriesNamesButFirst[i]
                            });

                        $(this)
                            .text(categoriesNamesButFirst[i]);
                    });

                $buttons
                    .siblings('.dropdown-menu')
                    .find('li[data-original-index=0]')
                    .addClass('selected');

                $buttons
                    .siblings('.dropdown-menu')
                    .find('li[data-original-index=0]')
                    .show();

                $(selectsClass + ':disabled')
                    .parent()
                    .removeAttr('style');

                $(buttonsClass + '.disabled')
                    .closest('.filter')
                    .removeAttr('style');

                $containerMacroCategory
                    .hide();

                $containerMacroCategory
                    .find(settings.searchedElementsParent)
                    .hide();

                $childrenContent
                    .closest('*[data-tokens]')
                    .show();

                $childrenContent
                    .closest(settings.searchedElementsParent)
                    .show();

                if ($searchInput.val() === '' || $searchInput.val() === ' ') {
                    $containerMacroCategory
                        .hide();
                }

                // Add bottom border to results
                $('#' + settings.containerId + ' > *[data-tokens] > ' + settings.searchedElementsParent + ' ' + settings.searchedElements)
                    .closest(settings.searchedElementsParent)
                    .removeClass('border-bottom');

                $('#' + settings.containerId + ' > *[data-tokens] > ' + settings.searchedElementsParent + ' ' + settings.searchedElements + ':visible:not(:last)')
                    .closest(settings.searchedElementsParent)
                    .addClass('border-bottom');

            });

            $.expr[":"].contains = $.expr.createPseudo(function (arg) {
                return function (elem) {
                    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                };
            });

            return $selects;
        };

    });

})(jQuery);
