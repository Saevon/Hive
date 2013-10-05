function gen_field() {
    var white = gen_tiles();
    var black = gen_tiles();
}

function gen_tiles() {
    var tiles = array();
}

function Tile(bug_type) {
    var x = 0;
    var y = 0;
    var active = false;
    var type = bug_type;

    this.set_position(nx,ny) {
        x = nx;
        y = ny;
    }

    this.get_position() {
        return array(x,y);
    }

    this.set_active() {
        this.active = true;
    }
}