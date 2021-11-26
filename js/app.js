const dbg = false;
const THREE = require('three');

// we need this to limit 3d fps
let clock = new THREE.Clock();
let delta = 0;
let interval = 1 / 30; // 30 fps




window.THREE = THREE;

import TWEEN from '@tweenjs/tween.js';
export default TWEEN;
import 'three/SVGLoader';


// current user level
let currentLevel = 1;
// user can look at all future levels, so this
// is level at which camera is currently looking
let lookLevel = 1;


const maxLevel = 40;

// list of playable cubes in the scene
let sceneCubes = [];


const gameCubes = [
	{	level:  1,	playable: true,  	name: "cube1.8",	xPos:  -2,	zPos:  -3,	texture0: "go_1.8.svg",		texture1: "earned_1.8.svg",		texture2: "earn_1.8.svg" 	},
	{	level:  2,	playable: true,  	name: "cube3.2",	xPos:   0,	zPos:  -3,	texture0: "go_3.2.svg",		texture1: "earned_3.2.svg",		texture2: "earn_3.2.svg" 	},
	{	level:  3,	playable: true,  	name: "cube5.7",	xPos:   0,	zPos:  -1,	texture0: "go_5.7.svg",		texture1: "earned_5.7.svg",		texture2: "earn_5.7.svg" 	},
	{	level:  4,	playable: true,  	name: "cube10",		xPos:  -2,	zPos:  -1,	texture0: "go_10.svg",		texture1: "earned_10.svg",		texture2: "earn_10.svg" 	},	
	{	level:  0,	playable: false, 	name: "next",		xPos:  -1,	zPos:  -1,	texture0: "next_level.svg" 	},
	{	level:  5,	playable: true, 	name: "cube18",		xPos:  -2,	zPos:   7,	texture0: "go_18.svg",		texture1: "earned_18.svg",		texture2: "earn_18.svg" 	},
	{	level:  6,	playable: true, 	name: "cube32",		xPos:   0,	zPos:   7,	texture0: "go_32.svg",		texture1: "earned_32.svg",		texture2: "earn_32.svg" 	},
	{	level:  7,	playable: true, 	name: "cube57",		xPos:   0,	zPos:   9,	texture0: "go_57.svg",		texture1: "earned_57.svg",		texture2: "earn_57.svg" 	},
	{	level:  8,	playable: true, 	name: "cube100",	xPos:  -2,	zPos:   9,	texture0: "go_100.svg",		texture1: "earned_100.svg",		texture2: "earn_100.svg" 	},
	{	level:  0,	playable: false, 	name: "next1",		xPos:  -1,	zPos:   9,	texture0: "next_level.svg" 	},
	{	level:  0,	playable: false, 	name: "prev1",		xPos:  -1,	zPos:   7,	texture0: "previous_level.svg"	},

	// quarter finals
	{	level:  9,	playable: true, 	name: "cube180",	xPos:  -2,	zPos:  17,	texture0: "go_180.svg",		texture1: "earned_180.svg",		texture2: "earn_180.svg" 	},
	{	level: 10,	playable: true, 	name: "cube320",	xPos:   0,	zPos:  17,	texture0: "go_320.svg",		texture1: "earned_320.svg",		texture2: "earn_320.svg" 	},
	{	level: 11,	playable: true, 	name: "cube570",	xPos:   0,	zPos:  19,	texture0: "go_570.svg",		texture1: "earned_570.svg",		texture2: "earn_570.svg" 	},
	{	level: 12,	playable: true, 	name: "cube1k",		xPos:  -2,	zPos:  19,	texture0: "go_1k.svg",		texture1: "earned_1k.svg",		texture2: "earn_1k.svg" 	},
	{	level:  0,	playable: false, 	name: "next2",		xPos:  -1,	zPos:  19,	texture0: "next_level.svg" 	},
	{	level:  0,	playable: false, 	name: "prev2",		xPos:  -1,	zPos:  17,	texture0: "previous_level.svg"	},
	{	level: 13,	playable: true, 	name: "cube1.8k",	xPos:  -2,	zPos:  27,	texture0: "go_1.8k.svg",	texture1: "earned_1.8k.svg",	texture2: "earn_1.8k.svg" 	},
	{	level: 14,	playable: true, 	name: "cube3.2k",	xPos:   0,	zPos:  27,	texture0: "go_3.2k.svg",	texture1: "earned_3.2k.svg",	texture2: "earn_3.2k.svg" 	},
	{	level: 15,	playable: true, 	name: "cube5.7k",	xPos:   0,	zPos:  29,	texture0: "go_5.7k.svg",	texture1: "earned_5.7k.svg",	texture2: "earn_5.7k.svg" 	},
	{	level: 16,	playable: true, 	name: "cube10k",	xPos:  -2,	zPos:  29,	texture0: "go_10k.svg",		texture1: "earned_10k.svg",		texture2: "earn_10k.svg" 	},
	{	level:  0,	playable: false, 	name: "next3",		xPos:  -1,	zPos:  29,	texture0: "next_level.svg" 	},
	{	level:  0,	playable: false, 	name: "prev3",		xPos:  -1,	zPos:  27,	texture0: "previous_level.svg"	},

	// semi finals
	{	level: 17,	playable: true, 	name: "cube18k",	xPos:   6,	zPos:  -3,	texture0: "go_18k.svg",		texture1: "earned_18k.svg",		texture2: "earn_18k.svg" 		},
	{	level: 18,	playable: true, 	name: "cube32k",	xPos:   8,	zPos:  -3,	texture0: "go_32k.svg",		texture1: "earned_32k.svg",		texture2: "earn_32k.svg" 		},
	{	level: 19,	playable: true, 	name: "cube57k",	xPos:   8,	zPos:  -1,	texture0: "go_57k.svg",		texture1: "earned_57k.svg",		texture2: "earn_57k.svg" 		},
	{	level: 20,	playable: true, 	name: "cube100k",	xPos:   6,	zPos:  -1,	texture0: "go_100k.svg",	texture1: "earned_100k.svg",	texture2: "earn_100k.svg" 	},
	{	level:  0,	playable: false, 	name: "next4",		xPos:   7,	zPos:  -1,	texture0: "next_level.svg" 	},
	{	level:  0,	playable: false, 	name: "prev4",		xPos:   7,	zPos:  -3,	texture0: "previous_level.svg"	},
	{	level: 21,	playable: true, 	name: "cube180k",	xPos:   6,	zPos:   7,	texture0: "go_180k.svg",	texture1: "earned_180k.svg",	texture2: "earn_180k.svg" 	},
	{	level: 22,	playable: true, 	name: "cube320k",	xPos:   8,	zPos:   7,	texture0: "go_320k.svg",	texture1: "earned_320k.svg",	texture2: "earn_320k.svg" 	},
	{	level: 23,	playable: true, 	name: "cube570k",	xPos:   8,	zPos:   9,	texture0: "go_570k.svg",	texture1: "earned_570k.svg",	texture2: "earn_570k.svg" 	},
	{	level: 24,	playable: true, 	name: "cube1m",		xPos:   6,	zPos:   9,	texture0: "go_1m.svg",		texture1: "earned_1m.svg",		texture2: "earn_1m.svg" 	},
	{	level:  0,	playable: false, 	name: "next5",		xPos:   7,	zPos:   9,	texture0: "next_level.svg" 	},
	{	level:  0,	playable: false, 	name: "prev5",		xPos:   7,	zPos:   7,	texture0: "previous_level.svg"	},

	// eGrandPrix
	{	level: 25,	playable: true, 	name: "cube1.8m",	xPos:   6,	zPos:  17,	texture0: "go_1.8m.svg",	texture1: "earned_1.8m.svg",	texture2: "earn_1.8m.svg" 	},
	{	level: 26,	playable: true, 	name: "cube3.2m",	xPos:   8,	zPos:  17,	texture0: "go_3.2m.svg",	texture1: "earned_3.2m.svg",	texture2: "earn_3.2m.svg" 	},
	{	level: 27,	playable: true, 	name: "cube5.7m",	xPos:   8,	zPos:  19,	texture0: "go_5.7m.svg",	texture1: "earned_5.7m.svg",	texture2: "earn_5.7m.svg" 	},
	{	level: 28,	playable: true, 	name: "cube10m",	xPos:   6,	zPos:  19,	texture0: "go_10m.svg",		texture1: "earned_10m.svg",		texture2: "earn_10m.svg" 	},
	{	level:  0,	playable: false, 	name: "next6",		xPos:   7,	zPos:  19,	texture0: "next_level.svg" 	},
	{	level:  0,	playable: false, 	name: "prev6",		xPos:   7,	zPos:  17,	texture0: "previous_level.svg"	},
	{	level: 29,	playable: true, 	name: "cube18m",	xPos:   6,	zPos:  27,	texture0: "go_18m.svg",		texture1: "earned_18m.svg",		texture2: "earn_18m.svg" 	},
	{	level: 30,	playable: true, 	name: "cube32m",	xPos:   8,	zPos:  27,	texture0: "go_32m.svg",		texture1: "earned_32m.svg",		texture2: "earn_32m.svg" 	},
	{	level: 31,	playable: true, 	name: "cube57m",	xPos:   8,	zPos:  29,	texture0: "go_57m.svg",		texture1: "earned_57m.svg",		texture2: "earn_57m.svg" 	},
	{	level: 32,	playable: true, 	name: "cube100m",	xPos:   6,	zPos:  29,	texture0: "go_100m.svg",	texture1: "earned_100m.svg",	texture2: "earn_100m.svg" 	},
	{	level:  0,	playable: false, 	name: "next7",		xPos:   7,	zPos:  29,	texture0: "next_level.svg" 	},
	{	level:  0,	playable: false, 	name: "prev7",		xPos:   7,	zPos:  27,	texture0: "previous_level.svg"	},
	
	// World Cup
	{	level: 33,	playable: true, 	name: "cube180m",	xPos:  30,	zPos:  7,	texture0: "go_180m.svg",	texture1: "earned_180m.svg",	texture2: "earn_180m.svg" 	},
	{	level: 34,	playable: true, 	name: "cube320m",	xPos:  32,	zPos:  7,	texture0: "go_320m.svg",	texture1: "earned_320m.svg",	texture2: "earn_320m.svg" 	},
	{	level: 35,	playable: true, 	name: "cube570m",	xPos:  32,	zPos:  9,	texture0: "go_570m.svg",	texture1: "earned_570m.svg",	texture2: "earn_570m.svg" 	},
	{	level: 36,	playable: true, 	name: "cube1b",		xPos:  30,	zPos:  9,	texture0: "go_1b.svg",		texture1: "earned_1b.svg",		texture2: "earn_1b.svg" 	},
	{	level:  0,	playable: false, 	name: "next8",		xPos:  31,	zPos:  9,	texture0: "next_level.svg" 	},
	{	level:  0,	playable: false, 	name: "prev8",		xPos:  31,	zPos:  7,	texture0: "previous_level.svg"	},

	// ?????
	{	level: 37,	playable: true, 	name: "cube1.8b",	xPos:  30,	zPos:  17,	texture0: "go_1.8b.svg",	texture1: "earned_1.8b.svg",	texture2: "earn_1.8b.svg" 	},
	{	level: 38,	playable: true, 	name: "cube3.2b",	xPos:  32,	zPos:  17,	texture0: "go_3.2b.svg",	texture1: "earned_3.2b.svg",	texture2: "earn_3.2b.svg" 	},
	{	level: 39,	playable: true, 	name: "cube5.7b",	xPos:  32,	zPos:  19,	texture0: "go_5.7b.svg",	texture1: "earned_5.7b.svg",	texture2: "earn_5.7b.svg" 	},
	{	level: 40,	playable: true, 	name: "cube10b",	xPos:  30,	zPos:  19,	texture0: "go_10b.svg",		texture1: "earned_10b.svg",		texture2: "earn_10b.svg" 	},
	{	level:  0,	playable: false, 	name: "prev9",		xPos:  31,	zPos:  17,	texture0: "previous_level.svg"	},


	{	level:  0,	playable: false,  	name: "cubemap",	xPos:  30,	zPos:  -16,	texture0: "worldmap.svg"},
];



const raycaster = new THREE.Raycaster(); // create once
let mouse = new THREE.Vector2(); // create once


// when we look at the game from top 'world view' or 'explore view'
// remember the last camera position and rotation
// and do not allow any other camera/level movements
let exploreView = false;
let lastCameraPos = new THREE.Vector3();
let lastCameraRot = new THREE.Vector3();

// rotation and position for camera to look "down" from "explore view"
const cameraExploreRot = new THREE.Vector3(-90.0 * Math.PI / 180, -7.0 * Math.PI / 180, -90.0 * Math.PI / 180);
const cameraExplorePos  = new THREE.Vector3(10.0, 50, 13.0);




/***********************************************
*                                              *
*              F U N C T I O N S               *
*                                              *
***********************************************/


function makeInstance(geometry, material, x, z, name = '') {
	let cube = new THREE.Mesh(geometry, material);
	if (name === ""){
		cube.name = 'x'+x+'_z'+z;
		// disable for static white boxes
		//cube.matrixAutoUpdate = false

	} else {
		cube.name = name;
	}
	cube.playable = false;
	cube.position.x = x;
	cube.position.z = z;
	
	scene.add(cube);
	return cube;
}


function completeLevel(level) {
	sceneCubes[level -1].children.forEach((obj, index) => {
		if (obj.name == 'texture0') { // go
			obj.visible = false;
		} else if (obj.name == 'texture1') { // earned
			obj.visible = true;
		} else if (obj.name == 'texture2') { // earn
			obj.visible = false;
		}
	});
}


function updateLevels() {
	
	if (exploreView) return;


	sceneCubes.forEach(function(item, index){
		if (item.playable) {
			// ----------------------------------
			// move the camera to current "look at" box
			// ----------------------------------
			if (lookLevel == item.level) {
				// delete old tween
				if (camera.tween !== undefined)
					delete camera.tween;
				
				const boxPos = item.position.clone();
				boxPos.y = 0; // we always move to the 'closed' box position
				const target = boxPos.sub(camera.shift); // remove camera shift from box position
				
				camera.tween = new TWEEN.Tween(camera.position)
			        .to(target, 1000) //  1 second
			        .easing(TWEEN.Easing.Quadratic.InOut)
			        .start();
			}
		
			// current user level!
			if (currentLevel == item.level) {
				item.children.forEach((obj, i) => {
					if (obj.name == 'texture0') { // go
						obj.visible = true;
					} else if (obj.name == 'texture1') { // earned
						obj.visible = false;
					} else if (obj.name == 'texture2') { // earn
						obj.visible = false;
					}
				});
				// move the box up
				if (item.position.y != 1) {
					new TWEEN.Tween(item.position)
	    				.to({y: 1}, 700)
	    				.easing(TWEEN.Easing.Cubic.Out)
	    				.start();
    			}
			}

			// passed level
			if (currentLevel > item.level) {
				item.children.forEach((obj, i) => {
					if (obj.name == 'texture0') { // go
						obj.visible = false;
					} else if (obj.name == 'texture1') { // earned
						obj.visible = false;
					} else if (obj.name == 'texture2') { // earn
						obj.visible = true;
					}
				});


				// move the passed box up
				if (item.position.y != 1) {
					new TWEEN.Tween(item.position)
	    				.to({y: 1}, 700)
	    				.easing(TWEEN.Easing.Cubic.Out)
	    				.start();
    			}
			}

			// future level
			if (currentLevel < item.level) {
				item.children.forEach((obj, i) => {
					if (obj.name == 'texture0') { // go 
						obj.visible = false;
					} else if (obj.name == 'texture1') { // earned
						obj.visible = false;
					} else if (obj.name == 'texture2') { // earn
						obj.visible = true;
					}
				});

				// move the box down
				// probably we won't need this in actual game
				if (item.position.y != 0) {
					new TWEEN.Tween(item.position)
	    				.to({y: 0}, 700)
	    				.easing(TWEEN.Easing.Cubic.Out)
	    				.start();
	    		}
			}
		}
	});
}

// custom svg loader to handle different texture transparency and depth test
function loadSvg(fileName, object, textureName, visible = false) {
	let svg = new THREE.SVGLoader();
	let group = new THREE.Group();
	svg.load(
		'img/'+fileName,
		// called when the resource is loaded
		function ( data ) {
			for (let i = 0; i < data.paths.length; i ++) {
				const path = data.paths[ i ];
				const material = new THREE.MeshBasicMaterial( {
					color: path.color,
					side: THREE.DoubleSide,
					depthWrite: fileName == "worldmap.svg" ? true : false,
					transparent: fileName == "worldmap.svg" ? false : true,
				} );

				const shapes = path.toShapes( true );
				for (let j = 0; j < shapes.length; j ++) {
					const geometry = new THREE.ShapeBufferGeometry(shapes[j]);
					const mesh = new THREE.Mesh(geometry, material);
					group.add(mesh);
				}
			}
			
			group.name = textureName;
			if (fileName == "worldmap.svg") {
				group.scale.set(0.011, 0.011, 0.011);
				group.rotateY(THREE.Math.degToRad(270));
				group.rotateX(THREE.Math.degToRad(90));
				group.translateX(-0.5);
				group.translateY(-0.5);
				group.translateZ(-0.4);
			} else {
				group.scale.set(0.01, 0.01, 0.01);
				group.rotateY(THREE.Math.degToRad(270));
				group.rotateX(THREE.Math.degToRad(90));
				group.translateX(-0.5);
				group.translateY(-0.5);
				group.translateZ(-0.5005);
			}
			group.visible = visible;
			//group is loaded, ad it to the object...
			object.add(group);
		},
		// called when loading is in progresses
		function ( xhr ) {
			// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// called when loading has errors
		function ( error ) {
			console.log( 'SVG error with file ' + fileName);
		}
	);
}


function render(time) {	
	//delta += clock.getDelta();
	//if (delta  > interval) {
		renderer.render(scene, camera);
		TWEEN.update(time);
	//}
	requestAnimationFrame(render);

}


/********************************************************************
*                                                                   *
*               fly camera to 'explore view' and back               *
*                                                                   *
*********************************************************************/
// these are the values that will be changed in tween to expore view
// but currently they have "game cubes" view values
const exploreFog = { x: 4.0, y: 13.0 };
const exploreOpacity = { x: 1.0 };


function flyExplore() {
    	
	exploreView = !exploreView;
	//*******************************************
	// show 'explore view'
	//*******************************************
	if (exploreView) {

		// remember where was the camera
    	lastCameraRot = new THREE.Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    	lastCameraPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);

       	camera.tween2 = new TWEEN.Tween(camera.rotation)
			        .to(cameraExploreRot, 6000) //  1 second
			        .easing(TWEEN.Easing.Quadratic.Out)
			        .onUpdate(() => {
								//console.log(camera.lookAt);
							})
			        .start();

 		camera.tween3 = new TWEEN.Tween(camera.position)
			        .to(cameraExplorePos, 6000) //  1 second
			        .easing(TWEEN.Easing.Quadratic.InOut)
			        .start();


		if (!dbg) {
			scene.fog.tween = new TWEEN.Tween(exploreFog)
	            .to({ x: 51, y: 53.0 }, 6000)
	            .easing(TWEEN.Easing.Cubic.InOut)
	            .onUpdate(() => {
	            	scene.fog.near = exploreFog.x;
	            	scene.fog.far  = exploreFog.y;
	        	})
	            .onComplete(() => {
	            	//
	        	})
	           .start();

	        materialBortik.tween = new TWEEN.Tween(exploreOpacity)
	            .to({ x: 0.0}, 4000)
	            .easing(TWEEN.Easing.Cubic.InOut)
	            .onUpdate(() => {
	            	materialBortik.opacity = exploreOpacity.x;
	        	})
	            .onComplete(() => {
	            	//
	        	})
		        .start();
	    }


	//*******************************************
	// go back to boxes
	//*******************************************
	} else {
		camera.tween2 = new TWEEN.Tween(camera.rotation)
			        .to(lastCameraRot, 6000) //  1 second
			        .easing(TWEEN.Easing.Quadratic.In)
			        .onUpdate(() => {
								//console.log(camera.lookAt);
							})
			        .start();

 		camera.tween3 = new TWEEN.Tween(camera.position)
			        .to(lastCameraPos, 6000) //  1 second
			        .easing(TWEEN.Easing.Quadratic.InOut)
			        .start();

		if (!dbg) {
			scene.fog.tween = new TWEEN.Tween(exploreFog)
	            .to({ x: 4.0, y: 13.0 }, 6000)
	            .easing(TWEEN.Easing.Cubic.InOut)
	            .onUpdate(() => {
	            	scene.fog.near = exploreFog.x;
	            	scene.fog.far  = exploreFog.y;
	        	})
	            .onComplete(() => {
	            	//
	        	})
	           .start();


	        materialBortik.tween = new TWEEN.Tween(exploreOpacity)
	            .to({ x: 1.0}, 4000)
	            .easing(TWEEN.Easing.Cubic.InOut)
	            .onUpdate(() => {
	            	materialBortik.opacity = exploreOpacity.x;
	        	})
	            .onComplete(() => {
	            	//
	        	})
		        .start();
	    }
	}
}



/********************************************************************/
function click(x, y) {		
	
	if (exploreView) return;

	mouse.x = ( x / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( y / renderer.domElement.clientHeight ) * 2 + 1;
	
	// calculate objects intersecting the picking ray var intersects =     
	raycaster.setFromCamera(mouse, camera); 
	const intersects = raycaster.intersectObjects(scene.children); 


	// did we click any of the boxes?
	if ((typeof intersects !== 'undefined') && intersects.length) {
		
		// which box is closest to camera?
		let closest = 0;
		let distance = 100; // far back...

		// find the box closest to camera position
		for ( var i = 0; i < intersects.length; i++ ) { 
			const currentDistance = intersects[i].object.position.distanceTo(camera.position);
			if (currentDistance < distance) {
				distance = currentDistance;
				closest = i;
			}
		}

		let theBox = intersects[closest].object;
		if (dbg) console.log('intersect: ' + intersects[closest].object.name + (intersects[closest].object.playable ? ' [playable]' : ''));

		// round level by 4
		const rounded4 = lookLevel - (lookLevel-1)%4;

		if (theBox.playable) {
			// current level is updated just by clicking
			if (true/*dbg*/) {
				currentLevel = intersects[closest].object.level;
			}
			lookLevel = intersects[closest].object.level;
			updateLevels();

		// SHOW next 4 boxes
		} else if (theBox.name.search('next') != -1) {
			if (rounded4 < maxLevel - 4) {
				lookLevel = rounded4 + 4;
				updateLevels();
			}

		// SHOW previous 4 boxes
		} else if (theBox.name.search('prev') != -1) {
			if (rounded4 > 0) {
				lookLevel = rounded4 - 4;
				updateLevels();
			}
		}
	}	
}




/***************************************
*                 SCENE                *
***************************************/
const scene = new THREE.Scene();

if (!dbg) {
	const fogColor = new THREE.Color(0xffffff);
	const fogNear = 4.0;
	const fogFar = 13;
	scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
	scene.background = new THREE.Color(0xffffff);
} else {
	scene.background = new THREE.Color(0xcc1199);
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);
}
// needed for three.js debug tools
window.scene = scene;



/***************************************
*               RENDERER               *
***************************************/
const renderer = new THREE.WebGLRenderer({antialias: (dbg ? false : true), alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(dbg ? (window.devicePixelRatio/4) : window.devicePixelRatio);

var container = document.getElementById('container');
container.appendChild(renderer.domElement);


/***************************************
*                CAMERA                *
***************************************/
const fov = 45;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.01;
const far = (dbg ? 1000 : 200);
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.focus = 10;
camera.filmGauge = 35;
camera.filmOffset = 0;

camera.position.set(-5.1,3.974,-5.3);
const zeroVec = new THREE.Vector3(-1.0,0.5,-2.0);
camera.lookAt(zeroVec);

// the position of level 1 box
const boxVec = new THREE.Vector3(-2.0,0.0,-3.0); 
camera.shift = boxVec.sub(camera.position);



/***************************************
*              MATERIALS               *
***************************************/
const materialBortik = new THREE.MeshBasicMaterial({
	color: 0xFFFFFF,
	map: new THREE.TextureLoader().load('img/bortik.png'),
	transparent: true,
	opacity: 1.0,
});

const materialBlue = new THREE.MeshBasicMaterial({color: 0x105CFB});



/************************************************************************
*                                                                       *
*                  C R E A T E    G A M E    C U B E S                  *
*                                                                       *
************************************************************************/
const geometry = new THREE.BoxBufferGeometry(1);


// create white cubes...               
if (!dbg) {
	for (let i = -10; i < 45; i++) {
		for (let j = -17; j < 45; j++) {
			makeInstance(geometry, materialBortik, i, j);
		}
	}
}

gameCubes.forEach(function(item, index){
	// delete white cube if it's here
	// TODO: find a better way to do it
	const theSeatIsTaken = scene.getObjectByName('x' + item.xPos + '_z' + item.zPos);
	if (theSeatIsTaken  !== undefined) {
		scene.remove(theSeatIsTaken);
	}

	let currentCube = makeInstance(geometry, (item.playable ? materialBlue : materialBortik), item.xPos, item.zPos, item.name);

	// first level and prev/next boxes have  texture0 enabled by default
	loadSvg(item.texture0, currentCube, 'texture0', ((item.level==1)||(item.level==0)) ? true : false);

	if (item.playable) {
		loadSvg(item.texture1, currentCube, 'texture1', false);
		loadSvg(item.texture2, currentCube, 'texture2', (item.level>1) ? true : false);
	}

	currentCube.playable = item.playable;
	currentCube.level = item.level;

	// save all the playable cubes in the separate array for quick access
	if (currentCube.playable)
		sceneCubes.push(currentCube);
  
});




/***********************************************
*                                              *
*                  H O O K S                   *
*                                              *
***********************************************/
window.addEventListener('mousedown', function (event) { click(event.clientX, event.clientY); });
window.addEventListener('touchstart', function (event) { click(event.changedTouches[0].pageX, event.changedTouches[0].pageY); });

window.addEventListener('keydown', function (event) {     
	// left arrow
	if (event.keyCode == '37') { 
       if (lookLevel > 1)
       		lookLevel = lookLevel - 1;
       updateLevels();
    
    // right arrow
    } else if (event.keyCode == '39') {  
       if (lookLevel < maxLevel)
       		lookLevel = lookLevel + 1;
       	updateLevels();

    // space
    } else if (event.keyCode == 0 || event.keyCode == 32) { 
       flyExplore();
    }
	return false;
});

// TODO: slight camera rotation with mouse
window.addEventListener('mousemove', function (event) {					
});

// update camera matrix on window resize
window.addEventListener( 'resize', function () {
	if (camera) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
	if (renderer) {
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
});



requestAnimationFrame(render);


