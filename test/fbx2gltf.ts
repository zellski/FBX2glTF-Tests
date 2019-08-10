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

import {MODEL_TESTS} from './generated_test_data';

const CONVERSION_TIMEOUT_MS = 50000;

describe('FBX2glTF', () => {
  const tmpobj = tmp.dirSync();
  Object.keys(MODEL_TESTS).forEach(modelId => {
    const model = MODEL_TESTS[modelId];
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
      // to extract the JSON and prettydiff it against a known golden JSON;
      // we'd still need to update the authoritative test data when we make
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
  });
  console.log('GLB files may be inspected in: ' + tmpobj.name);
});
