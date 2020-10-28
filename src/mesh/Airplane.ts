import * as THREE from "three";
import { Mesh, Object3D } from "three";

import { colors } from "../constants";
import Pilot from "./Pilot";

class Airplane {
  constructor() {
    this.mesh = new THREE.Object3D();

    this.createNoseCone();
    this.createCockpit();
    this.createEngine();
    this.createTail();
    this.createWing();
    this.createBlade();
    this.createPilot();
    this.createPropeller();
    this.mesh.scale.set(0.25, 0.25, 0.25);
    this.mesh.position.set(0, 100, 0);
  }

  blade!: Mesh;
  cockpit!: Mesh;
  engine!: Object3D;
  engineBottom!: Mesh;
  engineTop!: Mesh;
  mesh!: Object3D;
  noseCone!: Mesh;
  pilot!: Pilot;
  propeller!: Mesh;
  tail!: Mesh;
  wing!: Mesh;

  createNoseCone(): void {
    const geometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.white,
      flatShading: true,
    });
    const noseCone = new THREE.Mesh(geometry, material);
    this.noseCone = noseCone;
    this.noseCone.position.set(150, 0, 0);
    this.noseCone.castShadow = true;
    this.noseCone.receiveShadow = true;
    
    geometry.vertices[0].set(10, 0, 0);
    geometry.vertices[1].set(10, 0, 0);
    geometry.vertices[2].set(10, 0, 0);
    geometry.vertices[3].set(10, 0, 0);
    geometry.vertices[4].set(-5, 5, -5);
    geometry.vertices[5].set(-5, 5, 5);
    geometry.vertices[6].set(-5, -5, -5);
    geometry.vertices[7].set(-5, -5, 5);
    this.mesh.add(this.noseCone);
  }

  createBlade(): void {
    const geometry = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.brownDark,
      flatShading: true,
    });
    const blade = new THREE.Mesh(geometry, material);
    blade.position.set(3, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.blade = blade;
  }

  createCockpit(): void {
    // const basicGeometry = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
    const enhancedGeometry = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    enhancedGeometry.vertices[0].set(41, 35, 25);
    enhancedGeometry.vertices[1].set(40, 34.717895465559025, -25);
    enhancedGeometry.vertices[2].set(40, -25, 25);
    enhancedGeometry.vertices[3].set(40, -25, -25);
    enhancedGeometry.vertices[4].set(-40, 20, -25);
    enhancedGeometry.vertices[5].set(-40, 20, 25);
    enhancedGeometry.vertices[6].set(-40, -25, -25);
    enhancedGeometry.vertices[7].set(-40, -25, 25);
    const material = new THREE.MeshPhongMaterial({
      color: colors.blue,
      flatShading: true,
    });

    const cockpit = new THREE.Mesh(enhancedGeometry, material);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.cockpit = cockpit;
    this.mesh.add(cockpit);
  }

  createEngine(): void {
    const engine = new THREE.Object3D();
    const engineBottomMaterial = new THREE.MeshPhongMaterial({
      color: colors.blue,
      flatShading: true,
    });
    const engineTopMaterial = new THREE.MeshPhongMaterial({
      color: colors.white,
      flatShading: true,
    });

    const engineBottomGeom = new THREE.BoxGeometry(26, 26, 26, 1, 1, 1);
    const engineTopGeom = new THREE.BoxGeometry(26, 12, 26, 1, 1, 1);

    engineTopGeom.vertices[0].set(13, 6, 13);
    engineTopGeom.vertices[1].set(13, 6, -13);
    engineTopGeom.vertices[2].set(13, -2, 13);
    engineTopGeom.vertices[3].set(13, -2, -13);
    engineTopGeom.vertices[4].set(-13, 10, -13);
    engineTopGeom.vertices[5].set(-13, 10, 13);
    engineTopGeom.vertices[6].set(-13, -6, -13);
    engineTopGeom.vertices[7].set(-13, -6, 13);

    engineBottomGeom.vertices[0].set(13, 17, 13);
    engineBottomGeom.vertices[1].set(13, 17, -13);
    engineBottomGeom.vertices[2].set(13, 2, 13);
    engineBottomGeom.vertices[3].set(13, 2, -13);
    engineBottomGeom.vertices[4].set(-13, 13, -13);
    engineBottomGeom.vertices[5].set(-13, 13, 13);
    engineBottomGeom.vertices[6].set(-13, -13, -13);
    engineBottomGeom.vertices[7].set(-13, -13, 13);

    const engineBottom = new THREE.Mesh(engineBottomGeom, engineBottomMaterial);
    const engineTop = new THREE.Mesh(engineTopGeom, engineTopMaterial);

    engineBottom.position.set(131, -20, 0);
    engineTop.position.set(131, -1, 0);

    engine.add(engineBottom);
    engine.add(engineTop);

    engineBottom.castShadow = true;
    engineBottom.receiveShadow = true;
    engineTop.castShadow = true;
    engineTop.receiveShadow = true;

    this.engine = engine;
    this.engineBottom = engineBottom;
    this.engineTop = engineTop;
    this.mesh.add(this.engine);
  }

  createPilot(): void {
    this.pilot = new Pilot();
    this.mesh.add(this.pilot.mesh);
  }

  createPropeller(): void {
    const geometry = new THREE.BoxGeometry(5, 5, 5, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.brown,
      flatShading: true,
    });
    const propeller = new THREE.Mesh(geometry, material);
    propeller.castShadow = true;
    propeller.receiveShadow = true;
    propeller.position.set(142, 0, 0);
    this.propeller = propeller;
    this.propeller.add(this.blade);
    this.mesh.add(this.propeller);
  }

  createTail(): void {
    const geometry = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const tail = new THREE.Mesh(geometry, material);
    tail.position.set(-35, 24, 0);
    tail.castShadow = true;
    tail.receiveShadow = true;
    this.tail = tail;
    this.mesh.add(this.tail);
  }

  createWing(): void {
    const geometry = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const wing = new THREE.Mesh(geometry, material);
    wing.castShadow = true;
    wing.receiveShadow = true;
    this.wing = wing;
    this.mesh.add(this.wing);
  }
}

export default Airplane;
