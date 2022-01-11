import { PathFollower as PathFollowerComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for managing a Game Object following a Path.
 *
 * Target Game Object class must have
 * [Phaser.GameObjects.Components.Transform](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Transform.html)
 * defined.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const PathFollower: PhaserTSUtils.Types.GameObjects.Components.PathFollowerMixin = createMixin<
  Phaser.GameObjects.Components.PathFollower,
  Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform
>(PathFollowerComponent);
