<?php
/**
* Template Name: Offices Template
* 
* The template that lets you display all offices...
*/

get_header();
?>
<div class="row fullWidth">
	<div class="medium-1 large-1 columns">
		&nbsp;
	</div>
	<div class="small-10 medium-10 large-10 columns bggold
 officespage" style="margin-top:8%;">
		<div class="row">
			<div class="small-12 medium-4 large-3 columns" id="side">
				<h1>Offices</h1>

                <?php
                    gj_add_submenu( 'About' );
                ?>

			</div>
			<div class="small-12 medium-8 large-6 columns" id="wording">
				<div class="row hide-for-touch">
					<?php if ( $subpages->posts[ '0' ]->ID != $post->ID && $post->ID != $subpages->query_vars['post_parent'] ) { // show previous link only if the page is not the first ?>
						<div id="prev" class="offiprev"><?php next_post_link( '%link', 'Previous' ); ?></div>
					<?php } ?>
					<?php if ( $subpages->posts[ $length - 1 ]->ID != $post->ID && $post->ID != $subpages->query_vars['post_parent'] ) { // show next link only if the page is not the last ?>
						<div id="next" class="offinext"><?php previous_post_link( '%link', 'Next' ); ?></div>
					<?php } ?>
					
				</div>

					<div>
						<?php the_content(); ?>
						<!-- <h3 class="lmore"><a href="#" class="">Learn more</a></h3> -->
						<div class="row">
							<div class="small-12 medium-12 large-12 columns">

							<?php if( have_rows( 'links' ) ): ?>

									<?php while( have_rows( 'links' ) ): the_row(); 

										// vars
										$type = get_sub_field( 'type' );
										
										switch ( $type ) {
											case 'page':
												// save other vars for page
												$page = get_sub_field( 'page' );
												$page_link = get_permalink( $page->ID );

												if ( get_sub_field( 'page_name' ) ) { // if name is specified...
													$name = get_sub_field( 'page_name' );
												} else { // if name is not specified, get default from $page
													$name = $page->post_title;
												}
												
												$parameter = get_sub_field( 'parameter' );

												echo '<a href="' . $page_link . $parameter . '" class="offlink"><span class="daplus">+</span> ' . $name . '</a><br>';

												break;
												
											case 'media': // TODO set the media to be changed from back-end !important
												echo '<a href="/videos/" class="offlink y360p">
													<span class="play">
														<span class="ring target"></span> 
														<img src="' . get_template_directory_uri() . '/img/splay.png" class="mtm3">
													</span>
													View videos of our latest developments
												</a>';
												break;

											case 'none':
												echo '<hr class="sidesep">';
												break;
										}

										?>

									<?php endwhile; ?>

								<?php endif; ?>

							</div>

						</div>

					</div>

			</div>

			<div class="small-0 medium-0 large-3 columns wiref2 hide-for-medium-down">
				<img src="/img/booth.png" />
				<p class="wmo">
					<?php if ( get_field( 'office_name' ) ) {
						the_field( 'office_name' );
					} ?>
				<br>
					<?php if ( get_field( 'office_tel' ) ) {
						the_field( 'office_tel' );
					} ?>
				<br>

					<?php if ( get_field( 'office_email' ) || get_field( 'office_skype' ) ) { ?>
						<span class="mailskype">
							<?php if ( get_field( 'office_email' ) ) { ?>
								<a href="mailto:<?php the_field( 'office_email' ); ?>"><img src="/img/mailb.png"></a>
							<?php } ?>
							<?php if ( get_field( 'office_skype' ) ) { ?>
								<a href="skype:<?php the_field( 'office_skype' ); ?>?call"><img src="/img/skypeb.png"></a>
							<?php } ?>
						</span>
					<?php } ?>
				</p>

			</div>

		</div>

	</div>

	<div class="medium-1 large-1 columns">
		&nbsp;
	</div>

</div>

<?php
get_footer();
