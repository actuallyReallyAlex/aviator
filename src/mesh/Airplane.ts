import * as THREE from "three";
import { BoxGeometry, Mesh, Object3D } from "three";

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
  engine!: Mesh;
  engineGeometry!: BoxGeometry;
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
    // this.noseCone.rotation.z = 0.25;
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
    const geometry = new THREE.BoxGeometry(50, 50, 50, 1, 1, 1);
    geometry.vertices[0].set(30, 20, 25);
    geometry.vertices[1].set(30, 20, -25);
    geometry.vertices[2].set(10, -15, 25);
    geometry.vertices[3].set(10, -15, -25);
    geometry.vertices[4].set(-25, 25, -25);
    geometry.vertices[5].set(-25, 25, 25);
    geometry.vertices[6].set(-25, -25, -25);
    geometry.vertices[7].set(-25, -25, 25);
    const material = new THREE.MeshPhongMaterial({
      color: colors.white,
      flatShading: true,
    });
    const engine = new THREE.Mesh(geometry, material);
    engine.position.setX(65);
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.engine = engine;
    this.engineGeometry = geometry;
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
