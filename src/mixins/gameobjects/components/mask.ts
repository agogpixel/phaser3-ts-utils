import { Mask as MaskComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for getting and setting the mask of a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Mask: PhaserTSUtils.Types.GameObjects.Components.MaskMixin =
  createMixin<Phaser.GameObjects.Components.Mask>(MaskComponent);
