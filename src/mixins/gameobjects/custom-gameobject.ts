import * as Mixins from './components';

/**
 * Custom Game Object factory.
 * @param check Check if component dependencies are included in mixins.
 * @param mixins Game Object component mixins.
 * @returns Custom Game Object class with component definitions mixed in.
 */
export const CustomGameObject: PhaserTSUtils.Types.GameObjects.CustomGameObjectFactory = (
  check: boolean,
  ...mixins
) => {
  class BaseGameObject extends Phaser.GameObjects.GameObject {}

  let target = BaseGameObject;

  mixins.forEach((mixin: PhaserTSUtils.Types.GameObjects.Components.Mixin<unknown, Phaser.GameObjects.GameObject>) => {
    if (check) {
      if (mixin === Mixins.ComputedSize) {
        if (!mixins.includes(Mixins.Transform)) {
          throw new Error('CustomGameObject: ComputedSize requires Transform');
        }
      } else if (mixin === Mixins.GetBounds) {
        if (![Mixins.ComputedSize, Mixins.Size].some((m) => mixins.includes(m))) {
          throw new Error('CustomGameObject: GetBounds requires one of ComputedSize or Size');
        }

        if (![Mixins.Transform, Mixins.Origin].every((m) => mixins.includes(m))) {
          throw new Error('CustomGameObject: GetBounds requires Origin and Transform');
        }
      } else if (mixin === Mixins.Origin) {
        if (![Mixins.ComputedSize, Mixins.Size].some((m) => mixins.includes(m))) {
          throw new Error('CustomGameObject: Origin requires one of ComputedSize or Size');
        }
      } else if (mixin === Mixins.PathFollower) {
        if (!mixins.includes(Mixins.Transform)) {
          throw new Error('CustomGameObject: PathFollower requires Transform');
        }
      } else if (mixin === Mixins.Size) {
        if (!mixins.includes(Mixins.Transform)) {
          throw new Error('CustomGameObject: Size requires Transform');
        }

        if (![Mixins.Crop, Mixins.Texture, Mixins.TextureCrop].some((m) => mixins.includes(m))) {
          throw new Error('CustomGameObject: Size requires one of Crop, Texture, or TextureCrop');
        }
      }
    }

    target = mixin(target);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return target as any;
};
