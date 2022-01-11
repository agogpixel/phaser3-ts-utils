import { Flip as FlipComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for visually flipping a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Flip: PhaserTSUtils.Types.GameObjects.Components.FlipMixin =
  createMixin<Phaser.GameObjects.Components.Flip>(FlipComponent);
