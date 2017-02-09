
<?php if( ! $skip_parallax || 'video' == $view_section ) : ?>
<section id="videos" class="size-me parallax">
  <section class="overlayed-bar row" style="z-index: 8;">
      <div class="medium-4 large-4 columns hide-for-small">
      <span class="categories-toggle open-dev-list" onclick="jQuery( '#video-a-z' ).trigger( 'click' );">View video list</span>
      <span class="category-name"></span>
      </div>

      <div class="small-12 medium-4 large-4 columns filter-view">
        <!-- <ul>
          <?php
            $items = array(
              array( 'title' => 'View all', 'link' => '' ),
              array( 'title' => 'Nine Elms', 'link' => 'Nine-Elms' ),
              array( 'title' => 'Southbank', 'link' => 'Southbank' ),
              array( 'title' => 'Westminster', 'link' => 'Westminster' ),
            );


            foreach( $items as $item ) :
          ?>
          <li>
            <a data-category="<?php echo $item['link'] ?>"><?php echo $item['title'] ?></a>
          </li>
          <?php endforeach; ?>
        </ul> -->
      </div>

      <div class="small-12 medium-4 large-4 columns switchers change-view searchpage videos visible">
          <ul id="change-view" style="margin-top: 0;">
             <li class="text"></li>


            <li id="video-a-z" data-id="#videoaz" class="icon-2">
              <span>A-Z</span>
              <i class="icon-a-z"></i>
            </li>
            <li data-id="#videogrid" class="icon-1">
              <span>Grid</span>
              <i class="icon-grid"></i>
            </li>
            <li data-id="#covervideo, #myVideo-fluidwidth" data-nofilter="1" class="icon-1">
              <span>Coverflow</span>
              <i class="icon-photo"></i>
            </li>
            <li data-id="#videomap" class="icon-2">
              <span>Map</span>
              <i class="icon-map"></i>
            </li>
          </ul>


      </div>
  </section>

  <div id="developments-categories" class="fullWidth videos" style="display: block;">
    <div class="row fullWidth info visible">
      <div class="hide-for-small columns medium-4">&nbsp;</div>
      <div class="menu columns small-12 medium-4">
        <h2 style="text-align: center; font-size: 30px;"><a href="#" class="show-latest" data-id="#covervideo, #myVideo-fluidwidth" data-noaz="1" data-info="1">Development videos</a></h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus enim, sagittis a scelerisque eget, hendrerit et nisl. Duis eu magna eget leo laoreet consequat id a arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <h3>Latest videos</h3>
      </div>
      <div class="hide-for-small columns medium-4">&nbsp;</div>
    </div>

  </div>

  <div id="videomap" class="switch-me" data-tilt="45" data-type="videos" data-dest="videomap" data-map="1" data-lat="51.499624" data-lon="-0.123842"></div>
  <div id="videogrid" class="the-grid-view switch-me">
    <?php
      global $grid_li;

      if( ( $gj_query ) ) { // for knowledge grid
        $args = array(
          'post_type' => 'videos',
          'post_status'    => 'publish',
          'posts_per_page' => -1,
        );

        $grid_li = '';
        $li = '';

        $gj_query = new WP_Query( $args );

        $gj_grid = 'videos';
      }

      $devli = '';
      include('includes/grid.php');

      wp_reset_query();
    ?>
    <div class="arrows pager-arrows">
        <div class="arrow-left arrow">&lsaquo;</div>
        <div class="arrow-right arrow">&rsaquo;</div>
    </div>

    <ul class="grid-view active">

    <?php
      echo $grid_li;
    ?>
  </div>
  <div id="videoaz" class="content switch-me">
    <div id="strips" class="the-strips">
    <ul>
      <?php echo $li; ?>
    </ul>
    </div>
  </div>

  <div id="covervideo" class="active switch-me">
    <?php
      $GLOBALS['coverflow_id'] = "coverflowVideoData";
      $GLOBALS['coverflow_myDiv'] = "myVideo";
      $GLOBALS['coverpost_type'] = "videos";
      $GLOBALS['coverpost_share'] = 1;

      if( function_exists( 'gj_generate_coverflow_data' ) ) {
        gj_generate_coverflow_data();
      } else {
        require('templates/single-coverflow.php');
      }
    ?>
    <div id="myVideo"></div>
  </div>
</section>
<?php endif; ?>