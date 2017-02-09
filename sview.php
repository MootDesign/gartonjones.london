<?php

$from = intval( $_GET[ 'from' ] );
$to = intval( $_GET[ 'to' ] );

$frame = intval( $_GET[ 'frame' ] );
$frame = sprintf('%03d', $frame);

$img = dirname( __FILE__ ) . "/img/sview/img_{$from}_{$to}_{$frame}.jpg";