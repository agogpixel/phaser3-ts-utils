import { createPluginApiMixin } from './create-plugin-api-mixin';

class GlobalPluginA extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    pluginManager.registerGameObject(
      'globalA1',
      () => undefined,
      () => undefined
    );

    pluginManager.registerGameObject(
      'globalA2',
      () => undefined,
      () => undefined
    );

    pluginManager.registerFileType('globalA1', () => undefined);
    pluginManager.registerFileType('globalA2', () => undefined);
  }
}

class GlobalPluginB extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    pluginManager.registerGameObject(
      'globalB1',
      () => undefined,
      () => undefined
    );

    pluginManager.registerGameObject(
      'globalB2',
      () => undefined,
      () => undefined
    );

    pluginManager.registerFileType('globalB1', () => undefined);
    pluginManager.registerFileType('globalB2', () => undefined);
  }
}

class ScenePluginA extends Phaser.Plugins.ScenePlugin {
  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager, pluginKey: string) {
    super(scene, pluginManager, pluginKey);

    pluginManager.registerGameObject(
      'sceneA1',
      () => undefined,
      () => undefined
    );

    pluginManager.registerGameObject(
      'sceneA2',
      () => undefined,
      () => undefined
    );

    pluginManager.registerFileType('sceneA1', () => undefined, scene);
    pluginManager.registerFileType('sceneA2', () => undefined, scene);
  }
}

class ScenePluginB extends Phaser.Plugins.ScenePlugin {
  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager, pluginKey: string) {
    super(scene, pluginManager, pluginKey);

    pluginManager.registerGameObject(
      'sceneB1',
      () => undefined,
      () => undefined
    );

    pluginManager.registerGameObject(
      'sceneB2',
      () => undefined,
      () => undefined
    );

    pluginManager.registerFileType('sceneB1', () => undefined, scene);
    pluginManager.registerFileType('sceneB2', () => undefined, scene);
  }
}

describe('Plugin API Scene Mixin Factory', () => {
  // Squelch console.log output.
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Running game calls window.focus method.
  jest.spyOn(window, 'focus').mockImplementation(() => undefined);

  const GlobalPluginAMixin = createPluginApiMixin<
    GlobalPluginA,
    'start' | 'stop',
    { globalA1: () => Phaser.GameObjects.GameObject; globalA2: () => Phaser.GameObjects.GameObject },
    { globalA1: () => Phaser.GameObjects.GameObject; globalA2: () => Phaser.GameObjects.GameObject },
    { globalA1: () => Phaser.Loader.LoaderPlugin; globalA2: () => Phaser.Loader.LoaderPlugin }
  >();

  const GlobalPluginBMixin = createPluginApiMixin<
    GlobalPluginB,
    'start' | 'stop',
    { globalB1: () => Phaser.GameObjects.GameObject; globalB2: () => Phaser.GameObjects.GameObject },
    { globalB1: () => Phaser.GameObjects.GameObject; globalB2: () => Phaser.GameObjects.GameObject },
    { globalB1: () => Phaser.Loader.LoaderPlugin; globalB2: () => Phaser.Loader.LoaderPlugin }
  >();

  const ScenePluginAMixin = createPluginApiMixin<
    ScenePluginA,
    'start' | 'stop',
    { sceneA1: () => Phaser.GameObjects.GameObject; sceneA2: () => Phaser.GameObjects.GameObject },
    { sceneA1: () => Phaser.GameObjects.GameObject; sceneA2: () => Phaser.GameObjects.GameObject },
    { sceneA1: () => Phaser.Loader.LoaderPlugin; sceneA2: () => Phaser.Loader.LoaderPlugin }
  >();

  const ScenePluginBMixin = createPluginApiMixin<
    ScenePluginB,
    'start' | 'stop',
    { sceneB1: () => Phaser.GameObjects.GameObject; sceneB2: () => Phaser.GameObjects.GameObject },
    { sceneB1: () => Phaser.GameObjects.GameObject; sceneB2: () => Phaser.GameObjects.GameObject },
    { sceneB1: () => Phaser.Loader.LoaderPlugin; sceneB2: () => Phaser.Loader.LoaderPlugin }
  >();

  class BaseScene extends Phaser.Scene {}

  class Scene extends GlobalPluginAMixin(
    'globalA',
    ScenePluginAMixin('sceneA', GlobalPluginBMixin('globalB', ScenePluginBMixin('sceneB', BaseScene)))
  ) {
    constructor(private readonly done: jest.DoneCallback) {
      super('test');
    }

    init() {
      this.done();
    }
  }

  let game: Phaser.Game;
  let scene: Scene;

  beforeAll((done) => {
    scene = new Scene(done);

    game = new Phaser.Game({
      type: Phaser.HEADLESS,
      scene,
      plugins: {
        global: [
          { key: 'globalPluginA', plugin: GlobalPluginA, mapping: 'globalA', start: true },
          { key: 'globalPluginB', plugin: GlobalPluginB, mapping: 'globalB', start: true }
        ],
        scene: [
          { key: 'scenePluginA', plugin: ScenePluginA, mapping: 'sceneA', start: true },
          { key: 'scenePluginB', plugin: ScenePluginB, mapping: 'sceneB', start: true }
        ]
      },
      callbacks: {
        postBoot: () => game.loop.stop()
      }
    });

    // Pretend that built-in textures were loaded.
    game.textures.emit(Phaser.Textures.Events.READY);
  });

  afterAll(() => {
    game.destroy(true, true);
    game['runDestroy']();
  });

  it("mixins a plugin's factory defined api with a scene (via mapping)", () => {
    expect(scene.globalA instanceof GlobalPluginA).toEqual(true);
    expect(scene.globalB instanceof GlobalPluginB).toEqual(true);

    expect(scene.sceneA instanceof ScenePluginA).toEqual(true);
    expect(scene.sceneB instanceof ScenePluginB).toEqual(true);

    expect(typeof scene.globalA.start).toEqual('function');
    expect(typeof scene.globalA.stop).toEqual('function');
    expect(typeof scene.globalB.start).toEqual('function');
    expect(typeof scene.globalB.stop).toEqual('function');

    expect(typeof scene.sceneA.start).toEqual('function');
    expect(typeof scene.sceneA.stop).toEqual('function');
    expect(typeof scene.sceneB.start).toEqual('function');
    expect(typeof scene.sceneB.stop).toEqual('function');
  });

  it("mixins a scene plugin's api with a scene's system instance (via mapping)", () => {
    expect(scene.sys.sceneA instanceof ScenePluginA).toEqual(true);
    expect(scene.sys.sceneB instanceof ScenePluginB).toEqual(true);

    expect(typeof scene.sys.sceneA.destroy).toEqual('function');
    expect(typeof scene.sys.sceneB.destroy).toEqual('function');
  });

  it("mixins a plugin's game object factories with a scene's game object factory api", () => {
    expect(typeof scene.add.globalA1).toEqual('function');
    expect(typeof scene.add.globalA2).toEqual('function');
    expect(typeof scene.add.globalB1).toEqual('function');
    expect(typeof scene.add.globalB2).toEqual('function');

    expect(typeof scene.add.sceneA1).toEqual('function');
    expect(typeof scene.add.sceneA2).toEqual('function');
    expect(typeof scene.add.sceneB1).toEqual('function');
    expect(typeof scene.add.sceneB2).toEqual('function');
  });

  it("mixins a plugin's game object creators with a scene's game object creator api", () => {
    expect(typeof scene.make.globalA1).toEqual('function');
    expect(typeof scene.make.globalA2).toEqual('function');
    expect(typeof scene.make.globalB1).toEqual('function');
    expect(typeof scene.make.globalB2).toEqual('function');

    expect(typeof scene.make.sceneA1).toEqual('function');
    expect(typeof scene.make.sceneA2).toEqual('function');
    expect(typeof scene.make.sceneB1).toEqual('function');
    expect(typeof scene.make.sceneB2).toEqual('function');
  });

  it("mixins a plugin's loader file type callbacks with a scene's loader api", () => {
    expect(typeof scene.load.globalA1).toEqual('function');
    expect(typeof scene.load.globalA2).toEqual('function');
    expect(typeof scene.load.globalB1).toEqual('function');
    expect(typeof scene.load.globalB2).toEqual('function');

    expect(typeof scene.load.sceneA1).toEqual('function');
    expect(typeof scene.load.sceneA2).toEqual('function');
    expect(typeof scene.load.sceneB1).toEqual('function');
    expect(typeof scene.load.sceneB2).toEqual('function');
  });
});
