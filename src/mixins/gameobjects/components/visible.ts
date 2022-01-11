import { Visible as VisibleComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for setting the visibility of a Game Object.
 * @param BaseGameObject Game Object class.
 * @template GameObject Game Object type.
 * @template GameObjectType Game Object constructor type.
 * @returns Game Object class with component definition mixed in.
 */
export const Visible: PhaserTSUtils.Types.GameObjects.Components.VisibleMixin =
  createMixin<Phaser.GameObjects.Components.Visible>(VisibleComponent);
