import {ModelTest} from './test_defs';

// this will shortly be generated on demand
export const MODEL_TESTS: Record<string, ModelTest> = {
  jon_morph: {
    path: 'fromFacebook/Jon/jon_morph',
    hash: '925d7be80b8ffd027f87299e8833a469',
    size: 301836
  },
  troll_final: {
    path: 'fromFacebook/Jon/troll-final',
    ignoredIssues: ['ACCESSOR_NON_UNIT'],
    hash: 'c07ae1f34799ffe8ca3ba473b49c9b75',
    size: 8478440
  },
  glitch_robot: {
    path: 'fromFacebook/Natalie/GlitchRobot',
    hash: '6e97e358a0b45843b4d923af33ebf861',
    size: 487788
  },
  blackvan: {
    path: 'fromFacebook/Ocean/blackvan/blackvan_with_windows',
    hash: '4485f3ef794619744487904c5f8a09fe',
    size: 11884116
  },
  verex_color_van: {
    path: 'fromFacebook/Ocean/zell_van_vertex_color',
    hash: 'd89fd13329d8067f64624f6049c5ba21',
    size: 2094928
  },
  verex_color_van_draco: {
    path: 'fromFacebook/Ocean/zell_van_vertex_color',
    args: ['--draco'],
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
    hash: 'd89fd13329d8067f64624f6049c5ba21',
    size: 2094928
  },
  raz_ape_long_indices: {
    path: 'fromFacebook/RAZ/RAZ_ape',
    args: ['--long-indices=always'],
    hash: '9f0c3b5a92558fe05542cda45cf7b653',
    size: 781020
  },
  sdk_box: {
    path: 'fromFbxSDK/Box',
    hash: '343052c36d1d5d620c22965e45ad16ed',
    size: 2680
  },
  humanoid: {
    path: 'fromFbxSDK/Humanoid',
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
    hash: 'ad95ea626a0ac832d03cba3fa49a9dca',
    size: 667144
  },
  camera: {
    path: 'fromFbxSDK/Camera',
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
    hash: 'd41326fafb9861c0016cbfb1bd0523ab',
    size: 4800
  },
  normals: {
    path: 'fromFbxSDK/Normals',
    hash: '1ffeef768ea5292772857aa0ae5bc310',
    size: 188020
  },
  vertex_color_box_unlit: {
    path: 'fromGltfSamples/BoxVertexColors/BoxVertexColors',
    args: ['--khr-materials-unlit'],
    hash: '0ee7fab6238bf63e29d3358f9e9367ee',
    size: 3552
  },
  water_bottle: {
    path: 'fromGltfSamples/WaterBottle/NewWaterBottle',
    hash: 'a096c6adac9dd987fb136ec1327fb1bd',
    size: 4226552
  },
};
