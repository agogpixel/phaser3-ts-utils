import { FX as FXComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for setting the FX values of a Game Object.
 *
 * Requires Phaser v3.60.0 or later.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const FX /*: PhaserTSUtils.Types.GameObjects.Components.FXMixin*/ =
  createMixin<Phaser.GameObjects.Components.FX>(FXComponent);
