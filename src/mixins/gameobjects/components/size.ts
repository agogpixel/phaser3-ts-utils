import { Size as SizeComponent } from 'phaser/src/gameobjects/components';

import { createMixin } from './create-mixin';

/**
 * Provides methods used for getting and setting the size of a Game Object.
 *
 * Target Game Object class must have
 * [Phaser.GameObjects.Components.Transform](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Transform.html)
 * and one of [Phaser.GameObjects.Components.Crop](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Crop.html),
 * [Phaser.GameObjects.Components.Texture](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Texture.html),
 * or [Phaser.GameObjects.Components.TextureCrop](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.TextureCrop.html)
 * defined.
 *
 * @param BaseGameObject Game Object class.
 * @returns Game Object class with component definition mixed in.
 */
export const Size: PhaserTSUtils.Types.GameObjects.Components.SizeMixin = createMixin<
  Phaser.GameObjects.Components.Size,
  Phaser.GameObjects.GameObject &
    Phaser.GameObjects.Components.Transform & {
      /**
       * The Texture this Game Object is using to render with.
       */
      texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
      /**
       * The Texture Frame this Game Object is using to render with.
       */
      frame: Phaser.Textures.Frame;
    }
>(SizeComponent);
