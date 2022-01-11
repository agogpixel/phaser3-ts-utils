import { ScrollFactor as ScrollFactorComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for getting and setting the Scroll Factor of a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const ScrollFactor: PhaserTSUtils.Types.GameObjects.Components.ScrollFactorMixin =
  createMixin<Phaser.GameObjects.Components.ScrollFactor>(ScrollFactorComponent);
