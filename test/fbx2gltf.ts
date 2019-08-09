/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {assert, expect} from 'chai';
import * as fbx2gltf from 'fbx2gltf';
import {readFileSync} from 'fs';
import {validateBytes} from 'gltf-validator';
import * as md5 from 'md5';
import * as path from 'path';
import * as tmp from 'tmp';

interface Model {
  path: string;
  hash: string;
  size: number;
  ignoredIssues?: Array<string>;
  args?: Array<string>;
}

const MODELS: Array<Model> = [
  {
    path: 'fromFacebook/Jon/jon_morph',
    hash: '925d7be80b8ffd027f87299e8833a469',
    size: 301836
  },
  {
    path: 'fromFacebook/Jon/troll-final',
    ignoredIssues: ['ACCESSOR_NON_UNIT'],
    hash: 'c07ae1f34799ffe8ca3ba473b49c9b75',
    size: 8478440
  },
  {
    path: 'fromFacebook/Natalie/GlitchRobot',
    hash: '6e97e358a0b45843b4d923af33ebf861',
    size: 487788
  },
  {
    path: 'fromFacebook/Ocean/blackvan/blackvan_with_windows',
    hash: '4485f3ef794619744487904c5f8a09fe',
    size: 11884116
  },
  {
    path: 'fromFacebook/Ocean/zell_van_vertex_color',
    args: ['--draco'],
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
    hash: 'd89fd13329d8067f64624f6049c5ba21',
    size: 2094928
  },
  {
    path: 'fromFacebook/RAZ/RAZ_ape',
    args: ['--long-indices=always'],
    hash: '9f0c3b5a92558fe05542cda45cf7b653',
    size: 781020
  },
  {
    path: 'fromFbxSDK/Box',
    hash: '343052c36d1d5d620c22965e45ad16ed',
    size: 2680
  },
  {
    path: 'fromFbxSDK/Humanoid',
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
    hash: 'ad95ea626a0ac832d03cba3fa49a9dca',
    size: 667144
  },
  {
    path: 'fromFbxSDK/Camera',
    ignoredIssues: ['UNSUPPORTED_EXTENSION'],
    hash: 'd41326fafb9861c0016cbfb1bd0523ab',
    size: 4800
  },
  {
    path: 'fromFbxSDK/Normals',
    hash: '1ffeef768ea5292772857aa0ae5bc310',
    size: 188020
  },
  {
    path: 'fromGltfSamples/BoxVertexColors/BoxVertexColors',
    args: ['--khr-materials-unlit'],
    hash: '0ee7fab6238bf63e29d3358f9e9367ee',
    size: 3552
  },
  {
    path: 'fromGltfSamples/WaterBottle/NewWaterBottle',
    hash: 'a096c6adac9dd987fb136ec1327fb1bd',
    size: 4226552
  },
];

const CONVERSION_TIMEOUT_MS = 50000;

describe('FBX2glTF', () => {
  const tmpobj = tmp.dirSync();
  for (let model of MODELS) {
    const modelName = path.basename(model.path);
    describe('Model: ' + modelName, () => {
      const fbxPath = path.join('models', model.path + '.fbx');
      let glbBytes: Buffer;
      it('should convert fbx to glb', async () => {
        const glbPath = path.join(tmpobj.name, modelName + '.glb');

        try {
          const destPath = await fbx2gltf(fbxPath, glbPath, model.args || []);
          assert.isNotNull(destPath);
          glbBytes = readFileSync(destPath);
        } catch (err) {
          throw new Error('Conversion failed: ' + err);
        }
      }).timeout(CONVERSION_TIMEOUT_MS);

      it('resulting glb should be valid', async () => {
        if (!glbBytes) {
          this.skip();
        }

        try {
          let options = <any>{};
          if (model.ignoredIssues) {
            options.ignoredIssues = model.ignoredIssues;
          }
          const report = await validateBytes(glbBytes, options);
          expect(report.issues.numErrors).to.equal(0);
          expect(report.issues.numWarnings).to.equal(0);

        } catch (err) {
          throw new Error('Validation failed: ' + err);
        }
      });
      // these are very primitive consistency checks. a better system would be
      // to extract the JSON and prettydiff it against a known golden JSON; we'd
      // still need to update the authoritative test data when we make
      // substantial changes to FBX2glTF, but that's fine. It'll force us to
      // manually review the asset before updating the JSON. The MD5 check
      // should then be done only on the binary chunk.
      it('resulting glb should have the correct size', async () => {
        expect(glbBytes.length).to.equal(model.size);
      });
      it('resulting glb should have the correct md5 hash', async () => {
        expect(md5(glbBytes)).to.equal(model.hash);
      });
    });
  }
  console.log('GLB files may be inspected in: ' + tmpobj.name);
});
