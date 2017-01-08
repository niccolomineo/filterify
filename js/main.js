/*
 * Filterify 1.0
 * by Niccolò Mineo
 * www.github.com/niccolomineo/filterify
 */

(function ($) {

    $.fn.filterify = function (options) {

        var $selects = this,
            selectsClass = this.attr('class').replace(/^|\s+/g, '.'),
            settings = $.extend({
                containerId: 'filters-view',
                searchInputId: 'filters-search',
                searchedElements: 'h2'
            }, options),
            $container = $('#' + settings.containerId),
            containerChildrenTag = ' > *[rel]',
            $searchInput = $("#" + settings.searchInputId)

        var $containerChildren = $('#' + settings.containerId + containerChildrenTag);

        $selects
            .not(':eq(0)')
            .prop('disabled', true);

        $(selectsClass + ':gt(0)')
            .find('option')
            .hide();

        $containerChildren
            .hide();

        $selects
            .on('change', function () {

                var currentSelectIndex = $selects.index(this);

                var $nextSelect = $selects.eq($selects.index(this) + 1),
                    $nextSelects = $(selectsClass + ':gt(' + currentSelectIndex + ')'),
                    currentOptionAttr = $(this).find(":selected").attr('rel');

                var $nextOptionsNotMatching = $nextSelect.find('option:not([rel*="' + currentOptionAttr + '"])'),
                    $nextOptionsMatching = $nextSelect.find('option[rel*="' + currentOptionAttr + '"]'),
                    $childrenNotMatchingCurrentOption = $container.find(' > *:not([rel*="' + currentOptionAttr + '"])'),
                    $childrenMatchingCurrentSelectOption = $container.find(' > *[rel*="' + currentOptionAttr + '"]');

                $nextOptionsNotMatching
                    .hide();

                $nextSelects
                    .prop('disabled', true);

                $childrenNotMatchingCurrentOption
                    .hide();

                if ($nextOptionsMatching.length > 0) {
                    $nextSelect
                        .prop('disabled', false);
                }

                $nextOptionsMatching
                    .show();

                $nextSelects
                    .find('option:nth-of-type(1)')
                    .prop('selected', true);

                $childrenMatchingCurrentSelectOption
                    .show();
            });

        $searchInput.on("change paste keyup", function () {

            var $childrenContent = $('#' + settings.containerId + ' > *[rel] ' + settings.searchedElements + ':contains(' + $(this).val() + ')');

            $selects
                .not(':eq(0)')
                .prop('disabled', true);

            $selects
                .find('option:nth-of-type(1)')
                .prop('selected', true);

            $containerChildren
                .hide();

            $childrenContent
                .closest('*[rel]')
                .show();

            if ($searchInput.val() === '' || $searchInput.val() === ' ') {
                $containerChildren
                    .hide();
            }
        });

        return $selects;
    };

})(jQuery);