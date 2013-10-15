/*
 * A mapping from bug type to the image for it
 */
var bug_image_map = {
    'ant': '/img/ant_raw.png',
    'beetle': '/img/raw_beetle.png',
    'grasshopper': '/img/raw_grasshopper.png',
    'spider': '/img/raw_spider.png',
    'queen': '/img/raw_tribal_queen.png'
};


/*
 * Generates the wrapper for the entire grid
 */
function gen_base() {
    var tmpl = $('<div class="hive-wrapper"><div class="hex-board"></div><div class="unused"></div></div>');
    $('body').append(tmpl);
}

/*
 * Returns the wrappers for the two board wrappers
 */
function get_board() {
    return $('hex-board').empty();
}
function get_unused() {
    return $('.unused').empty();
}

/*
 * Adds a new row wrapper to the given template, returning the row
 */
function add_row(template, even) {
    var row = $('<div class="hex-row">');
    if (even) {
        row.addClass('even');
    }

    template.find('.hex-board').append(row);

    return row;
}

/*
 * Generates the html for a single hex
 */
function add_tile(row, tile) {
    var hex = $('<div class="hex">');

    // Some tiles go here just to make the grid work
    if (tile.is_padding()) {
        hex.addClass('invisible');
    }

    // A tile could be selected right now
    if (tile.is_selected()) {
        hex.addClass('selected');
    }

    // Some tiles are there as valid moves
    if (tile.is_move()) {
        hex.addClass('allowed');
    }

    // TODO: generate the stack

    // Some tiles are actual bugs
    if (tile.is_bug()) {
        hex.addClass('bug');
        hex.addClass('player-' + tile.get_colour());

        var image = $('<img>');
        var bug_type = tile.get_type();
        image.attr('src', bug_image_map[bug_type]);
        hex.append(image);
    }

    // We need to store some information for events
    hex.data('id', tile.get_id());

    row.append(hex);
}

/*
 * Draws the hex grid unto the screen
 */
function draw(grid) {
    var base = get_board();

    // First we generate the grid
    for (var i in grid.rows) {
        var row = grid.rows[i];

        var row_tmpl = add_row(base, i % 2 === 0);

        for (var j in row) {
            var tile = row[i];

            add_tile(row_tmpl);
        }
    }

    // Add the unused tiles
    var unused_tmpl = get_unused();

    for (var t in grid.unused) {
        var u_tile = grid.unused[t];

        add_tile(unused_tmpl, u_tile);
    }
}



// Controllers
$(function() {
    gen_base();

    var grid = new Grid();
    grid.set_view(draw);

    $('.hive-wrapper').on('click', '.bug, .allowed', function(event) {
        var id = $(this).data('id');

        grid.click(id);
    });
    $('.unused').on('click', '.bug', function(event) {
        var id = $(this).data('id');

        grid.click(id);
    });


});


