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

/////////////////////////////// New CODE ////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
//		APP										//
//////////////////////////////////////////////////////////////////////////////////
	
	var dest;
	var flag = 0;
	var others;
	var curr;
	var currGeom;
	var deltaC = 0.002;
	var deltaD = 0.006;


	function flag(){
		flag = 1;
	}

	
				if (i < Math.min(pmesh.geometry.vertices.length, vl)) {

					rs = 1;
					kx[i] =  (vertices[i].x - pmesh.geometry.vertices[i].x)/n*rs;
					ky[i] =  (vertices[i].y - pmesh.geometry.vertices[i].y)/n*rs;
					kz[i] =  (vertices[i].z - pmesh.geometry.vertices[i].z)/n*rs;
					console.log(kx[i], i, rs);

				}

//////////////////////////////////////////////////////////////////////////////////
//		Additional Controls						//
//////////////////////////////////////////////////////////////////////////////////


	$('.navi').click(function() {
		//dt = 0;
		
		others = curr;
		dest = curr;

		for (var i = dest.geometry.vertices.length - 1; i >= 0; i--) {
			dvel[i] = Math.random()*0.4+0.2;
		}

	});

	$('#home').click(function() {
		curr = mesh2;
		currGeom = geometry2;


	});

	$('#info').click(function() {
		curr = mesh1;
		currGeom = geometry;

	});

	$('#projects').click(function() {
		curr = mesh3;
		currGeom = geometry3;

	});

	$('#team').click(function() {
		curr = mesh4;
		currGeom = geometry4;
	});

	$('#news').click(function() {
		curr = mesh5;
		currGeom = geometry5;
	});





	particles2.on('click', function(){
	    particles2.scale.x *= 2;
	});

	//////////////////////////////////////////////////////////////////////////////////
//		RENDER						//
//////////////////////////////////////////////////////////////////////////////////

	animate();
	function animate() {

	requestAnimationFrame( animate );

						console.log(assetsLoadedCount);



	if (assetsLoadedCount != 6) {
		dest = pmesh3;
		others = pmesh2;
		curr = pmesh;
		currGeom = pgeom;
	} else {
		if ((assetsLoadedCount == 6) && (flag != 1)) {
			$('.deflector').css('opacity','0');
			dest = pmesh;
			others = pmesh2;
			curr = mesh2;
			currGeom = geometry2;
			flag = 1;
		}
	}

		dest.geometry.verticesNeedUpdate = true;
		curr.geometry.verticesNeedUpdate = true;
		others.geometry.verticesNeedUpdate = true;

		if (deltaD < 0.006) {
			deltaD += 0.0001;
		}

		if (deltaC > 0.002) {
			deltaC -= 0.0001;
		}

		dest.rotation.y += deltaD;
		curr.rotation.y -= deltaC;

		/*if (dest.scale.x <2) {
			dest.scale.x = dest.scale.y = dest.scale.z += 0.1;
		}

		if (curr.scale.x >1) {
			curr.scale.x = curr.scale.y = curr.scale.z -= 0.1;
		}*/


		for (var i = dest.geometry.vertices.length - 1; i >= 0; i--) {
			if (dest.geometry.vertices[i].y > ground){
				dest.geometry.vertices[i].y -= dvel[i];
			}
		}

		for (var i = curr.geometry.vertices.length - 1; i >= 0; i--) {
			if (curr.geometry.vertices[i].y < currGeom.vertices[i].y){
				curr.geometry.vertices[i].y += Math.random()*1.4+0.3;
			}
		}

		for (var i = others.geometry.vertices.length - 1; i >= 0; i--) {
			if (others.geometry.vertices[i].y > ground){
				others.geometry.vertices[i].y -= Math.random()*1.4+0.3;
			}
		}


		//console.log('dest.rotation:', dest.rotation.y,'currGeom:', currGeom.vertices.length,'curr.geometry:', curr.geometry.vertices.length);


		//console.log(currGeom.vertices.length, currGeom);



		/*h += Math.PI/180*2;

		hue = Math.cos(h*0.01)*1;
		console.log(hue);
		material.color.setHSL( hue, 0.4, 0.3 );
