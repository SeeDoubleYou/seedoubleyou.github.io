<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from 'three';

const stageCanvas = ref<HTMLCanvasElement | THREE.OffscreenCanvas>();

onMounted(() => {
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let material: THREE.PointsMaterial;

  let mouseX = 0, mouseY = 0;

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0015);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const sprite = new THREE.TextureLoader().load('/textures/sprites/disc.png');

    for (let i = 0; i < 10000; i++) {
      const x = 2000 * Math.random() - 1000;
      const y = 2000 * Math.random() - 1000;
      const z = 2000 * Math.random() - 1000;
      vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    material = new THREE.PointsMaterial({ size: 35, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true });
    material.color.setHSL(1.0, 0.3, 0.7);

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    //

    renderer = new THREE.WebGLRenderer({
      canvas: stageCanvas.value,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.style.touchAction = 'none';
    document.body.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onPointerMove(event: PointerEvent) {
    if (event.isPrimary === false) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  //

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (- mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    const h = (360 * (1.0 + time) % 360) / 360;
    material.color.setHSL(h, 0.5, 0.5);

    renderer.render(scene, camera);
  }
});
</script>

<template>
  <h1 class="logo">SeeDoubleYou.dev</h1>
  <div class="dodge" />
  <canvas class="stage" ref="stageCanvas"></canvas>
</template>

<style scoped>
.stage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.dodge {
  position: absolute;
  top: calc(-1 * (100vh + 100vw));
  left: calc(-1 * (100vh + 100vw));
  bottom: 0;
  right: 0;

  background: radial-gradient(circle,white,black 45%) center / 15% 30%;
  
  mix-blend-mode: color-dodge;
  animation: dodge-area 16s linear infinite;
  transform-origin: center center;
}

@keyframes dodge-area {
  0%   { transform: translate(0%,   0%) rotate(0deg); }
  25%  { transform: translate(0%, 50%) rotate(90deg); }
  50%  { transform: translate(50%, 50%) rotate(180deg); }
  75%  { transform: translate(50%, 0%) rotate(270deg); }
  100% { transform: translate(0%,   0%) rotate(359deg); }
}

.logo {
  font-size: calc(100vw / 10);
}

h1:before {
  content: "SeeDoubleYou.dev";
  position: absolute;

  background: linear-gradient(0deg, rgba(0,0,0,1) 29%, rgba(255,255,255,1) 58%, rgba(255,255,255,1) 61%, rgba(0,0,0,1) 83%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;

  mix-blend-mode: difference;
  filter: blur(10px);
  animation: diff-area 10s ease-in-out infinite;
}

@keyframes diff-area {
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 0; }
}

</style>
