import * as THREE from "three";
import { Mesh, Object3D } from "three";
import { colors } from "../constants";

class Pilot {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "pilot";
    this.mesh.position.set(0, 45, 0);

    this.angleHairs = 0;

    this.createBody();
    this.createFace();
    this.createHair();
    this.createHairs();
    this.createGoggles();
    this.createEars();
  }

  angleHairs!: number;
  body!: Mesh;
  face!: Mesh;
  hair!: Mesh;
  hairs!: Object3D;
  hairsTop!: Object3D;
  mesh!: Object3D;

  createBody(): void {
    const geometry = new THREE.BoxGeometry(15, 15, 15);
    const material = new THREE.MeshPhongMaterial({
      color: colors.brown,
      flatShading: true,
    });
    const body = new THREE.Mesh(geometry, material);
    body.position.set(2, -12, 0);
    this.body = body;
    this.mesh.add(this.body);
  }

  createEars(): void {
    const geometry = new THREE.BoxGeometry(2, 3, 2);
    const earL = new THREE.Mesh(geometry, this.face.material);
    earL.position.set(0, 0, -6);
    const earR = earL.clone();
    earR.position.set(0, 0, 6);

    this.mesh.add(earL);
    this.mesh.add(earR);
  }

  createFace(): void {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshLambertMaterial({ color: colors.pink });
    const face = new THREE.Mesh(geometry, material);
    this.face = face;
    this.mesh.add(this.face);
  }

  createGoggles(): void {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshLambertMaterial({ color: colors.brown });
    const gogglesR = new THREE.Mesh(geometry, material);
    gogglesR.position.set(6, 0, 3);
    const gogglesL = gogglesR.clone();
    gogglesL.position.setZ(-gogglesR.position.z);

    const strapGeom = new THREE.BoxGeometry(11, 1, 11);
    const strap = new THREE.Mesh(strapGeom, material);

    this.mesh.add(gogglesR);
    this.mesh.add(gogglesL);
    this.mesh.add(strap);
  }

  createHair(): void {
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshLambertMaterial({ color: colors.brown });
    const hair = new THREE.Mesh(geometry, material);
    // * Align shape of hair to it's bottom boundary
    hair.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 2, 0));
    this.hair = hair;
    this.mesh.add(this.hair);
  }

  createHairs(): void {
    // * Hair Container
    const hairs = new THREE.Object3D();
    hairs.position.set(-5, 5, 0);
    this.hairs = hairs;

    this.createTopHairs();
    this.createSideHairs();
    this.createBackHairs();

    this.mesh.add(this.hairs);
  }

  createBackHairs(): void {
    // * Create Hairs at Back of Heade
    const hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
    const hairBack = new THREE.Mesh(hairBackGeom, this.hair.material);
    hairBack.position.set(-1, -4, 0);
    this.hairs.add(hairBack);
  }

  createSideHairs(): void {
    // * Create Hairs at Side of Face
    const hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
    hairSideGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(-6, 0, 0));
    const hairSideR = new THREE.Mesh(hairSideGeom, this.hair.material);
    const hairSideL = hairSideR.clone();
    hairSideR.position.set(8, -2, 6);
    hairSideL.position.set(8, -2, -6);
    this.hairs.add(hairSideR);
    this.hairs.add(hairSideL);
  }

  createTopHairs(): void {
    // * Top Hairs Container
    const hairsTop = new THREE.Object3D();
    this.hairsTop = hairsTop;

    // * Create Top Hairs
    // * Position in 3 x 4 grid
    // TODO - Learn how this grid-ing is working
    for (let i = 0; i < 12; i++) {
      const h = this.hair.clone();
      const col = i % 3;
      const row = Math.floor(i / 3);
      const startPosZ = -4;
      const startPosX = -4;
      h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
      this.hairsTop.add(h);
    }

    this.hairs.add(this.hairsTop);
  }

  updateHairs(): void {
    const hairs = this.hairsTop.children;

    // * Update hairs accoring to angleHairs
    for (let i = 0; i < hairs.length; i++) {
      const hair = hairs[i];
      // * Each hairr element will scale on a cyclical basis between 75% and 100% of it's original size
      hair.scale.y = 0.75 + Math.cos(this.angleHairs + i / 3) * 0.25;
    }

    this.angleHairs += 0.16;
  }
}

export default Pilot;
