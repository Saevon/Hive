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

var team = [
    'queen',
    'spider',
    'spider',
    'beetle',
    'beetle',
    'ant',
    'ant',
    'ant',
    'grasshopper',
    'grasshopper',
    'grasshopper'
];

function Board() {
    var turn = WHITE;

    var tiles = [];

    // Creates 2 teams with the required pieces
    for (var player in players) {
        team.forEach(function(elem) {
            tiles.push(new Tile(elem, players[player]));
        });
    }

    /*
     * Draws the current board
     *
     * x, y: pixel center
     */
    this.draw = function(x, y) {
        for (var i =0; i < tiles.length; i++) {
            tiles[i].draw(x, y);
        }
    };
}

var SIZE = 10;

function Tile(bug_type, owner) {
    var q = null;
    var r = null;
    var active = false;
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
     * Returns whether the tile is on the board right now
     */
    this.get_active = function() {
        return (q !== null);
    };

    /*
     * Draws the tile unto the given x, y center point
     */
     this.draw = function() {
        var ex = SIZE * 3/2 * q;
        var ey = size * sqrt(3) * (r + q / 2);


     };

}
