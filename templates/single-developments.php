<script>
    var Model = {
        path: '<?php echo get_template_directory_uri() ?>/babylon/models/',
        moveStep: 2,
        lowres: <?php echo ( $lowres ) ? 1 : 0 ?>,
        isTouch: <?php echo $detect->isMobile() ? 1 : 0 ?>,
        name: '<?php echo $file ?>',
        filename: "<?php echo $file ?>.<?php echo ( $lowres ) ? "low." : "" ?>babylon.gz",
        searchLink: '<?php echo $slink ?>',
        blocks: <?php echo json_encode( $blocks ) ?>,
        hideAround: <?php echo intval( isset( $_GET[ 'hide' ] ) ) ?>,
        lower: false,
        mapZeroAngle: <?php echo floatval( get_field( 'map_plan_0_angle' ) ) ?>,
        isAdmin: 1, // <?php echo current_user_can( 'manage_options' ) ? 1 : 0 ?>,
        hasSubmodel: <?php echo count( $blocks ) > 1 ? "1" : "0" ?>,
        meshSizeFactor: <?php echo intval( get_field( 'mesh_size_factor' ) ); ?>,
        range: <?php echo json_encode( $ranges, JSON_FORCE_OBJECT ) ?>,

        /* Rendered scene information/variables */

        //The scene
        scene: {
            canvas: null,
            engine: null,
            scene: null,

            //Camera
            camera: {
                mesh: null,
                lowerLimit: - Math.PI / 2.2,
                upperLimit: - Math.PI / 2.2
            },

            light: null,

            limitCamera: 1,

            //Extra elements
            addDoves: <?php echo ( ! $lowres ) ? "true" : "false" ?>,
            addBoats: <?php echo ( ! $lowres ) ? "true" : "false" ?>,
            addSkyBox: <?php echo ( ! isset( $_GET[ 'nosky' ] ) ) ? "true" : "false" ?>,

            //Fog
            addFog: false,
            fogDensity: 0.005,

            //Rise animation?
            rise: <?php echo ! isset( $_GET[ 'norise' ] ) ? 1 : 0 ?>,

            //Reflection
            reflection: <?php echo ! isset( $_GET[ 'noreflection' ] ) ? 1 : 0 ?>,

            //Limit the camera rotation and spin just the model
            spin: <?php echo isset( $_GET[ 'spin' ] ) ? 1 : 0 ?>,

            zoomFov: <?php echo ! isset( $_GET[ 'nozoom' ] ) ? 1 : 0 ?>,
                
            zoomOnCenter: <?php echo isset( $_GET[ 'zoomin' ] ) ? 1 : 0 ?>
        },

        meshes: {
            all: new Array(),                            //All meshes

            //City = All the meshes except the "hoverable" ones
            city: new Array(),

            //Doves
            dove: {
                max: 6,
                meshes: new Array()
            },

            //Boats
            boat: {
                max: 4,
                meshes: new Array(),
                points: { middle: null, heading: null, end: null }
            },

            //Bus model
            bus: {
                meshes: new Array(),
                stops: new Array()
            },


            //Mesh to apply the rise animation
            toRise: {},

            //This array will contain the meshes marked as "floor"
            floorMeshes: new Array(),
            dotsMesh: null,

            //Reflective meshes
            mirrors: {
                meshes: new Array(),
                material: null
            },

            // var _dotMesh = null, _dotSphere = null, _dotBorder = null;
            dotCenter: null,

            //Boats
            boatPoints: new Array(),

            //The river
            water: {
                id: -1,
                mesh: null,                                 //Mesh to apply the reflection
                material: null                              //The reflection material
            },

            //Planes to receive shadow
            grounds: new Array(),

            //is Zoomed on building?
            isZoomed: false
        },

        //Meshes to be animated
        animation: {
            meshes: new Array(),                        // (bus, pigeon, boat)
            wheel: null,                                //The london eye Wheel
            zoomTime: 0.5
        },

        hoverColor: null,
        dots: new Array(),

        //2D Text ( Sprites )
        sprites: new Array(),

        //Compass & Map
        navigator: {
            $_needle: null,
            $_map: null                                //The intial camera angle is not 0
        }
    }

    <?php 
    $sky = isset( $_GET[ 'sky' ] );

    if( $sky ) :
        $sky = intval( $_GET[ 'sky' ] );
    ?>
        skyPath = "textures<?php echo $sky ?>/skybox";
        lineStrokeColor = "#342F1F";
    <?php endif; ?>

    var mouse, oldX, mouseDown;

    var _ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
    var _nonce = "<?php echo wp_create_nonce("gjdev_nonce_field_yeah"); ?>";

    var babylonOnReady = function( scene, camera ) {
        //Limit zoom
        if( ! Model.isSubmodel ) {
            camera.lowerRadiusLimit = 45;
            camera.upperRadiusLimit = 45;
        } else {
            camera.radius = 48;
        }

        if( ! Model.isAdmin ) return;

        //Create the list of floors in the floormap div
//        var floors = 0;
//        for( i = 0; i < Model.meshes.all.length; i++ ) {
//            var mesh = meshes[i];
//
//            if( mesh.name.substr( 0, 1 ) == "!" ) {
//                var name = mesh.name.split("_");
//                var b = parseInt( name[0] );
//                var f = parseInt( name[1] );
//
//                if( Model.isSubmodel && b != _currentBlock ) continue;
//                if( f > floors ) floors = f;
//            }
//        }

        // var $ul = jQuery( '#floormap .floorsmenu' );

        // for( floor = 0; floor < floors; floor++ ) {
        //     $li = jQuery( '<li>' );
        //     $a = jQuery( '<a>' );

        //     var text = getGetOrdinal( floor + 1 ) + " floor";

        //     $a.attr( 'data-title', text ).html( text );
        //     $li.addClass( 'item' ).append( $a );

        //     $ul.append( $li );
        // }

        //Load the apartments of current bloc, only if there are 1 model
        if( Object.keys( Model.blocks ).length == 1 ||
            Model.isSubmodel ) {
            var id = ( ! Model.isSubmodel ) ? 1 : _currentBlock;

            gj_load_floor_map( Model.blocks[ id ].postcode, -1, false, gj_add_dots_to_model );
        }
    }

function getGetOrdinal(n) {
   var s=["th","st","nd","rd"],
       v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
}

</script>
