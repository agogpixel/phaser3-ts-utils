import { GetBounds as GetBoundsComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for obtaining the bounds of a Game Object.
 *
 * Target Game Object class must have
 * [Phaser.GameObjects.Components.Transform](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Transform.html),
 * one of [Phaser.GameObjects.Components.ComputedSize](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.ComputedSize.html)
 * or [Phaser.GameObjects.Components.Size](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Size.html),
 * & [Phaser.GameObjects.Components.Origin](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Origin.html)
 * defined.
 *
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const GetBounds: PhaserTSUtils.Types.GameObjects.Components.GetBoundsMixin = createMixin<
  Phaser.GameObjects.Components.GetBounds,
  Phaser.GameObjects.GameObject &
    Phaser.GameObjects.Components.Transform &
    (Phaser.GameObjects.Components.ComputedSize | Phaser.GameObjects.Components.Size) &
    Phaser.GameObjects.Components.Origin
>(GetBoundsComponent);
