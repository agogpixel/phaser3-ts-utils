import { mixin } from 'phaser/src/utils/Class';

/**
 * Create Game Object class component mixin.
 *
 * @param component Game Object component definition.
 * @template GameObjectComponent Game Object component type.
 * @template GameObjectConstraint Game Object type constraint. Ensures resulting mixin only accepts Game Object classes
 * that provide properties that a given Game Object component is dependent on.
 * @returns Game Object class component mixin.
 * @internal
 */
export function createMixin<
  GameObjectComponent,
  GameObjectConstraint extends Phaser.GameObjects.GameObject = Phaser.GameObjects.GameObject
>(
  component: GameObjectComponent
): PhaserTSUtils.Types.GameObjects.Components.Mixin<GameObjectComponent, GameObjectConstraint> {
  return (BaseGameObject) => {
    mixin(BaseGameObject, [component]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return BaseGameObject as any;
  };
}
