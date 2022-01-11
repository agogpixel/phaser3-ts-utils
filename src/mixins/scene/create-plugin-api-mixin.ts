/**
 * Creates a class mixin that exposes an
 * [injected plugin](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/pluginsystem/)'s API on a
 * [Phaser.Scene](https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html) based class.
 * @template Plugin Plugin for which we are exposing an API.
 * @template PluginPublicProperty String literal or union of string literals mapping plugin properties to the plugin's
 * scene mapping.
 * @template GameObjectFactory (Optional) Maps a given game object key to the corresponding game object factory function type.
 * @template GameObjectCreator (Optional) Maps a given game object key to the corresponding game object creator function type.
 * @template Loader (Optional) Maps a given file type key to the corresponding file type callback function type.
 * @returns Class mixin that accepts a mapping for the plugin as well as a scene class.
 */
export const createPluginApiMixin: PhaserTSUtils.Types.Scenes.PluginApiMixinFactory =
  () => (mapping: string, BaseScene) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BaseScene as any;
