var container;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var ground = -100;
var colors = [];
var assetsLoadedCount = 0;
init();
animate();

var flag = 0;

$('body').click(function(){

	if (flag == 0){
		$('.mp').addClass('slide');
		flag = 1;
	}
	else {
		$('.mp').removeClass('slide');
		flag = 0;
	}
});


function init() {

	container = document.createElement( 'div' );
	$('#canvas_container').append( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 100;
	camera.position.x = 50;

	// scene

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.0025 );

	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 );
	scene.add( directionalLight );

	// texture

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};

	/*var texture = new THREE.Texture();*/

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};

	/*var onLoad = function() {
		$('.deflector').css('opacity','0');
		animate();
	}*/


	/*var loader = new THREE.ImageLoader( manager );
	loader.load( 'textures/UV_Grid_Sm.jpg', function ( image ) {

		texture.image = image;
		texture.needsUpdate = true;

	} );*/

	// model
	var sprite = THREE.ImageUtils.loadTexture( "tex/disc.png" );
	var company = THREE.ImageUtils.loadTexture( "tex/company.png" );
	//material = new THREE.PointCloudMaterial( { vertexColors: THREE.VertexColors, size: 4, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true } );
	material = new THREE.PointCloudMaterial( { size: 3.5, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true, vertexColors: THREE.VertexColors } );

	//material.color.setHSL( 0.57, 1, 0.6 );

	var crateMaterial = new THREE.SpriteMaterial( { map: company, useScreenCoordinates: false, color: 0xffffff } );
	var sprite2 = new THREE.Sprite( crateMaterial );
	sprite2.position.set( -15, -20, -50 );
	sprite2.scale.set( 50, 16, 1.0 ); // imageWidth, imageHeight
	scene.add( sprite2 );

	var loader = new THREE.OBJLoader( manager );

	loader.load( 'obj/st.obj', function ( object ) {

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				/*child.material.map = texture;*/

			}


				    if ( child.geometry !== undefined ) {

						var geom = child.geometry;
						var vertices = geom.vertices;
						var vl = vertices.length;
						geometry5 = new THREE.Geometry();
						tmp_geometry5 = new THREE.Geometry();

						for ( i = 0; i < vl; i ++ ) {

							var vertex = new THREE.Vector3();
							vertex.x = vertices[i].x;
							vertex.y = vertices[i].y;
							vertex.z = vertices[i].z;

							var tmp_vertex = new THREE.Vector3();
							tmp_vertex.x = vertices[i].x;
							//tmp_vertex.y = ground;
							tmp_vertex.y = vertices[i].y;
							tmp_vertex.z = vertices[i].z;

							geometry5.vertices.push( vertex );
							tmp_geometry5.vertices.push( tmp_vertex );
							colors[i] = new THREE.Color();
    						colors[i].setHSL( 0.57, 1.0, 1-3*Math.abs(vertices[i].y/100) );

						}

						mesh5 = new THREE.PointCloud( tmp_geometry5, material );
						mesh5.frustumCulled = false;
						mesh5.position.y = - 20;
						assetsLoadedCount++;

						tmp_geometry5.colors = colors;
						scene.add(mesh5);

				    }

		} );

		//scene.add( object );

	}, onProgress, onError );

	//

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) / 10;
	//mouseY = ( event.clientY - windowHalfY ) / 2;

}

//

function animate() {

	requestAnimationFrame( animate );
	render();

}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .004;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;

	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}