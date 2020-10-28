export interface ApplicationInput {
  folder: any;
  name: string;
  onChange: (value: any) => void;
  paramKey?: keyof GUIParams | string;
  // paramKey?: keyof GUIParams;
  value?: any;
  value2?: any;
}

export interface GUIParams {
  editMode: boolean;
  exportValues: () => void;
  meshToEdit:
    | "blade"
    | "cockpit"
    | "engineBottom"
    | "engineTop"
    | "propeller"
    | "tail"
    | "wing";
  orbitCamera: boolean;
  trackMouseMovement: boolean;
  _0x?: number;
  _0y?: number;
  _0z?: number;
  _1x?: number;
  _1y?: number;
  _1z?: number;
  _2x?: number;
  _2y?: number;
  _2z?: number;
  _3x?: number;
  _3y?: number;
  _3z?: number;
  _4x?: number;
  _4y?: number;
  _4z?: number;
  _5x?: number;
  _5y?: number;
  _5z?: number;
  _6x?: number;
  _6y?: number;
  _6z?: number;
  _7x?: number;
  _7y?: number;
  _7z?: number;
}

export interface Colors {
  red: 0xf25346;
  white: 0xd8d0d1;
  brown: 0x59332e;
  pink: 0xf5986e;
  brownDark: 0x23190f;
  blue: 0x68c3c0;
}

export interface WaveInformation {
  angle: number;
  amplitude: number;
  speed: number;
  x: number;
  y: number;
  z: number;
}
