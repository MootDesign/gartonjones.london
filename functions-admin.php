<?php

/**
 * Add "Apartment editor" meta box
 */
function gj_aparment_editor_meta_box() {
  if( ! current_user_can( 'manage_options' ) ) return;

  enqueue_background_scripts();

  add_meta_box( 'gj-editor-meta-box', 'Apartment editor', 'gj_apartment_editor_meta_box_content', 'post' );
  add_meta_box( 'gj-editor-meta-box', 'Apartment editor', 'gj_apartment_editor_meta_box_content', 'gj_plotting_editor' );

  //Riverview
//  add_meta_box( 'gj-riverview-meta-box', 'River view', 'gj_river_view_meta_box_content', 'developments' );
}

function gj_admin_offices_page() {
    global $paged;

    wp_enqueue_script('google-maps', 'http://maps.google.com/maps/api/js?v=3&sensor=false&key=AIzaSyDosc7irSGR_cv-kJb6iHNcFk9S4EM7nyI', array(), '1.0', true );
    wp_enqueue_script( 'gj-sview', get_template_directory_uri() . "/js/admin-sview.js" );

    if( isset( $_GET[ 'add' ] ) ) {
        update_option( 'gj_chelseabridgewharf_tel', $_GET[ 'chelsea' ] );
        update_option( 'gj_westminster_tel', $_GET[ 'westminster' ] );
        update_option( 'gj_victoria-pimlico_tel', $_GET[ 'victoria-pimlico' ] );
        update_option( 'gj_nineelms_tel', $_GET[ 'nine' ] );
        update_option( 'gj_southbank_tel', $_GET[ 'southbank' ] );

        update_option( 'gj_chelseabridgewharf_address', $_GET[ 'chelsea-address' ] );
        update_option( 'gj_westminster_address', $_GET[ 'westminster-address' ] );
        update_option( 'gj_victoria-pimlico_address', $_GET[ 'victoria-pimlico-address' ] );
        update_option( 'gj_nineelms_address', $_GET[ 'nine-address' ] );
        update_option( 'gj_southbank_address', $_GET[ 'southbank-address' ] );

        update_option( 'gj_chelseabridgewharf_coords', $_GET[ 'chelsea-coords' ] );
        update_option( 'gj_westminster_coords', $_GET[ 'westminster-coords' ] );
        update_option( 'gj_victoria-pimlico_coords', $_GET[ 'victoria-pimlico-coords' ] );
        update_option( 'gj_nineelms_coords', $_GET[ 'nine-coords' ] );
        update_option( 'gj_southbank_coords', $_GET[ 'southbank-coords' ] );

        $offices = array( 'chelsea' => 'chelseabridgewharf',
        'westminster' => 'westminster',
        'victoria-pimlico' => 'victoriapimlico',
        'nine' => 'nineelms',
        'southbank' => 'southbank' );
        $postcodes = "";
        foreach( $offices as $key => $office ) {
          update_option( 'gj_' . $office . '_postcodes', $_GET[ $key . '-postcodes' ] );
          $postcodes .= $_GET[ $key . '-postcodes' ];

          update_option( 'gj_' . $office . '_mail', $_GET[ $key . '-mail' ] );
          update_option( 'gj_' . $office . '_skype', $_GET[ $key . '-skype' ] );
        }
        update_option( 'gj_offices_postcodes', $postcodes );
        // update_option( 'gj_nineelms_postcodes', $_GET[ 'nine-postcodes' ] );
        // update_option( 'gj_westminster_postcodes', $_GET[ 'westminster-postcodes' ] );
        // update_option( 'gj_offices_postcodes', sprintf( "%s,%s", $_GET[ 'nine-postcodes' ], $_GET[ 'westminster-postcodes' ] ) );
    }
?>
<div id="wrap">
    <h1>Garton Jones' offices</h1>
    <form>
    <input type="hidden" name="page" value="<?php echo $_GET[ 'page' ] ?>">
    <input type="hidden" name="add" value="1">
    <table>
        <tr>
            <th>Office</th>
            <th>Address</th>
            <th>Phone</th>
            <th>GMaps coord</th>
            <th>Postcodes</th>
            <th>Mail</th>
            <th>Skype</th>
        </tr>
        <tr>
            <td style="padding-right:20px">
                <label for="chelsea">
                    Chelsea Brige Wharf
                </label>
            </td>
            <td>
                <textarea name="chelsea-address" id="chelsea-address"><?php echo get_option( 'gj_chelseabridgewharf_address', '' ) ?></textarea>
            </td>
            <td>
                <input name="chelsea" id="chelsea" value="<?php echo get_option( 'gj_chelseabridgewharf_tel', '' ) ?>" />
            </td>
            <td>
                <input name="chelsea-coords" id="chelsea-coords" class="gmaps-coords" value="<?php echo get_option( 'gj_chelseabridgewharf_coords', '' ) ?>" />
            </td>
            <td>
                <input name="chelsea-postcodes" id="chelsea-postcodes" class="gmaps-postcodes" value="<?php echo get_option( 'gj_chelseabridgewharf_postcodes', '' ) ?>" />
            </td>
            <td>
                <input name="chelsea-mail" id="chelsea-mail" class="gmaps-mail" value="<?php echo get_option( 'gj_chelseabridgewharf_mail', '' ) ?>" />
            </td>
            <td>
                <input name="chelsea-skype" id="chelsea-skype" class="gmaps-skype" value="<?php echo get_option( 'gj_chelseabridgewharf_skype', '' ) ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <label for="westminster">
                    Westminster &amp; St James’s
                </label>
            </td>
            <td>
                <textarea name="westminster-address" id="westminster-address"><?php echo get_option( 'gj_westminster_address', '' ) ?></textarea>
            </td>
            <td>
                <input name="westminster" id="westminster" value="<?php echo get_option( 'gj_westminster_tel', '' ) ?>" />
            </td>
            <td>
                <input name="westminster-coords" id="westminster-coords" class="gmaps-coords" value="<?php echo get_option( 'gj_westminster_coords', '' ) ?>" />
            </td>
            <td>
                <input name="westminster-postcodes" id="westminster-postcodes" class="gmaps-postcodes" value="<?php echo get_option( 'gj_westminster_postcodes', '' ) ?>" />
            </td>
            <td>
                <input name="westminster-mail" id="westminster-mail" class="gmaps-mail" value="<?php echo get_option( 'gj_westminster_mail', '' ) ?>" />
            </td>
            <td>
                <input name="westminster-skype" id="westminster-skype" class="gmaps-skype" value="<?php echo get_option( 'gj_westminster_skype', '' ) ?>" />
            </td>

        </tr>
         <tr>
            <td>
                <label for="victoria-pimlico">
                    Victoria Pimlico
                </label>
            </td>
            <td>
                <textarea name="victoria-pimlico-address" id="victoria-pimlico-address"><?php echo get_option( 'gj_victoria_pim_address', '' ) ?></textarea>
            </td>
            <td>
                <input name="victoria-pimlico" id="victoria-pimlico" value="<?php echo get_option( 'gj_victoria_pim_tel', '' ) ?>" />
            </td>
            <td>
                <input name="victoria-pimlico-coords" id="victoria-pimlico-coords" class="gmaps-coords" value="<?php echo get_option( 'gj_victoria_pim_coords', '' ) ?>" />
            </td>
            <td>
                <input name="victoria-pimlico-postcodes" id="victoria-pimlico-postcodes" class="gmaps-postcodes" value="<?php echo get_option( 'gj_victoria_pim_postcodes', '' ) ?>" />
            </td>
            <td>
                <input name="victoria-pimlico-mail" id="victoria-pimlico-mail" class="gmaps-mail" value="<?php echo get_option( 'gj_victoria_pim_mail', '' ) ?>" />
            </td>
            <td>
                <input name="victoria-pimlico-skype" id="victoria-pimlico-skype" class="gmaps-skype" value="<?php echo get_option( 'gj_victoria_pim_skype', '' ) ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <label for="nine">
                    Nine Elms &amp; Vauxhall
                </label>
            </td>
            <td>
                <textarea name="nine-address" id="nine-address"><?php echo get_option( 'gj_nineelms_address', '' ) ?></textarea>
            </td>
            <td>
                <input name="nine" id="nine" value="<?php echo get_option( 'gj_nineelms_tel', '' ) ?>" />
            </td>
            <td>
                <input name="nine-coords" id="nine-coords" class="gmaps-coords" value="<?php echo get_option( 'gj_nineelms_coords', '' ) ?>" />
            </td>
            <td>
                <input name="nine-postcodes" id="nine-postcodes" class="gmaps-postcodes" value="<?php echo get_option( 'gj_nineelms_postcodes', '' ) ?>" />
            </td>
            <td>
                <input name="nine-mail" id="nine-mail" class="gmaps-mail" value="<?php echo get_option( 'gj_nineelms_mail', '' ) ?>" />
            </td>
            <td>
                <input name="nine-skype" id="nine-skype" class="gmaps-skype" value="<?php echo get_option( 'gj_ninelms_skype', '' ) ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <label for="southbank">
                    South Bank
                </label>
            </td>
            <td>
                <textarea name="southbank-address" id="southbank-address"><?php echo get_option( 'gj_southbank_address', '' ) ?></textarea>
            </td>
            <td>
                <input name="southbank" id="southbank" value="<?php echo get_option( 'gj_southbank_tel', '' ) ?>" />
            </td>
            <td>
                <input name="southbank-coords" id="southbank-coords" class="gmaps-coords" value="<?php echo get_option( 'gj_southbank_coords', '' ) ?>" />
            </td>
            <td>
                <input name="southbank-postcodes" id="southbank-postcodes" class="gmaps-postcodes" value="<?php echo get_option( 'gj_southbank_postcodes', '' ) ?>" />
            </td>
            <td>
                <input name="southbank-mail" id="southbank-mail" class="gmaps-mail" value="<?php echo get_option( 'gj_southbank_mail', '' ) ?>" />
            </td>
            <td>
                <input name="southbank-skype" id="southbank-skype" class="gmaps-skype" value="<?php echo get_option( 'gj_southbank_skype', '' ) ?>" />
            </td>

        </tr>

        <!-- <tr>
            <td colspan="2"></td>
            <td>
                <a id="sview" href="#">
                    Download Street view images
                </a>
            </td>
        </tr> -->
    </table>

        <?php submit_button() ?>

    </form>

</div>
<?php
}

function gj_admin_forms_notification() {
?>
<div class="wrap">
  <h1>Garton Jones' - Forms notification</h1>
<?php
  if( isset( $_GET[ 'edit' ] ) ) {
    gj_admin_form_notification_edit();

    return;
  }
?>
    <form>
    <input type="hidden" name="page" value="<?php echo $_GET[ 'page' ] ?>">
    <input type="hidden" name="add" value="1">
    <table class="wp-list-table widefat fixed striped posts">
    	<thead>
      	<tr>
      		<th scope="col" id="title" class="manage-column column-title sortable desc" style=""><a><span>Form</span></a></th>
      		<!-- <th scope="col" id="title" class="manage-column column-title sortable desc" style=""><a><span>Title</span></a></th> -->
        </tr>
      </thead>
      <tbody>
        <?php
          $forms = RGFormsModel::get_forms( null, 'title' );

          foreach( $forms as $form ) :
            $meta = RGFormsModel::get_form_meta( $form->id );
            $notifications = $meta[ 'notifications' ];

            $skip = true;
            foreach( $notifications as $n ) {
              if( $n[ 'toType' ] == 'field' ) $skip = false;
            }

            if( $skip ) continue;
        ?>
        <tr>
          <td>
            <a href="<?php echo esc_url( add_query_arg( array( 'edit' => $form->id ) ) ) ?>">
              <?php echo $form->title ?>
            </a>
          </td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </form>
</div>
<?php
}

function gj_admin_form_notification_edit() {
  global $wpdb;

  $id = intval( $_GET[ 'edit' ] );
  $meta = RGFormsModel::get_form_meta( $id );
  $fields = $meta['fields'];
  $notifications = $meta[ 'notifications' ];
// print_r( $fields );
  if( isset( $_POST[ 'add' ] ) ) {
    $key = $_POST[ 'id' ];

    $notifications[ $key ][ 'subject' ] = $_POST[ 'gj-subject' ];
    $notifications[ $key ][ 'message' ] = $_POST[ 'gj-message' ];

    GFFormsModel::update_form_meta( $id, $notifications, 'notifications' );
  }

  wp_enqueue_script( 'jquery-ui-draggable' );

  foreach( $notifications as $key => $n ) :
    if( $n[ 'toType' ] != 'field' ) continue;
?>
    <style>
      #fields li {
        display: inline-block;
        padding: 5px;
        border: 1px solid #eaeaea;
      }

      #fields li span {
        display: block;
        padding: 5px;
        color: #f00;
      }

      #fields li:hover {
        background: #f0f0f0;
      }

      #gjform p.submit {
          display: inline-block;
      }
    </style>
    <form id="gjform" method="POST">
    <input type="hidden" name="page" value="<?php echo $_GET[ 'page' ] ?>">
    <input type="hidden" name="add" value="1">
    <input type="hidden" name="id" value="<?php echo $key ?>">
    <table class="wp-list-table widefat fixed striped posts">
      <thead>
        <tr>
          <th scope="col" id="title" class="manage-column column-title sortable desc" style=""><a href="<?php echo esc_url( remove_query_arg( 'edit' ) ) ?>"><span>Back</span></a></th>
          <th scope="col" id="title" class="manage-column column-title sortable desc" style="width: 80%"><a><span></span></a></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Available fields</td>
          <td>
            <ul id="fields">
              <li>
                Form title
                <span>{form_title}</span>
              </li>
              <li>
                Page title
                <span>{embed_post:post_title}</span>
              </li>
              <li>
                Page url
                <span>{embed_url}</span>
              </li>
              <?php foreach( $fields as $field ) : ?>
                <li>
                  <?php
                    $name = $field['label'];
                    if( empty( $name ) ) $name = $field['placeholder'];

                    echo $name;
                  ?>
                  <span>
                    {:<?php echo $field['id'] ?>}
                  </span>
                </li>
              <?php endforeach; ?>
            </ul>
          </td>
        </tr>
        <tr>
        </tr>
        <tr>
          <td>Subject</th>
          <td>
            <input type="text" name="gj-subject" value="<?php echo $n['subject'] ?>" size="50" />
          </td>
        </tr>
        <tr>
          <td>Message</th>
          <td>
            <?php
              wp_editor( $n['message'], 'gj-message' );
            ?>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align: right">
            <?php submit_button() ?>
          </td>
        </tr>
      </tbody>
    </table>
  </form>

  <script>
    // jQuery( '#fields li' ).draggable();
  </script>
<?php
  endforeach;
  // print_r( $meta );
  // die();
?>
</div> <!-- /wrap -->
<?php
}


function gj_admin_parallax_credits() {
?>
<style>

  tr.toggle-next {
    cursor: pointer;
  }

  p.submit {
      display: inline-block;
  }
</style>
<div class="wrap">
  <h1>Garton Jones' - Parallax credits</h1>
<?php
  if( isset( $_GET[ 'edit' ] ) ) {
    gj_admin_form_notification_edit();

    return;
  }

  if( isset( $_POST['add' ] ) ) {
    $fields = explode( ',', $_POST[ 'fields' ] );

    $credits = array();
    foreach( $fields as $field ) {
      list( $null, $post_id, $id ) = explode( '_', $field );

      $credits[ $post_id ][ $id ] = $_POST[ $field ];
    }

    update_option( '_gj_parallax_credits', $credits );
  }

  $credits = get_option( '_gj_parallax_credits', $credits );
?>
    <form method="post">
    <input type="hidden" name="page" value="<?php echo $_GET[ 'page' ] ?>">
    <input type="hidden" name="add" value="1">
    <table class="wp-list-table widefat fixed striped posts">
    	<thead>
      	<tr>
      		<th scope="col" id="title" class="manage-column column-title sortable desc" style=""><a><span>Parllax credits</span></a></th>
      		<!-- <th scope="col" id="title" class="manage-column column-title sortable desc" style=""><a><span>Title</span></a></th> -->
        </tr>
      </thead>
      <tbody>
        <tr class="toggle-next" onclick="jQuery( this ).next().toggle();">
          <td>
            <a href="#">
              About
            </a>
          </td>
        </tr>
        <tr style="display: none">
          <td>
            <table class="wp-list-table widefat fixed striped posts">
          <?php
            $fields = array();

            $slides = array( 'about', 'team', 'offices', 'social' );

            foreach( $slides as $slide ) :
              $field = 'credits_58800_' . $slide;
              $fields[] = $field;

              $content = @$credits[ 58800 ][ $slide ];
          ?>
            <tr>
              <td style="width: 10%; vertical-align: middle">
                <?php echo $slide ?>
              </td>
              <td>
                <?php wp_editor( $content, $field, array( 'textarea_rows' => 1, 'media_buttons'  => false ) ); ?>
              </td>
              <?php endforeach; ?>
            </tr>
          </table>
          </td>
        </tr>
        <?php
         $args = array(
           'post_type' => array( 'parallax', 'page' ),
           'orderby' => 'post__in',
           'post_status'       => 'publish',
           'posts_per_page' => -1,
           'post__in' => array( 90083, 58834, 90060, 104702, 85847 ),
         );

         $posts = new WP_Query( $args );
         if( $posts->have_posts() ) :
             while ( $posts->have_posts() ) :
                 $posts->the_post();

                 if( ! have_rows( 'slide' ) ) continue;

        ?>
        <tr class="toggle-next" onclick="jQuery( this ).next().toggle();">
          <td>
            <a href="#">
              <?php echo get_the_title() ?>
            </a>
          </td>
        </tr>
        <tr style="display: none">
          <td>
            <table class="wp-list-table widefat fixed striped posts">
              <?php

                if ( have_rows( 'slide' ) ):
    				      while ( have_rows( 'slide' ) ): the_row();

                  $row = get_sub_field( 'slide_id' );
                  $field = 'credits_' . get_the_ID() . '_' . $row;
                  $fields[] = $field;

                  $content = @$credits[ get_the_ID() ][ $row ];
              ?>
              <tr>
                <td style="width: 10%; vertical-align: middle">
                  <?php echo get_sub_field( 'slide_title' ) ?>
                </td>
                <td>
                  <?php wp_editor( $content, $field, array( 'textarea_rows' => 1, 'media_buttons'  => false ) ); ?>
                </td>
              </tr>
              <?php
                  endwhile;
                endif;
              ?>
            </table>
          </td>
        </tr>
        <?php endwhile; endif; ?>
        <tr>
          <td colspan="" style="text-align: right">
            <?php submit_button() ?>
          </td>
        </tr>
      </tbody>
    </table>
    <input type="hidden" name="fields" value="<?php echo join( ',', $fields ); ?>" />
  </form>
</div>
<?php
}

function gj_admin_default_quicklinks() {
  if( isset( $_POST['add'] ) ) {

    $titles = $_POST['title'];
    $defaults = array();
    foreach( $titles as $id => $title ) {
      $defaults[ $id ][ 'title' ] = $_POST['title'][ $id ];
      $defaults[ $id ][ 'link' ] = $_POST['link'][ $id ];
    }

    update_option( 'gj_default_permalinks', $defaults );
  }

  $defaults = get_option( 'gj_default_permalinks' );
?>
<div class="wrap">
  <h1>Garton Jones' - Default quick links</h1>
    <form id="gjform" method="POST">
    <input type="hidden" name="page" value="<?php echo $_GET[ 'page' ] ?>">
    <input type="hidden" name="add" value="1">
    <table class="wp-list-table widefat fixed striped posts">
    	<thead>
      	<tr>
      		<th scope="col" id="title" class="manage-column column-title" style="width: 300px">Title</th>
      		<th scope="col" id="title" class="manage-column column-title" style="">Link</th>
        </tr>
      </thead>
      <tbody>
    <?php for( $i = 0; $i < 5; $i++ ): ?>
    <tr>
      <td>
        <input type="name" name="title[<?php echo $i ?>]" value="<?php echo @addslashes( $defaults[$i]['title'] ); ?>" style="width: 100%" />
      </td>
      <td>
        <input type="name" name="link[<?php echo $i ?>]" value="<?php echo @addslashes( $defaults[$i]['link'] ); ?>" style="width: 100%" />
      </td>
    </tr>
    <?php endfor; ?>
    <tr>
      <td colspan="2" style="text-align: right">
        <?php submit_button(); ?>
      </td>
    </tbody>
  </table>
  </form>
</div>
<?php
}

function gj_admin_add_menu() {
    $page = add_menu_page( 'Offices', 'Garton Jones', 'edit_posts', 'gj-offices', 'gj_admin_offices_page' );
    $page = add_submenu_page( 'gj-offices', 'Forms notification', 'Forms notification', 'edit_posts', 'gj-notifications', 'gj_admin_forms_notification' );
    $page = add_submenu_page( 'gj-offices', 'Parallax credits', 'Parallax credits', 'edit_posts', 'gj-credits', 'gj_admin_parallax_credits' );
    $page = add_submenu_page( 'gj-offices', 'Default quicklinks', 'Default quicklinks', 'edit_posts', 'gj-quicklinks', 'gj_admin_default_quicklinks' );
    // $page = add_menu_page( 'Apartment plotting', 'Apartment plotting', 'manage_options', 'gj-apartment-position', 'gj_admin_apartment_position_page' );

    add_action( 'load-' . $page, 'enqueue_background_scripts' );
}

/*
 * Allow user to insert postcode instead of lat/long and after
 * use the google geolocaiton service to retrieve them
*/
function gj_update_lat_long( $location ) {
    $post_id = $_POST['post_ID'];

  //Is the latitude filled?
    $lat = get_field( 'gmap_latitude', $post_id );
    if( ! empty( $lat ) ) return $location;

    $postcode = get_field( 'gmap_postcode', $post_id );
    if( empty( $postcode ) ) return $location;

    $address = $postcode;
  	$coordinates = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($address) . '&sensor=true');
  	$coordinates = json_decode($coordinates);

  	update_field( 'gmap_latitude', $coordinates->results[0]->geometry->location->lat, $post_id );
  	update_field( 'gmap_longitude', $coordinates->results[0]->geometry->location->lng, $post_id );

    return $location;
}

add_filter( 'redirect_post_location', 'gj_update_lat_long', 99 );

function gj_notify_interest( $value ) {
  return ( $value ) == "Sales" ? "for Sale" : "to let";
  // return $value;
}

function gj_change_mail_subject( $values ) {
  $values['subject'] = do_shortcode( $values['subject'] );

  return $values;
}

add_filter('gform_pre_send_email', 'gj_change_mail_subject');
add_shortcode( 'gj_notify', 'gj_notify_interest' );

add_action( 'admin_menu', 'gj_admin_add_menu' );

function gj_admin_scripts() {
  wp_enqueue_script( 'jquery-ui-draggable' );
  wp_enqueue_script( 'jquery-ui-sortable' );
}

add_action( 'admin_enqueue_scripts', 'gj_admin_scripts' );
