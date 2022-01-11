import { Pipeline as PipelineComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for setting the WebGL rendering pipeline of a Game Object.
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Pipeline: PhaserTSUtils.Types.GameObjects.Components.PipelineMixin =
  createMixin<Phaser.GameObjects.Components.Pipeline>(PipelineComponent);
