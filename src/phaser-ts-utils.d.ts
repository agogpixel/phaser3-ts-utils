/**
 * Phaser 3 TypeScript utitlities.
 */
declare namespace PhaserTSUtils {
  /**
   * Mixins for various Phaser classes.
   */
  namespace Mixins {
    /**
     * Mixins & mixin factories for Phaser Game Objects.
     */
    namespace GameObjects {
      /**
       * Mixins & mixin factories for Phaser Game Object components.
       */
      namespace Components {
        /**
         * Provides methods used for setting the alpha properties of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Alpha: PhaserTSUtils.Types.GameObjects.Components.AlphaMixin;

        /**
         * Provides methods used for setting the alpha properties of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const AlphaSingle: PhaserTSUtils.Types.GameObjects.Components.AlphaSingleMixin;

        /**
         * Provides methods used for setting the blend mode of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const BlendMode: PhaserTSUtils.Types.GameObjects.Components.BlendModeMixin;

        /**
         * Provides methods used for calculating and setting the size of a non-Frame based Game Object.
         *
         * Target Game Object class must have
         * [Phaser.GameObjects.Components.Transform](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Transform.html)
         * defined.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const ComputedSize: PhaserTSUtils.Types.GameObjects.Components.ComputedSizeMixin;

        /**
         * Provides methods used for getting and setting the texture of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Crop: PhaserTSUtils.Types.GameObjects.Components.CropMixin;

        /**
         * Provides methods used for setting the depth of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Depth: PhaserTSUtils.Types.GameObjects.Components.DepthMixin;

        /**
         * Provides methods used for visually flipping a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Flip: PhaserTSUtils.Types.GameObjects.Components.FlipMixin;

        /**
         * Provides methods used for setting the FX values of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const FX: PhaserTSUtils.Types.GameObjects.Components.FXMixin;

        /**
         * Provides methods used for obtaining the bounds of a Game Object.
         *
         * Target Game Object class must have
         * [Phaser.GameObjects.Components.Transform](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Transform.html),
         * one of [Phaser.GameObjects.Components.ComputedSize](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.ComputedSize.html)
         * or [Phaser.GameObjects.Components.Size](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Size.html),
         * & [Phaser.GameObjects.Components.Origin](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Origin.html)
         * defined.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const GetBounds: PhaserTSUtils.Types.GameObjects.Components.GetBoundsMixin;

        /**
         * Provides methods used for getting and setting the mask of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Mask: PhaserTSUtils.Types.GameObjects.Components.MaskMixin;

        /**
         * Provides methods used for getting and setting the origin of a Game Object. Values are normalized, given in the range
         * 0 to 1. Display values contain the calculated pixel values.
         *
         * Target Game Object class must have one of
         * [Phaser.GameObjects.Components.ComputedSize](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.ComputedSize.html)
         * or [Phaser.GameObjects.Components.Size](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Size.html)
         * defined.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Origin: PhaserTSUtils.Types.GameObjects.Components.OriginMixin;

        /**
         * Provides methods used for managing a Game Object following a Path.
         *
         * Target Game Object class must have
         * [Phaser.GameObjects.Components.Transform](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Transform.html)
         * defined.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const PathFollower: PhaserTSUtils.Types.GameObjects.Components.PathFollowerMixin;

        /**
         * Provides methods used for setting the WebGL rendering pipeline of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Pipeline: PhaserTSUtils.Types.GameObjects.Components.PipelineMixin;

        /**
         * Provides methods used for getting and setting the Scroll Factor of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const ScrollFactor: PhaserTSUtils.Types.GameObjects.Components.ScrollFactorMixin;

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
        const Size: PhaserTSUtils.Types.GameObjects.Components.SizeMixin;

        /**
         * Provides methods used for getting and setting the texture of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const TextureCrop: PhaserTSUtils.Types.GameObjects.Components.TextureCropMixin;

        /**
         * Provides methods used for getting and setting the texture of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Texture: PhaserTSUtils.Types.GameObjects.Components.TextureMixin;

        /**
         * Provides methods used for setting the tint of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Tint: PhaserTSUtils.Types.GameObjects.Components.TintMixin;

        /**
         * Provides methods used for getting and setting the position, scale and rotation of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Transform: PhaserTSUtils.Types.GameObjects.Components.TransformMixin;

        /**
         * Provides methods used for setting the visibility of a Game Object.
         *
         * @param BaseGameObject Game Object class.
         * @returns Game Object class with component definition mixed in.
         */
        const Visible: PhaserTSUtils.Types.GameObjects.Components.VisibleMixin;
      }
    }

    /**
     * Mixins & mixin factories for Phaser Scenes.
     */
    namespace Scenes {
      /**
       * Creates a class mixin that exposes an
       * [injected plugin](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/pluginsystem/)'s API on a
       * [Phaser.Scene](https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html) based class.
       *
       * @template Plugin Plugin for which we are exposing an API.
       * @template PluginPublicProperty String literal or union of string literals mapping plugin properties to the plugin's
       * scene mapping.
       * @template GameObjectFactory (Optional) Maps a given game object key to the corresponding game object factory function type.
       * @template GameObjectCreator (Optional) Maps a given game object key to the corresponding game object creator function type.
       * @template Loader (Optional) Maps a given file type key to the corresponding file type callback function type.
       * @returns Class mixin that accepts a mapping for the plugin as well as a scene class.
       */
      const createPluginApiMixin: PhaserTSUtils.Types.Scenes.PluginApiMixinFactory;
    }
  }

  /**
   * Various types & interfaces to aid development.
   */
  namespace Types {
    /**
     * Infer a constructor type.
     *
     * @template T Type to be constructed.
     * @template P (Optional) Constructor parameters.
     */
    interface Type<
      T,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      P extends any[] = any[]
    > extends Function {
      new (...args: P): T;
    }

    /**
     * Infer a constructor type.
     */
    const Type: typeof Function;

    /**
     * Game Object types.
     */
    namespace GameObjects {
      /**
       * Game Object instance provider type.
       *
       * @param args Game Object creator or factory params (unspecified type).
       * @template G (Optional) Extended
       * [Phaser.GameObjects.GameObject](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html) type.
       * @returns Game Object instance.
       */
      type InstanceProvider<G extends Phaser.GameObjects.GameObject = Phaser.GameObjects.GameObject> = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...args: any[]
      ) => G;

      /**
       * Maps Game Object key to instance provider type.
       *
       * @template G (Optional) Extended
       * [Phaser.GameObjects.GameObject](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html) type.
       */
      type InstanceProviderRecord<G extends Phaser.GameObjects.GameObject = Phaser.GameObjects.GameObject> = Record<
        string,
        InstanceProvider<G>
      >;

      /**
       * Game Object Component types.
       */
      namespace Components {
        /**
         * [Game Object Component](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.html) mixin type.
         *
         * @param BaseGameObject Game Object constructor.
         * @template GameObjectComponent Game Object component type.
         * @template GameObjectConstraint Game Object type constraint. Ensures mixin only accepts Game Object classes that
         * provide properties that a given Game Object component is dependent on.
         * @returns Game Object class with component mixed in.
         */
        type Mixin<GameObjectComponent, GameObjectConstraint extends Phaser.GameObjects.GameObject> = <
          GameObjectType extends Type<GameObjectConstraint>
        >(
          BaseGameObject: GameObjectType
        ) => GameObjectType & Type<GameObjectComponent>;

        /**
         * Game Object alpha component mixin type.
         */
        type AlphaMixin = Mixin<Phaser.GameObjects.Components.Alpha, Phaser.GameObjects.GameObject>;

        /**
         * Game Object alpha single component mixin type.
         */
        type AlphaSingleMixin = Mixin<Phaser.GameObjects.Components.AlphaSingle, Phaser.GameObjects.GameObject>;

        /**
         * Game Object blend mode component mixin type.
         */
        type BlendModeMixin = Mixin<Phaser.GameObjects.Components.BlendMode, Phaser.GameObjects.GameObject>;

        /**
         * Game Object computed size component mixin type.
         */
        type ComputedSizeMixin = Mixin<
          Phaser.GameObjects.Components.ComputedSize,
          Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform
        >;

        /**
         * Game Object crop component mixin type.
         */
        type CropMixin = Mixin<Phaser.GameObjects.Components.Crop, Phaser.GameObjects.GameObject>;

        /**
         * Game Object depth component mixin type.
         */
        type DepthMixin = Mixin<Phaser.GameObjects.Components.Depth, Phaser.GameObjects.GameObject>;

        /**
         * Game Object flip component mixin type.
         */
        type FlipMixin = Mixin<Phaser.GameObjects.Components.Flip, Phaser.GameObjects.GameObject>;

        /**
         * Game Object FX component mixin type.
         */
        type FXMixin = Mixin<Phaser.GameObjects.Components.FX, Phaser.GameObjects.GameObject>;

        /**
         * Game Object get bounds component mixin type.
         */
        type GetBoundsMixin = Mixin<
          Phaser.GameObjects.Components.GetBounds,
          Phaser.GameObjects.GameObject &
            Phaser.GameObjects.Components.Transform &
            (Phaser.GameObjects.Components.ComputedSize | Phaser.GameObjects.Components.Size) &
            Phaser.GameObjects.Components.Origin
        >;

        /**
         * Game Object mask component mixin type.
         */
        type MaskMixin = Mixin<Phaser.GameObjects.Components.Mask, Phaser.GameObjects.GameObject>;

        /**
         * Game Object origin component mixin type.
         */
        type OriginMixin = Mixin<
          Phaser.GameObjects.Components.Origin,
          Phaser.GameObjects.GameObject &
            (Phaser.GameObjects.Components.ComputedSize | Phaser.GameObjects.Components.Size)
        >;

        /**
         * Game Object path follower component mixin type.
         */
        type PathFollowerMixin = Mixin<
          Phaser.GameObjects.Components.PathFollower,
          Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform
        >;

        /**
         * Game Object pipeline component mixin type.
         */
        type PipelineMixin = Mixin<Phaser.GameObjects.Components.Pipeline, Phaser.GameObjects.GameObject>;

        /**
         * Game Object scroll factor component mixin type.
         */
        type ScrollFactorMixin = Mixin<Phaser.GameObjects.Components.ScrollFactor, Phaser.GameObjects.GameObject>;

        /**
         * Game Object size component mixin type.
         */
        type SizeMixin = Mixin<
          Phaser.GameObjects.Components.Size,
          Phaser.GameObjects.GameObject &
            Phaser.GameObjects.Components.Transform &
            (
              | Phaser.GameObjects.Components.Crop
              | Phaser.GameObjects.Components.Texture
              | Phaser.GameObjects.Components.TextureCrop
            )
        >;

        /**
         * Game Object texture crop component mixin type.
         */
        type TextureCropMixin = Mixin<Phaser.GameObjects.Components.TextureCrop, Phaser.GameObjects.GameObject>;

        /**
         * Game Object texture component mixin type.
         */
        type TextureMixin = Mixin<Phaser.GameObjects.Components.Texture, Phaser.GameObjects.GameObject>;

        /**
         * Game Object tint component mixin type.
         */
        type TintMixin = Mixin<Phaser.GameObjects.Components.Tint, Phaser.GameObjects.GameObject>;

        /**
         * Game Object transform component mixin type.
         */
        type TransformMixin = Mixin<Phaser.GameObjects.Components.Transform, Phaser.GameObjects.GameObject>;

        /**
         * Game Object visible component mixin type.
         */
        type VisibleMixin = Mixin<Phaser.GameObjects.Components.Visible, Phaser.GameObjects.GameObject>;
      }
    }

    /**
     * Loader types.
     */
    namespace Loader {
      /**
       * Loader file type types.
       */
      namespace FileTypes {
        /**
         * Maps loader file type key to callback function type.
         *
         * @see https://photonstorm.github.io/phaser3-docs/Phaser.Plugins.PluginManager.html#registerFileType__anchor
         */
        type CallbackRecord = Record<
          string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (...args: any[]) => Phaser.Loader.LoaderPlugin
        >;
      }
    }

    /**
     * Scene types.
     */
    namespace Scenes {
      /**
       * Plugin API mixin factory type.
       *
       * @template Plugin Plugin for which we are exposing an API.
       * @template PluginPublicProperty String literal or union of string literals mapping plugin properties to the plugin's
       * scene mapping.
       * @template GameObjectFactory (Optional) Maps a given game object key to the corresponding game object factory function type.
       * @template GameObjectCreator (Optional) Maps a given game object key to the corresponding game object creator function type.
       * @template Loader (Optional) Maps a given file type key to the corresponding file type callback function type.
       */
      type PluginApiMixinFactory = <
        Plugin extends Phaser.Plugins.BasePlugin,
        PluginPublicProperty extends keyof Plugin,
        GameObjectFactory extends PhaserTSUtils.Types.GameObjects.InstanceProviderRecord = PhaserTSUtils.Types.GameObjects.InstanceProviderRecord,
        GameObjectCreator extends PhaserTSUtils.Types.GameObjects.InstanceProviderRecord = PhaserTSUtils.Types.GameObjects.InstanceProviderRecord,
        Loader extends PhaserTSUtils.Types.Loader.FileTypes.CallbackRecord = PhaserTSUtils.Types.Loader.FileTypes.CallbackRecord
      >() => PluginApiMixin<Plugin, PluginPublicProperty, GameObjectFactory, GameObjectCreator, Loader>;

      /**
       * Plugin API mixin type.
       *
       * @param mapping Plugin's scene mapping.
       * @param BaseScene Phaser scene constructor.
       * @template Plugin Plugin type for which we are exposing an API.
       * @template PluginPublicProperty String literal or union of string literals mapping plugin properties to the plugin's
       * scene mapping.
       * @template GameObjectFactory (Optional) Maps a given game object key to the corresponding game object factory function
       * type.
       * @template GameObjectCreator (Optional) Maps a given game object key to the corresponding game object creator function
       * type.
       * @template Loader (Optional) Maps a given file type key to the corresponding file type callback function type.
       * @returns Scene constructor with API support for plugin
       */
      type PluginApiMixin<
        Plugin extends Phaser.Plugins.BasePlugin,
        PluginPublicProperty extends keyof Plugin,
        GameObjectFactory extends PhaserTSUtils.Types.GameObjects.InstanceProviderRecord,
        GameObjectCreator extends PhaserTSUtils.Types.GameObjects.InstanceProviderRecord,
        Loader extends PhaserTSUtils.Types.Loader.FileTypes.CallbackRecord
      > = <Mapping extends string, Scene extends Phaser.Scene, SceneType extends Type<Scene> = Type<Scene>>(
        mapping: Mapping,
        BaseScene: SceneType
      ) => SceneType &
        Type<{ [M in Mapping]: Pick<Plugin, PluginPublicProperty> }> &
        Type<{
          sys: Plugin extends Phaser.Plugins.ScenePlugin
            ? Pick<Scene, 'sys'> & { [M in Mapping]: Plugin }
            : Pick<Scene, 'sys'>;
        }> &
        Type<{ add: Pick<Scene, 'add'> & GameObjectFactory }> &
        Type<{ make: Pick<Scene, 'make'> & GameObjectCreator }> &
        Type<{ load: Pick<Scene, 'load'> & Loader }>;
    }
  }
}
