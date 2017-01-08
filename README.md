jQuery/Bootstrap data filtering and instant search.

# Instructions

### Basic usage
Pass a class to apply the crossfiltering functionality to the `select` elements.

    $('.filters-select').filterify()

### Custom settings
Pass custom settings to the `filterify` method.

The currently implemented settings are:

| Setting            | Default Value       | Description                                                 |
| ------------------ | ------------------- | ----------------------------------------------------------- |
| *containerId*      | filters-container   | Container element's id for the tagged content wrappers      |
| *searchInputId*    | filters-search      | Search input box' id                                        |
| *searchedElements* | h2                  | Elements you want the search engine to act on and display   |

Final result example:

    $('.filters-select').filterify({ selectsClass: 'filters-select', containerId: 'filters-container', searchInputId: 'filters-search', searchedElements: 'h2'})

See demo [here](http://www.niccolomineo.com/demos/filterify/).