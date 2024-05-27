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
camera.position.set(0, 0, 5);
controls.update();

// light
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// scene
scene.background = new THREE.Color(0xFFFFFF);

// model
const loader = new STLLoader();
const pieces = [];

function loadModel(url, id, x, y, z) {
	loader.load(`../models/${url}.stl`, (geometry) => {
		const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xFFFFFF });
		const model = new THREE.Mesh(geometry, material);
		model.position.set(x, y, z);
		model.userData.id = id;
		scene.add(model);
		pieces.push(model);
	});
}

const models = [
	{ url: 'Part1', id: 1, x: 0, y: 0, z: 0 },
	{ url: 'Part2', id: 2, x: 1.5, y: 0, z: 0 },
	{ url: 'Part3', id: 3, x: 3, y: 0, z: 0 },
	{ url: 'Part4', id: 4, x: 4.5, y: 0, z: 0 },
	{ url: 'Part5', id: 5, x: 6, y: 0, z: 0 },
	{ url: 'Part6', id: 6, x: 7.5, y: 0, z: 0 },
	{ url: 'Part7', id: 7, x: 9, y: 0, z: 0 },
	{ url: 'Part8', id: 8, x: 10.5, y: 0, z: 0 },
	{ url: 'Part9', id: 9, x: 12, y: 0, z: 0 },
	{ url: 'Part10', id: 10, x: 13.5, y: 0, z: 0 },
	{ url: 'Part11', id: 11, x: 15, y: 0, z: 0 },
	{ url: 'Part12', id: 12, x: 16.5, y: 0, z: 0 },
	{ url: 'Part13', id: 13, x: 18, y: 0, z: 0 },
	{ url: 'Part14', id: 14, x: 19.5, y: 0, z: 0 },
	{ url: 'Part15', id: 15, x: 21, y: 0, z: 0 },
	{ url: 'Part16', id: 16, x: 22.5, y: 0, z: 0 },
	{ url: 'Part17', id: 17, x: 24, y: 0, z: 0 },
	{ url: 'Part18', id: 18, x: 25.5, y: 0, z: 0 },
	{ url: 'Part19', id: 19, x: 27, y: 0, z: 0 },
	{ url: 'Part20', id: 20, x: 28.5, y: 0, z: 0 },
	{ url: 'Part21', id: 21, x: 30, y: 0, z: 0 },
	{ url: 'Stem', id: 22, x: 31.5, y: 0, z: 0 },
	{ url: 'Rod', id: 23, x: 33, y: 0, z: 0 },
];

models.forEach(async (model) => {
	loadModel(model.url, model.id, model.x, model.y, model.z);
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
			alert(`Неправильно!`);
		}
	});
	menu.appendChild(button);
});