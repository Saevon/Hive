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
function gen_wrapper_tmpl() {
    return $('<div class="hive-wrapper"><div class="hex-board">');
}

/*
 * Generates the wrapper for the unused tiles
 */
function gen_unused_tmpl() {
    return $('<div class="unused">');
}

/*
 * Adds a new row wrapper to the given template, returning the row
 */
function add_row(template) {
    var row = $('<div class="hex-row">');

    template.find('.hex-board').append(row);

    return row;
}

/*
 * Generates the html for a single hex
 */
function add_tile(row, tile) {
    var hex = $('<div class="hex">');

    // Moves even tiles to the second row
    if (tile.is_even()) {
        hex.addClass('even');
    }

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
    var base_tmpl = $('<div class="board">');
    base_tmpl.append(gen_wrapper_tmpl());

    // First we generate the grid
    for (var i in grid.rows) {
        var row = grid.rows[i];

        var row_tmpl = add_row(base_tmpl);

        for (var j in row) {
            var tile = row[i];

            add_tile(row_tmpl);
        }
    }

    // Add the unused tiles
    var unused_tmpl = gen_unused_tmpl();
    base_tmpl.append(unused_tmpl);

    for (var t in grid.unused) {
        var u_tile = grid.unused[t];

        add_tile(unused_tmpl, u_tile);
    }

    // finally replace the old content
    $('body').empty().append(base_tmpl);
}



// Controllers
$(function() {
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


