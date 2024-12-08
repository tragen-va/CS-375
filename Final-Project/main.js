import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild( renderer.domElement );




// box geometry
const boxGeometry = new THREE.BoxGeometry( 1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add( cube );



// plane

const planeGeometry = new THREE.PlaneGeometry( 5, 50, 10, 10); 
//const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} ); 
const planeMaterial = new THREE.MeshPhongMaterial( {color: 0xffff00, side: THREE.DoubleSide} ); 
const plane = new THREE.Mesh( planeGeometry, planeMaterial ); 
scene.add( plane );
plane.rotation.x -= 0.9;

// light

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)
scene.add(light)



camera.position.z = 5;
function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );






