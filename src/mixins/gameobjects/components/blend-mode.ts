import { BlendMode as BlendModeComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for setting the blend mode of a Game Object.
 *
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const BlendMode: PhaserTSUtils.Types.GameObjects.Components.BlendModeMixin =
  createMixin<Phaser.GameObjects.Components.BlendMode>(BlendModeComponent);
