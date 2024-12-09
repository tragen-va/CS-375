import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FirstPersonControls } from './FirstPersonControls.js';
//import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const clock = new THREE.Clock();
let isPaused = false;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild( renderer.domElement );

const controls = new FirstPersonControls (camera, renderer.domElement)
controls.lookSpeed = 0.09; 
controls.movementSpeed = 10; 
controls.lookVertical = true; 
controls.activeLook = true; 
controls.enabled = true;



camera.position.z = 0;
camera.position.y = 5;
camera.position.x = -12;



//////// disable default mouse right/left binds from FirstPersonConstols  ////////
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE, 
    MIDDLE: THREE.MOUSE.ZOOM,
    RIGHT: THREE.MOUSE.PAN 
};








/////// load gltfl ///////////
const loader = new GLTFLoader();

loader.load( 'models/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );









////////   light //////////////////
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);






/////////   keyboard event listeners    //////////////
const keys = {

    a: {pressed: false},
    d: {pressed: false},
    w: {pressed: false},
    s: {pressed: false},
    space: {pressed: false},
    rClick: {pressed: false},
    lClick: {pressed: false}
}


window.addEventListener('keydown', (event) => {
    switch(event.code) {
        case 'KeyA':
            keys.a.pressed = true 
            break

        case 'KeyD':
            keys.d.pressed = true
            break


        case 'KeyW':
         keys.w.pressed = true 
            break

        case 'KeyS':
            keys.s.pressed = true 
            break

        case 'KeyP':
            isPaused = !isPaused;
            break;

    }
});


window.addEventListener('keyup', (event) => {
    switch(event.code) {
        case 'KeyA':
            keys.a.pressed = false 
             break

        case 'KeyD':
            keys.d.pressed = false
            break


        case 'KeyW':
            keys.w.pressed = false
            break

        case 'KeyS':
            keys.s.pressed = false
            break

    }
});






function animate() {

    if (!isPaused) {
        controls.update( clock.getDelta() );
        renderer.render( scene, camera );
        if (keys.a.pressed) {
            camera.position.x -= .1;
        } else if (keys.d.pressed) {
            camera.position.x += .1;
        } else if (keys.w.pressed) {
            camera.position.z -= .1;
        } else if (keys.s.pressed) {
            camera.position.z += .1;
        } 

    }

}
renderer.setAnimationLoop( animate );






