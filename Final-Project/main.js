/*
*   Tragen Von Aesch
*   CS-375 Final Project
*
* Inspiration:
* When I was learning three.js I watched alot of vieos from SimonDev
*   just wanted to state that my updateCamera() and resize handeling 
*   functions are from him, as well as parts of my move cube function
*/

import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.141/examples/jsm/loaders/GLTFLoader.js';

// Create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);



/*
///////////     skyBox     ////////////////////
const sbLoader = new THREE.CubeTextureLoader();
const texture = sbLoader.load([
    './models/skybox/Daylight Box_Right.bmp',
    './models/skybox/Daylight Box_Left.bmp',
    './models/skybox/Daylight Box_Top.bmp',
    './models/skybox/Daylight Box_Bottom.bmp',
    './models/skybox/Daylight Box_Front.bmp',
    './models/skybox/Daylight Box_Back.bmp',
]);
scene.background = texture;
*/



const sbLoader = new THREE.CubeTextureLoader();
const texture = sbLoader.load([
'./models/skybox/ulukai/corona_rt.png',
'./models/skybox/ulukai/corona_lf.png',
'./models/skybox/ulukai/corona_up.png',
'./models/skybox/ulukai/corona_dn.png',
'./models/skybox/ulukai/corona_ft.png',
'./models/skybox/ulukai/corona_bk.png',
]);

scene.background = texture;






//////////////     Score Counter    //////////////////////////////
let score = 0;
const scoreElement = document.createElement('div');
scoreElement.style.position = 'absolute';
scoreElement.style.top = '10px';
scoreElement.style.right = '10px';
scoreElement.style.fontSize = '24px';
scoreElement.style.color = 'white';
scoreElement.innerHTML = `Score: ${score}`;
document.body.appendChild(scoreElement);







//////////////   Lighting ////////////////////////////
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 200, 100);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Overhead
scene.add(ambientLight);






/////////////////        Load Checkerboard Floor     ////////////////////////////////
const loader = new GLTFLoader();
loader.load('models/checker/scene.gltf', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.receiveShadow = true;
        }
    });
    gltf.scene.position.y = -20;
    gltf.scene.scale.set(2, 1, 2); 
    scene.add(gltf.scene);
});







///////////           Cube (the subject)       ///////////////////////////
const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.castShadow = true;
scene.add(cube);







//////////////////           Pillars      /////////////////////////
const pillars = [];
function generatePillars(numPillars, height, width) {
    for (let i = 0; i < numPillars; i++) {
        const x = THREE.MathUtils.randInt(-250, 250);
        const z = THREE.MathUtils.randInt(-250, 250);

        const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.5); 
        const pillar = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, width),
            new THREE.MeshStandardMaterial({ color })
        );
        pillar.position.set(x, height / 2 - 20, z);
        pillar.castShadow = true;
        scene.add(pillar);
        pillar.userData.box = new THREE.Box3().setFromObject(pillar);
        pillars.push(pillar);
    }
}
generatePillars(75, 100, 15);

///////////////         Cubes         ///////////////
const randomCubes = [];
function generateRandomCubes(numCubes, height) {
    for (let i = 0; i < numCubes; i++) {
        const x = THREE.MathUtils.randInt(-250, 250);
        const z = THREE.MathUtils.randInt(-250, 250);
        const y = THREE.MathUtils.randInt(-17, height - 20);

        const randomCube = new THREE.Mesh(
            new THREE.BoxGeometry(6, 6, 6),
            new THREE.MeshStandardMaterial({ color: 0xff00ff })
        );
        randomCube.position.set(x, y, z);
        randomCube.castShadow = true;
        scene.add(randomCube);
        randomCube.userData.box = new THREE.Box3().setFromObject(randomCube);
        randomCubes.push(randomCube);
    }
}
generateRandomCubes(50, 50);

/////////////          Movement Controls           /////////////////////
let direction = new THREE.Vector3(0, 0, -1); // forward 
let velocityY = 0;
const speed = 40; 
const verticalSpeed = 20; 
const keys = { w: false, a: false, s: false, d: false, ' ': false };
document.addEventListener('keydown', (event) => { if (keys[event.key.toLowerCase()] !== undefined) keys[event.key.toLowerCase()] = true; });
document.addEventListener('keyup', (event) => { if (keys[event.key.toLowerCase()] !== undefined) keys[event.key.toLowerCase()] = false; });

function moveCube(delta) {
    const rotationSpeed = Math.PI * delta;

    
    if (keys.a) cube.rotation.y += rotationSpeed; // left
    if (keys.d) cube.rotation.y -= rotationSpeed; // right

    
    direction.set(0, 0, -1);
    direction.applyQuaternion(cube.quaternion);

    
    const moveVector = new THREE.Vector3();
    if (keys.w) moveVector.copy(direction).multiplyScalar(speed * delta); // Forward
    if (keys.s) moveVector.copy(direction).multiplyScalar(-speed * delta); // Backward
    cube.position.add(moveVector);

    // up / down
    if (keys[' ']) {
        velocityY = verticalSpeed; 
    } else {
        velocityY = -verticalSpeed; 
    }
    cube.position.y += velocityY * delta;
    if (cube.position.y < -17) { // ground
        cube.position.y = -17;
        velocityY = 0;
    }

    // bBox
    const cubeBox = new THREE.Box3().setFromObject(cube);

    
    for (const pillar of pillars) {
        if (cubeBox.intersectsBox(pillar.userData.box)) {
            alert('Game Over! You hit a pillar.');
            window.location.reload();
        }
    }


    for (let i = randomCubes.length - 1; i >= 0; i--) {
        if (cubeBox.intersectsBox(randomCubes[i].userData.box)) {
            scene.remove(randomCubes[i]);
            randomCubes.splice(i, 1);
            score++;
            scoreElement.innerHTML = `Score: ${score}`;
        }
    }
}


function updateCamera(delta) {
    const offset = new THREE.Vector3(0, 10, 20).applyQuaternion(cube.quaternion); 
    const desiredPosition = cube.position.clone().add(offset);
    camera.position.lerp(desiredPosition, delta * 2); 
    camera.lookAt(cube.position); 
}






////////////            Animation Loop          //////////////////////
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    moveCube(delta);
    updateCamera(delta);

    renderer.render(scene, camera);
}
animate();





///////////              Resize handling       //////////////////////
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

