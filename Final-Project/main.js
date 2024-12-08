import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild( renderer.domElement );



/////// load gltfl ///////////


const loader = new GLTFLoader();

loader.load( 'models/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );











// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);



camera.position.z = 0;
camera.position.y = 5;
camera.position.x = -12;

function animate() {

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );






