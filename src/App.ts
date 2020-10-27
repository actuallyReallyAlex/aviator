import copy from "copy-to-clipboard";
import * as THREE from "three";
import {
  GridHelper,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Light from "./light/Light";
import Sea from "./mesh/Sea";

import Stats from "three/examples/jsm/libs/stats.module";
import Sky from "./mesh/Sky";
import Airplane from "./mesh/Airplane";
import { normalize } from "./uti";
import { GUIParams } from "./types";
import ApplicationGUI from "./GUI";

class App {
  constructor() {
    // * Params
    this.params = {
      editMode: false,
      exportValues: () => {
        const code = [];
        for (let i = 0; i < 8; i++) {
          code.push(
            `geometry.vertices[${i}].set(${this.editMeshGeometry.vertices[i].x}, ${this.editMeshGeometry.vertices[i].y}, ${this.editMeshGeometry.vertices[i].z});`
          );
        }
        copy(code.join("\n"), { format: "text/plain" });
      },
      meshToEdit: "engine",
      trackMouseMovement: false,
      _0x: 30,
      _0y: 20,
      _0z: 25,
      _1x: 30,
      _1y: 20,
      _1z: -25,
      _2x: 10,
      _2y: -15,
      _2z: 25,
      _3x: 10,
      _3y: -15,
      _3z: -25,
      _4x: -25,
      _4y: 25,
      _4z: -25,
      _5x: -25,
      _5y: 25,
      _5z: 25,
      _6x: -25,
      _6y: -25,
      _6z: -25,
      _7x: -25,
      _7y: -25,
      _7z: 25,
    };

    // * Base
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.appendToContainer();

    // * Objects
    this.createLight();
    this.createSea();
    this.createSky();
    this.createAirplane();
    this.createEditMesh();

    // * Helpers
    this.orbitControls = null;
    this.createStats();
    this.createHelper();
    this.gui = new ApplicationGUI(this);

    // * Other
    this.addObjectsToScene();
    this.setupListeners();

    this.tick = this.tick.bind(this);
    this.tick();
  }

  airplane!: Airplane;
  camera!: PerspectiveCamera;
  editMesh!: Object3D;
  editMeshGeometry!: any;
  gui: ApplicationGUI;
  helper!: GridHelper | null;
  light!: Light;
  mousePosition!: { x: number; y: number };
  orbitControls!: OrbitControls | null;
  params: GUIParams;
  renderer!: WebGLRenderer;
  sea!: Sea;
  scene!: Scene;
  sky!: Sky;
  stats!: Stats;

  addObjectsToScene(): void {
    this.scene.add(this.light.hemisphereLight);
    this.scene.add(this.light.shadowLight);
    this.scene.add(this.light.ambientLight);
    this.scene.add(this.sea.mesh);
    this.scene.add(this.sky.mesh);
    this.scene.add(this.airplane.mesh);
  }

  appendToContainer(): void {
    const container = document.getElementById("world");
    container?.appendChild(this.renderer.domElement);
  }

  createAirplane(): void {
    this.airplane = new Airplane();
  }

  createCamera(): void {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 10000;
    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    this.camera.position.set(0, 100, 200);
  }

  createEditMesh(): void {
    this.editMesh = new THREE.Object3D();
  }

  createSky(): void {
    this.sky = new Sky();
  }

  createHelper(): void {
    this.helper = new THREE.GridHelper(2000, 100);
    this.helper.position.y = -199;
    this.editMesh.add(this.helper);
  }

  createLight(): void {
    this.light = new Light();
  }

  createRenderer(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
  }

  createSea(): void {
    this.sea = new Sea();
  }

  createScene(): void {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    this.mousePosition = { x: 0, y: 0 };
  }

  createStats(): void {
    const container = document.getElementById("world");
    this.stats = Stats();
    container?.appendChild(this.stats.dom);
  }

  setupListeners(): void {
    window.addEventListener(
      "resize",
      () => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      },
      false
    );
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  tick(): void {
    this.stats.update();

    this.render();
    this.update();

    requestAnimationFrame(this.tick);
  }

  update(): void {
    // * Update plane
    if (this.params.trackMouseMovement) {
      // * Calculate Targets
      const targetX = normalize(this.mousePosition.x, -0.75, 0.75, -100, 100);
      const targetY = normalize(this.mousePosition.y, -0.75, 0.75, 25, 175);

      // * Update Airplane Position
      this.airplane.mesh.position.setX(targetX);
      this.airplane.mesh.position.setY(
        this.airplane.mesh.position.y +
          (targetY - this.airplane.mesh.position.y) * 0.1
      );
      // * Update Airplane Rotation
      this.airplane.mesh.rotation.x =
        (this.airplane.mesh.position.y - targetY) * 0.0064;
      this.airplane.mesh.rotation.z =
        (targetY - this.airplane.mesh.position.y) * 0.0128;
    }

    // * Update propeller
    if (!this.params.editMode) {
      this.airplane.propeller.rotation.x += 0.3;
    }

    // * Update Sea
    this.sea.mesh.rotation.z += 0.005;

    // * Update Sky
    this.sky.mesh.rotation.z += 0.01;

    // * Update pilot hair
    this.airplane.pilot.updateHairs();

    // * Update waves
    this.sea.moveWaves();
  }
}

export default App;
