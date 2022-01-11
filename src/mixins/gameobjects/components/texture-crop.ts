import { TextureCrop as TextureCropComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for getting and setting the texture of a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const TextureCrop: PhaserTSUtils.Types.GameObjects.Components.TextureCropMixin =
  createMixin<Phaser.GameObjects.Components.TextureCrop>(TextureCropComponent);
