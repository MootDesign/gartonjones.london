<?php
if( ! isset( $_COOKIE[ '_tcs_accepted' ] ) ) {
    _redirect_to_parent();
}

$token = $_COOKIE[ '_tcs_accepted' ];

//Valid token?
$valid = false;

$tokens =  get_option( "_gj_tokens", array() );
foreach( $tokens as $id => $t ) {
    if( $t[ 'token' ] == $token ) {
        $valid = ( $t[ 'expire' ] >= mktime() );

        unset( $tokens[ $id ] );
        break;
    }
}

update_option( "_gj_tokens", $tokens );

if( ! $valid ) _redirect_to_parent();

function _redirect_to_parent() {
    global $post;

    $link = home_url() . '/tenant-services/';

    // $link = get_permalink( $post->post_parent );
    header('Location: ' . $link );

    die();
}

require_once( 'templates/confirmation.php' );
