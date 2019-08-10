
export interface ModelTestDefinition {
  path: string;
  args?: Array<string>;
  ignoredIssues?: Array<string>;
}

export interface ModelTest extends ModelTestDefinition {
  hash: string;
  size: number;
}

export const MODEL_TESTS: Record<string, ModelTestDefinition> = {
  jon_morph: {
    path: 'fromFacebook/Jon/jon_morph',
  },
  troll_final: {
    path: 'fromFacebook/Jon/troll-final',
    ignoredIssues: ['ACCESSOR_NON_UNIT'],
  },
  glitch_robot: {
    path: 'fromFacebook/Natalie/GlitchRobot',
  },
  blackvan: {
    path: 'fromFacebook/Ocean/blackvan/blackvan_with_windows',
  },
  verex_color_van: {
    path: 'fromFacebook/Ocean/zell_van_vertex_color',
  },
  verex_color_van_draco: {
    path: 'fromFacebook/Ocean/zell_van_vertex_color',
    args: ['--draco'],
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
  },
  raz_ape_long_indices: {
    path: 'fromFacebook/RAZ/RAZ_ape',
    args: ['--long-indices=always'],
  },
  sdk_box: {
    path: 'fromFbxSDK/Box',
  },
  humanoid: {
    path: 'fromFbxSDK/Humanoid',
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
  },
  camera: {
    path: 'fromFbxSDK/Camera',
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
  },
  normals: {
    path: 'fromFbxSDK/Normals',
  },
  vertex_color_box_unlit: {
    path: 'fromGltfSamples/BoxVertexColors/BoxVertexColors',
    args: ['--khr-materials-unlit'],
  },
  water_bottle: {
    path: 'fromGltfSamples/WaterBottle/NewWaterBottle',
  },
};
