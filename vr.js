//################################## API #################################
$( document ).ready(function() {

	var IE = document.all?true:false;
	if (!IE) document.captureEvents(Event.MOUSEMOVE)
	document.onmousemove = getMouseXY;

	var tempBoost = 0;
	var tempStatic = 0;
	var tempX = document.body.width/2;
	var tempY = document.body.height/2;
	function getMouseXY(e) {
	if (IE) { // grab the x-y pos.s if browser is IE
		tempX = event.clientX + document.body.scrollLeft;
		tempY = event.clientY + document.body.scrollTop;
	}
	else { // grab the x-y pos.s if browser is NS
		tempX = e.pageX;
		tempY = e.pageY;

		var layer5Ratio = -10;
		var layer4Ratio = -20;
		var layer3Ratio = -40;
		var layer2Ratio = -30;
		var layer1Ratio = -50;
	} 

	var tempBoost = ($(window).width()-960)/2;

	if (tempX < 0){tempX = 0;}
	if (tempY < 0){tempY = 0;} 

	$(".layer5").css("transform", "translate("+tempX/layer5Ratio+"px,"+tempStatic/layer5Ratio+"px)");
	$(".layer4").css("transform", "translate("+tempX/layer4Ratio+"px,"+tempStatic/layer4Ratio+"px)");
	$(".layer3").css("transform", "translate("+tempX/layer3Ratio+"px,"+tempStatic/layer3Ratio+"px)");
	$(".layer2").css("transform", "translate("+tempX/layer2Ratio+"px,"+tempStatic/layer2Ratio+"px)");
	$(".layer1").css("transform", "translate("+tempX/layer1Ratio+"px,"+tempStatic/layer1Ratio+"px)");

	return true;
	}

});

//################################# THREE.JS ###############################
/*
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
*/
	/*var texture = new THREE.Texture();*/
/*
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};

	var sprite = THREE.ImageUtils.loadTexture( "tex/disc.png" );


	var plane_tex = THREE.ImageUtils.loadTexture( "tex/block.png" );
	var plane_material = new THREE.SpriteMaterial( { map: plane_tex, useScreenCoordinates: false, color: 0xffffff } );
	var plane_obj = [];
	for (var i = 1; i <=15; i++) {
		plane_obj[i] = new THREE.Sprite( plane_material );
		plane_obj[i].position.set( Math.random()*50-25, Math.random()*50-25, Math.random()*50 );
		plane_obj[i].scale.set( 32, 20, 1 ); // imageWidth, imageHeight
		scene.add( plane_obj[i] );
	};

	var loader = new THREE.OBJLoader( manager );

	loader.load( 'obj/st.obj', function ( object ) {

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

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

*/