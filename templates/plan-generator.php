<?php
require_once( 'svgbounds.php' );

$model = get_field( '3d_house_model' );
$folder = dirname( __FILE__ ) . "/../babylon/plans/$model/";
$map = $folder . "map.txt";

$dat = $folder . "map.dat" ;
if( ! file_exists( $dat ) ) {
    gj_dev_generate_map();
}

if( ! file_exists( $map ) ) {
    gj_generate_map_txt();
}

gj_create_map_plan();

function gj_generate_map_txt() {
    global $model, $folder;

    $mapfile = $folder . "map.dat";

    //Plan map missing
    if( ! file_exists( $mapfile ) ) return;

    /*
     * Open the map file
     */
    $data = file( $mapfile );
    $content = array();
    $size = array();
    foreach( $data as $a ) {
        $c = explode( ",", $a );

        $file = $folder . $c[0] . ".png";

        //Svg size ( I need it to calculate the right ratio
        if( substr( $c[0], 0, 3 ) == "svg" ) {
            $size[0] = $c[3];
            $size[1] = str_replace( PHP_EOL, "", $c[4] );
        }

        if( ! file_exists( $file ) ) continue;

        $content[ $c[0] ] = join( ",",
                                array(
                                    'file' => $c[0],
                                    'x' => $c[1],
                                    'y' => $c[2],
                                    'w' => $c[3],
                                    'h' => str_replace( PHP_EOL, "", $c[4] )
                                 ) );

        //Bg layer
        if( $c[0] != "0" ) {
            $s = getimagesize( $file );
            $size[2] = ( $s[0] > 160 ) ? $s[0] : 160;
            $size[3] = ( $s[1] > 1480 ) ? $s[1] : 148;
        }
    }

    $content = join( ",", $size ) . PHP_EOL . join( PHP_EOL, $content );

    file_put_contents( $folder . "map.txt", $content );
}


function gj_create_map_plan() {
    global $model, $folder, $blocks;

    $mapfile = $folder . "map.txt";

    //Load the data
    $images = file( $mapfile );

    $size = explode( ",", array_shift( $images ) );
    $ratio = $size[2] / $size[0];

    /*
     * If the image start with 0 can be hovered
     */
    $hover = array();
    foreach( $images as $row ) {
        $data = explode( ",", $row );
        $image = $data[0];

        $src = get_template_directory_uri() . "/babylon/plans/$model/{$image}.png";

        $class = ( $image[0] == "0" ) ? "block tooltips tooltip-me" : "";
        $block = "";

        if( preg_match( "/\d*$/", $data[0], $out ) ) {
            $block = $out[0];
        }

//
        $name = $blocks[ $block ][ 'name' ];
        if( empty( $name ) ) $name = get_the_title();

        $style = 'style="left:' . ( $data[1] * $ratio ) . 'px;top:' . ( $data[2] * $ratio ) . 'px" ';
        if( empty( $class ) ) $style = "";
        echo '<div class="' . $class . '" ' . $style . ' data-ttip="' . $name . '">';
        echo '<img id="m-' . $data[0] . '" data-width="' .
                $data[3] . '" data-height="' . $data[4] . '"' .
                ' data-block="' . $block . '" '.
                ' src="' . $src . '">';

        if( ! empty( $class ) ) {
            $name = $blocks[ $block ][ 'name' ];
            if( empty( $name ) ) $name = get_the_title();

//            echo '<span>' . $name . '</span>';
        }

        echo '</div>';
    }
}

function gj_dev_generate_map() {
    global $folder;

    //Parsed indexes
    $paths = array();

    $svg = glob( $folder . "*.svg" );
    $svg = $svg[0];

    $content = file_get_contents( $svg );
    //Svg size
    preg_match( '/width="(\d*)\"/', $content, $width );
    $width = $width[1];

    preg_match( '/height="(\d*)\"/', $content, $height );
    $height = floatval( $height[1] );

    //Get all paths
    preg_match_all( '/<path[^>]*/', $content, $paths );
    $paths = $paths[0];

    $out = array();

    $out[] = ( "svg,0,0,$width,$height" );
    foreach( $paths as $path ) {
        preg_match( '/id="([^"].*)./', $path, $ids );
        $id = $ids[1];

        //Real path
        preg_match( '/d="[^"](.*)/', $path, $draws );
        $draw = $draws[0];

        //Get path size
        $bounds = SvgBounds::fromPath( $draw );

        $out[] = join( ",", array(
                                    $id,
                                    $bounds->x1,
                                    abs( $height - $bounds->y2 ),
                                    $bounds->x2,
                                    $bounds->y2
                            )
                    );

        $paths[] = $id;
    }

    //Add non bg to map.dat
    foreach( glob( $folder . "*.png" ) as $file ) {
        $file = basename( $file );
        $file = str_replace( ".png", "", $file );

        if( ! in_array( $file, $paths ) ) {
            $out[] = $file . ",0,0,0,0";
        }
    }

    file_put_contents( $folder . '/map.dat', join( PHP_EOL, $out ) );
//    $bounds = SvgBounds::fromPath( 'm 103.97482,628.91868 38.0846,-173.5088 15.3402,5.5681 -3.5704,12.7228 142.8586,48.0124 c 0,0 2.3799,0.2015 5.8519,4.3508 3.4721,4.1494 3.2964,11.0241 3.6057,23.8248 0.3093,12.8006 -2.0374,50.4985 -2.0374,50.4985 l -75.5272,-7.1596 9.8091,-9.9469 0.9674,-19.1928 -11.5402,-12.6699 -17.9417,-2.5587 -15.6906,11.8906 -1.3613,16.9794 7.2746,11.5706 -33.8078,-4.788 -6.5641,39.7274 -24.8405,-3.1428 -0.5935,7.3691 25.1901,2.6171 -2.3143,14.9286 182.7869,22.886 4.6573,-29.353 4.0556,0.1492 17.5361,-141.1269 c 0,0 -5.0687,-3.653 -6.7642,-6.044 -1.6956,-2.391 -3.4092,-8.3022 -3.4092,-8.3022 l -2.6501,-2.1261 -188.935,-62.1228 -1.7853,6.425 -14.884,-5.9846 0.9199,-3.8464 -22.9363,-9.701 -22.8609,0.5389 -45.271296,211.7552 z' );
//
//    print_r( $bounds );
}

