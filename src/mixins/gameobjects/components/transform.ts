import { Transform as TransformComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for getting and setting the position, scale and rotation of a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Transform: PhaserTSUtils.Types.GameObjects.Components.TransformMixin =
  createMixin<Phaser.GameObjects.Components.Transform>(TransformComponent);
