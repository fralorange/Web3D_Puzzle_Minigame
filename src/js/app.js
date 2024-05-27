import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import '../css/styles.css';

// scene, cam, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cam
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(75, 15, 0);
controls.update();

// light
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientLight);

// scene
scene.background = new THREE.Color(0xFFFFFF);

// model
const loader = new STLLoader();
const pieces = [];

function loadModel(url, id, x, y, z, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ) {
	loader.load(`../models/${url}.stl`, (geometry) => {
		const material = (url.includes('Part') || url === 'Rod') ? new THREE.MeshStandardMaterial({ color: 0xFF0000 }) : new THREE.MeshStandardMaterial({ color: 0x00FF00 });
		const model = new THREE.Mesh(geometry, material);
		model.visible = false;
		model.position.set(x, y, z);
		model.rotation.set(rotationX, rotationY, rotationZ);
		model.scale.set(scaleX, scaleY, scaleZ);
		model.userData.id = id;
		scene.add(model);
		pieces.push(model);
	});
}

function duplicateAndMirrorModel(model) {
	const mirroredModel = model.clone();
	mirroredModel.position.x = -model.position.x;
	mirroredModel.rotation.y = Math.PI;
	return mirroredModel;
}

const models = [
	{ url: 'Part1', id: 1, x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part2', id: 2, x: 1.1, y: -2.5, z: -4, rotationX: (11*Math.PI / 6), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part3', id: 3, x: 1.2, y: 7, z: 1.5, rotationX: (Math.PI / 2.1), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1.25, scaleZ: 1 },
	{ url: 'Part4', id: 4, x: 2.2, y: -3, z: 12, rotationX: (Math.PI / 1.25), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part5', id: 5, x: 2.3, y: -3, z: -16, rotationX: -(Math.PI * 1.1), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part6', id: 6, x: 3, y: 15.7, z: 0.6, rotationX: (Math.PI / 5.6), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part7', id: 7, x: 3.3, y: -16.5, z: 5, rotationX: (Math.PI * 1.1), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part8', id: 8, x: 5.2, y: -4, z: 15.5, rotationX: -(Math.PI / 1.8), rotationY: 0, rotationZ: (Math.PI), scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part9', id: 9, x: 4, y: -5, z: -10, rotationX: (Math.PI / 1.15), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part10', id: 10, x: 4.4, y: -7, z: 13, rotationX: (Math.PI / 1.35), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part11', id: 11, x: 6.4, y: 18, z: -6, rotationX: (2* Math.PI / 0.98), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part12', id: 12, x: 5.6, y: -5, z: -11, rotationX: (Math.PI / 1.8), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part13', id: 13, x: 7.4, y: -12, z: 12, rotationX: (Math.PI / 1.1), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part14', id: 14, x: 7.0, y: -2, z: 12, rotationX: (Math.PI / 1.75), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part15', id: 15, x: 7.4, y: -5, z: -19, rotationX: -(Math.PI / 2), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part16', id: 16, x: 8.8, y: 18, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part17', id: 17, x: 9.4, y: -10, z: -6.5, rotationX: -(Math.PI / 1.35), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part18', id: 18, x: 11.4, y: -15, z: -5.5, rotationX: (Math.PI * 1.1), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part19', id: 19, x: 13.4, y: 8.5, z: 15, rotationX: (Math.PI / 3), rotationY: (Math.PI), rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part20', id: 20, x: 11.4, y: 7.5, z: -10, rotationX: 0, rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Part21', id: 21, x: 12.4, y: 2, z: -6, rotationX: (Math.PI * 1.15), rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Stem', id: 22, x: 31.5, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
	{ url: 'Rod', id: 23, x: 33, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
];

models.forEach(async (model) => {
	loadModel(model.url, model.id, model.x, model.y, model.z, model.rotationX, model.rotationY, model.rotationZ, model.scaleX, model.scaleY, model.scaleZ);
	const modelStl = await import(`../models/${model.url}.stl`);
});


function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
animate();

// menubar
const menu = document.getElementById('menu');
const order = Array(23).fill(1).map((x, y) => x + y);
let currentIndex = 0;

order.forEach(id => {
	const button = document.createElement('div');
	button.textContent = `Деталь ${id}`;
	button.addEventListener('click', () => {
		if (id == order[currentIndex]) {
			currentIndex++;
			const piece = pieces.find(p => p.userData.id == id);
			if (piece) {
				piece.visible = true;
			}
		} else {
			alert(`Неверный выбор!`);
		}
	});
	menu.appendChild(button);
});