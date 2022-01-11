import { AlphaSingle as AlphaSingleComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for setting the alpha property of a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const AlphaSingle: PhaserTSUtils.Types.GameObjects.Components.AlphaSingleMixin =
  createMixin<Phaser.GameObjects.Components.AlphaSingle>(AlphaSingleComponent);
