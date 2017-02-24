jQuery/Bootstrap data filtering, instant search and display.

# Instructions
### Dependencies
This plugin requires [Bootstrap](http://getbootstrap.com) and [bootstrap-select.js](https://silviomoreto.github.io/bootstrap-select/). You should ensure they load before this plugin.
### Basic usage
Use the `rel` attribute in the html page to design a unique relationship between each select, the search field, the container and its elements where content will be displayed.

Pass a class to the jQuery object to initialize the plugin:

    $('.filters-select').filterify()

### Custom settings
Pass custom settings to the `filterify` method.

The currently implemented settings are:

| Setting            | Default Value       | Description                                                 |
| ------------------ | ------------------- | ----------------------------------------------------------- |
| *containerId*      | filters-container   | Container element's id for the tagged content wrappers      |
| *searchInputId*    | filters-search      | Search input box' id                                        |
| *searchedElements* | h2                  | Elements you want the search engine to act on and display   |
| *searchedElements* | .row                | Default parent selector for the above element's parent      |
| *parentElementBgColor* | #8E201F         | Each select's container's background color                  |

Final result example:

    $('.filters-select').filterify({ selectsClass: 'filters-select', containerId: 'filters-container', searchInputId: 'filters-search', searchedElements: 'h2'})

See demo [here](http://www.niccolomineo.com/demos/filterify/).