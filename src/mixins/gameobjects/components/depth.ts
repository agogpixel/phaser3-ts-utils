import { Depth as DepthComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for setting the depth of a Game Object.
 *
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Depth: PhaserTSUtils.Types.GameObjects.Components.DepthMixin =
  createMixin<Phaser.GameObjects.Components.Depth>(DepthComponent);
