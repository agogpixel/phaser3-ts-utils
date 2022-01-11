import { ComputedSize as ComputedSizeComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for calculating and setting the size of a non-Frame based Game Object.
 *
 * Target Game Object class must have
 * [Phaser.GameObjects.Components.Transform](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Transform.html)
 * defined.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const ComputedSize: PhaserTSUtils.Types.GameObjects.Components.ComputedSizeMixin = createMixin<
  Phaser.GameObjects.Components.ComputedSize,
  Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform
>(ComputedSizeComponent);
