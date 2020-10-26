import * as THREE from "three";
import { BufferGeometry, Geometry, Material, Mesh } from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import App from "./App";
import Airplane from "./mesh/Airplane";

import { ApplicationInput } from "./types";

class ApplicationGUI {
  constructor(application: App) {
    this.application = application;
    this.handlers = {
      editModeChangeHandler: (editModeValue: boolean): void => {
        if (editModeValue) {
          this.resetGUI();

          this.tearDownScene();
          this.createEditMesh();
          this.updateVertexParams();
          this.createVertexInputs();
        } else {
          this.resetScene();
          this.resetGUI();
        }

        this.initializeGUI();
      },
      meshToEditChangeHandler: (meshToEditValue: string): void => {
        this.application.scene.remove(this.application.editMesh);
        this.createEditMesh();
        this.updateVertexParams();
        this.resetGUI();
        this.createVertexInputs();
        this.initializeGUI();
      },
      trackMouseMovementListener: (event: MouseEvent): void => {
        const tx = -1 + (event.clientX / window.innerWidth) * 2;
        const ty = 1 - (event.clientY / window.innerHeight) * 2;
        this.application.mousePosition = { x: tx, y: ty };
      },
    };
    this.gui = new GUI();
    this.addEditModeInput();
    if (!this.application.params.editMode) {
      this.addTrackMouseMovementInput();
    }
    this.inputs = [];
    this.initializeGUI();
  }

  application: App;
  gui: any;
  handlers: {
    editModeChangeHandler: (editModeValue: boolean) => void;
    meshToEditChangeHandler: (meshToEditValue: string) => void;
    trackMouseMovementListener: (event: MouseEvent) => void;
  };
  inputs: ApplicationInput[];

  addEditModeInput(): void {
    this.gui
      .add(this.application.params, "editMode")
      .name("Edit Mode")
      .onChange(this.handlers.editModeChangeHandler);
  }

  addTrackMouseMovementInput(): void {
    this.gui
      .add(this.application.params, "trackMouseMovement")
      .name("Track Mouse Movement")
      .onChange((trackMouseMovementValue: boolean) => {
        if (trackMouseMovementValue) {
          document.addEventListener(
            "mousemove",
            this.handlers.trackMouseMovementListener,
            false
          );
        } else {
          document.removeEventListener(
            "mousemove",
            this.handlers.trackMouseMovementListener
          );
          this.application.airplane.mesh.position.set(0, 100, 0);
        }
      });
  }

  createEditMesh(): void {
    // * Create edit mesh
    const selectedMesh = this.findSelectedMesh();
    this.application.editMesh = new THREE.Object3D();
    selectedMesh.position.set(0, 0, 0);
    this.application.editMesh.add(selectedMesh);
    // * Need editMeshGeometry to update vertices from params
    this.application.editMeshGeometry = selectedMesh.geometry;
    this.application.scene.add(this.application.editMesh);
  }

  createVertexInputs(): void {
    // TODO - Do the modulo way of this
    // TODO - Ask about this in Slack
    // const xPoints = [0, 3, 6, 9, 12, 15, 18, 21]
    // const _0nums = [0, 1, 2];
    const _1nums = [3, 4, 5];
    const _2nums = [6, 7, 8];
    const _3nums = [9, 10, 11];
    const _4nums = [12, 13, 14];
    const _5nums = [15, 16, 17];
    const _6nums = [18, 19, 20];
    const _7nums = [21, 22, 23];
    const yPoints = [1, 4, 7, 10, 13, 16, 19, 22];
    const zPoints = [2, 5, 8, 11, 14, 17, 20, 23];
    for (let i = 0; i < 24; i++) {
      let num = "0";
      let point = "x";

      //  * num
      if (_1nums.indexOf(i) > -1) {
        num = "1";
      } else if (_2nums.indexOf(i) > -1) {
        num = "2";
      } else if (_3nums.indexOf(i) > -1) {
        num = "3";
      } else if (_4nums.indexOf(i) > -1) {
        num = "4";
      } else if (_5nums.indexOf(i) > -1) {
        num = "5";
      } else if (_6nums.indexOf(i) > -1) {
        num = "6";
      } else if (_7nums.indexOf(i) > -1) {
        num = "7";
      }

      // * point
      if (yPoints.indexOf(i) > -1) {
        point = "y";
      } else if (zPoints.indexOf(i) > -1) {
        point = "z";
      }

      this.inputs.push({
        folder: null,
        name: `_${num}${point}`,
        onChange: (value: number) => {
          this.application.editMeshGeometry.vertices[num][point] = value;
          this.application.editMeshGeometry.verticesNeedUpdate = true;
        },
        paramKey: `_${num}${point}`,
        value: -100,
        value2: 100,
      });
    }
  }

  findSelectedMesh(): Mesh<Geometry | BufferGeometry, Material | Material[]> {
    const selectableMeshes = [
      { name: "blade", mesh: this.application.airplane.blade },
      {
        name: "cockpit",
        mesh: this.application.airplane.cockpit,
      },
      {
        name: "engine",
        mesh: this.application.airplane.engine,
      },
      {
        name: "propeller",
        mesh: this.application.airplane.propeller,
      },
      {
        name: "tail",
        mesh: this.application.airplane.tail,
      },
      {
        name: "wing",
        mesh: this.application.airplane.wing,
      },
    ];
    const selectedMesh = selectableMeshes.find(
      (mesh) => mesh.name === this.application.params.meshToEdit
    );
    if (!selectedMesh) {
      throw new Error("No selected mesh!");
    }
    return selectedMesh.mesh;
  }

  initializeGUI(): void {
    if (this.application.params.editMode) {
      // * Add the meshToEdit parameter
      this.gui
        .add(this.application.params, "meshToEdit", {
          blade: "blade",
          cockpit: "cockpit",
          engine: "engine",
          propeller: "propeller",
          tail: "tail",
          wing: "wing",
        })
        .name("Mesh To Edit")
        .onChange(this.handlers.meshToEditChangeHandler);
      this.gui
        .add(this.application.params, "exportValues")
        .name("Export Values");
    }
    this.inputs.forEach((input) => {
      const inputElement = this.gui.add(
        this.application.params,
        input.paramKey,
        input.value,
        input.value2
      );
      inputElement.name(input.name);
      inputElement.onChange(input.onChange);
    });
  }

  resetGUI(): void {
    this.gui.destroy();
    this.gui = new GUI();
    this.addEditModeInput();
    if (!this.application.params.editMode) {
      this.addTrackMouseMovementInput();
    }
    this.inputs = [];
  }

  resetScene(): void {
    this.application.scene.remove(this.application.editMesh);
    // ? Should you do this?
    // ? this.application.editMesh = null;
    this.application.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    this.application.airplane = new Airplane();
    this.application.scene.add(this.application.airplane.mesh);
    this.application.scene.add(this.application.sea.mesh);
    this.application.scene.add(this.application.sky.mesh);
  }

  tearDownScene(): void {
    this.application.scene.fog = null;
    this.application.scene.remove(this.application.airplane.mesh);
    this.application.scene.remove(this.application.sea.mesh);
    this.application.scene.remove(this.application.sky.mesh);
  }

  updateVertexParams(): void {
    this.application.params._0x = this.application.editMeshGeometry.vertices[0].x;
    this.application.params._0y = this.application.editMeshGeometry.vertices[0].y;
    this.application.params._0z = this.application.editMeshGeometry.vertices[0].z;
    this.application.params._1x = this.application.editMeshGeometry.vertices[1].x;
    this.application.params._1y = this.application.editMeshGeometry.vertices[1].y;
    this.application.params._1z = this.application.editMeshGeometry.vertices[1].z;
    this.application.params._2x = this.application.editMeshGeometry.vertices[2].x;
    this.application.params._2y = this.application.editMeshGeometry.vertices[2].y;
    this.application.params._2z = this.application.editMeshGeometry.vertices[2].z;
    this.application.params._3x = this.application.editMeshGeometry.vertices[3].x;
    this.application.params._3y = this.application.editMeshGeometry.vertices[3].y;
    this.application.params._3z = this.application.editMeshGeometry.vertices[3].z;
    this.application.params._4x = this.application.editMeshGeometry.vertices[4].x;
    this.application.params._4y = this.application.editMeshGeometry.vertices[4].y;
    this.application.params._4z = this.application.editMeshGeometry.vertices[4].z;
    this.application.params._5x = this.application.editMeshGeometry.vertices[5].x;
    this.application.params._5y = this.application.editMeshGeometry.vertices[5].y;
    this.application.params._5z = this.application.editMeshGeometry.vertices[5].z;
    this.application.params._6x = this.application.editMeshGeometry.vertices[6].x;
    this.application.params._6y = this.application.editMeshGeometry.vertices[6].y;
    this.application.params._6z = this.application.editMeshGeometry.vertices[6].z;
    this.application.params._7x = this.application.editMeshGeometry.vertices[7].x;
    this.application.params._7y = this.application.editMeshGeometry.vertices[7].y;
    this.application.params._7z = this.application.editMeshGeometry.vertices[7].z;
  }
}

export default ApplicationGUI;
