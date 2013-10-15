function gen_field() {
    var white = gen_tiles();
    var black = gen_tiles();
}

function gen_tiles() {
    var tiles = array();
}

var BLACK = 0;
var WHITE = 1;
var PLAYERS = [WHITE, BLACK];
var PLAYERCOLOR = ['white', 'black'];

var team = [
    'queen',
    'spider',
    'spider',
//    'beetle',
//    'beetle',
    'ant',
    'ant',
    'ant',
    'grasshopper',
    'grasshopper',
    'grasshopper'
];

/*
 * Directions for our coordinate system.
 * Currently using Axial Coordinates.
 */
var TOPLEFT     = 0;
var TOPRIGHT    = 1;
var MIDDLELEFT  = 2;
var MIDDLERIGHT = 3;
var BOTTOMLEFT  = 4;
var BOTTOMRIGHT = 5; 
var DIRECTIONS  = [ [ 0,-1] , [+1,-1]
                    [-1, 0] , [+1, 0]
                    [-1,+1] , [ 1,+1]   ];


function Board() {
    var turn = WHITE;
    var tiles = [];
    var id = 0;

    /*
     * Creates 2 teams with the required pieces
     */ 
    for (var player in players) {
        team.forEach(function(elem) {
            tiles.push(new Tile(elem, players[player], i++));
        });
    }

    /*
     * Get neighbouring coordinates.
     */
    this.get_neighbour_q = function(dir,q) {
        return q + DIRECTIONS[dir][0];
    }
    this.get_neighbour_r = function(dir,r) {
        return r + DIRECTIONS[dir][r];
    }

    /*
     * Click Event
     */
    this.click = function(ID) {
        return false;
        // TODO
    }

    /*
     * Sets the output function so that the model
     * can update it
     */
    this.set_view = function(callback) {
        this._callback = callback;
    };

    /*
     * Draws the current board
     *
     * x, y: pixel center
     */
    this.draw = function() {
        // TODO: add the movement tiles to the grid

        // Get the top left corner
        var range = this.get_range();

        // TODO: Create a grid from this
        var grid = {
            rows: [],
            // TODO: add the unused tiles
            unused: []
        };

        var is_even = true;
        var ir = 0;
        var iq = 0;
        for (var i=0; i < range.height; i++) {
            var row = [];
            for (var q=range.left; q <= range.right; q++) {
                row.push(this.get_tile(q + qr, range.top + ir));
            }
            grid.rows.push(row);

            // The change in height goes r + 2, q + 1 for every
            // 2 rows, thus we need to alternate the change
            ir++;
            if (!is_even) {
                iq--;
            }

            is_even = !is_even;
        }

        // Tell the view that the grid has been updated
        this._callback(grid);
    };
}

/* 
 * Tile: a hexongon with a co-ordinate
 *
 */
function Tile(bug_type, owner, tileID) {
    var id = tileID;
    var q = null;
    var r = null;
    var active = false;
    var selected = false;
    var even = false;
    var type = bug_type;

    /*
     * Moves the bug to a new position, through teleportation
     * This does no validity checks
     */
    this.set_position = function(nq, nr) {
        q = nq;
        r = nr;
    };

    /*
     * Returns the current position of the tile
     */
    this.get_position = function() {
        return {
            q: q,
            r: r
        };
    };

    /*
     * Returns an ID
     */
    this.get_ID = function() {
        return {
            id: id,
            q: q,
            r: r,
            type: type
        };
    };

    /*
     * Returns color
     */
    this.get_color = function() {
        return PLAYERCOLOR[owner];
    }

    /*
     * Returns bug type
     */
    this.get_type = function() {
        return type;
    }

    /*
     * Checks to see if a tile can be moved.
     * Takes a q and r coordinate.
     *
     * Returns false if: tile can't be legally moved
     *                   no such tile exists
     */
    this.can_move_tile = function(grid) {
        var found = false;
        var neighbourFound = -1;

        return true;

        /*for (var i=0; i < tiles.length; i++) {
            if (tiles.isActive())

            var pos = tiles.get_position();
            if (pos.q == q && pos.r = r) {
                found = true;
            } else {
                DIRECTIONS.forEach(function(elem) {
                    if (pos.q == this.get_neighbour_q(elem,q) &&
                        pos.r == this.get_neighbour_r(elem,q)) {
                        // TODO
                        // IF TILES ABOVE
                    }
                });
                if (neighbourFound == -1) {
                    neighbourFound = i;
                }
            }
        }*/
        // TODO
    }

    /*
     * Return a list of possible moves.
     */
    this.get_moves = function(grid) {
        var moves = []

        if (this.can_move_tile(grid)) {
            if (this.get_type() == 'grasshopper') {
                for (var dir in DIRECTIONS) {
                    if (grid[q + dir[0]][r + dir[1]] != null) {
                        var count = 2;
                        while (grid[q + count*dir[0]][r + count*dir[1]] != null) {
                            count++;
                        }
                        moves.push(new Tile('move', owner, 'TODO'));
                        moves[moves.length].set_position(q+count*dir[0],r+count*dir[1]);
                    }
                }
            }
        }

        return moves;
    }

    /*
     * Returns whether the tile is on the board right now
     */
    this.is_active = function() {
        return active;
    };

    /*
     * Returns true if this is a move tile
     */
    this.is_move = function() {
        return (type == 'movement');
    }

    /*
     * Returns true if this tile is just used for padding.
     */
    this.is_padding = function() { 
        return (type == 'padding');
    };

    /*
     * Returns true if this is a bug tile
     */
    this.is_bug = function() {
        return (! (this.is_move() || this.is_padding()));
    }

    /*
     * Return true if its a
     */
    this.is_selected = function() { 
        return selected;
    };

    /*
     * Returns true if this tile is on an even row.
     * Temporarily stored on draw.
     */
    this.is_even = function() { 
        return even;
    };
}
