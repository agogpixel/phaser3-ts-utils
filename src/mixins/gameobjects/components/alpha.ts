import { Alpha as AlphaComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for setting the alpha properties of a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Alpha: PhaserTSUtils.Types.GameObjects.Components.AlphaMixin =
  createMixin<Phaser.GameObjects.Components.Alpha>(AlphaComponent);
