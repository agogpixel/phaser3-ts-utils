import { Origin as OriginComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for getting and setting the origin of a Game Object. Values are normalized, given in the range
 * 0 to 1. Display values contain the calculated pixel values.
 *
 * Target Game Object class must have one of
 * [Phaser.GameObjects.Components.ComputedSize](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.ComputedSize.html)
 * or [Phaser.GameObjects.Components.Size](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Size.html)
 * defined.
 *
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Origin: PhaserTSUtils.Types.GameObjects.Components.OriginMixin = createMixin<
  Phaser.GameObjects.Components.Origin,
  Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.ComputedSize
>(OriginComponent);
