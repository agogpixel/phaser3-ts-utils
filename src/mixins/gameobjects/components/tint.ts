import { Tint as TintComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for setting the tint of a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Tint: PhaserTSUtils.Types.GameObjects.Components.TintMixin =
  createMixin<Phaser.GameObjects.Components.Tint>(TintComponent);
