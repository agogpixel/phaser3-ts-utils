import '@agogpixel/phaser3-ts-utils';
import 'phaser';

class GlobalPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    pluginManager.registerGameObject(
      'globalA',
      () => undefined,
      () => undefined
    );

    pluginManager.registerGameObject(
      'globalB',
      () => undefined,
      () => undefined
    );

    pluginManager.registerFileType('globalA', () => undefined);
    pluginManager.registerFileType('globalB', () => undefined);
  }
}

class ScenePlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager, pluginKey: string) {
    super(scene, pluginManager, pluginKey);

    pluginManager.registerGameObject(
      'sceneA',
      () => undefined,
      () => undefined
    );

    pluginManager.registerGameObject(
      'sceneB',
      () => undefined,
      () => undefined
    );

    pluginManager.registerFileType('sceneA', () => undefined, scene);
    pluginManager.registerFileType('sceneB', () => undefined, scene);
  }
}

describe('Phaser TS Utils', () => {
  // Squelch console.log output.
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Running game calls window.focus method.
  jest.spyOn(window, 'focus').mockImplementation(() => undefined);

  const GlobalPluginMixin = PhaserTSUtils.Mixins.Scenes.createPluginApiMixin<
    GlobalPlugin,
    'start' | 'stop',
    { globalA: () => Phaser.GameObjects.GameObject; globalB: () => Phaser.GameObjects.GameObject },
    { globalA: () => Phaser.GameObjects.GameObject; globalB: () => Phaser.GameObjects.GameObject },
    { globalA: () => Phaser.Loader.LoaderPlugin; globalB: () => Phaser.Loader.LoaderPlugin }
  >();

  const ScenePluginMixin = PhaserTSUtils.Mixins.Scenes.createPluginApiMixin<
    ScenePlugin,
    'start' | 'stop',
    { sceneA: () => Phaser.GameObjects.GameObject; sceneB: () => Phaser.GameObjects.GameObject },
    { sceneA: () => Phaser.GameObjects.GameObject; sceneB: () => Phaser.GameObjects.GameObject },
    { sceneA: () => Phaser.Loader.LoaderPlugin; sceneB: () => Phaser.Loader.LoaderPlugin }
  >();

  class BaseScene extends Phaser.Scene {}

  class Scene extends GlobalPluginMixin('myGlobalPlugin', ScenePluginMixin('myScenePlugin', BaseScene)) {
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
        global: [{ key: 'globalPlugin', plugin: GlobalPlugin, mapping: 'myGlobalPlugin', start: true }],
        scene: [{ key: 'scenePlugin', plugin: ScenePlugin, mapping: 'myScenePlugin', start: true }]
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

  describe('Mixins', () => {
    describe('Game Objects', () => {
      describe('Components', () => {
        describe('Alpha', () => {
          it('should provide a game object class that when instantiated has alpha properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class AlphaGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Alpha(BaseGameObject) {}

            const gameObject = new AlphaGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.alpha).toBeDefined();
            expect(gameObject.alphaTopLeft).toBeDefined();
            expect(gameObject.alphaTopRight).toBeDefined();
            expect(gameObject.alphaBottomLeft).toBeDefined();
            expect(gameObject.alphaBottomRight).toBeDefined();

            expect(typeof gameObject.clearAlpha).toEqual('function');
            expect(typeof gameObject.setAlpha).toEqual('function');
          });
        });

        describe('AlphaSingle', () => {
          it('should provide a game object class that when instantiated has alpha single properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class AlphaSingleGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.AlphaSingle(
              BaseGameObject
            ) {}

            const gameObject = new AlphaSingleGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.alpha).toBeDefined();

            expect(typeof gameObject.clearAlpha).toEqual('function');
            expect(typeof gameObject.setAlpha).toEqual('function');
          });
        });

        describe('BlendMode', () => {
          it('should provide a game object class that when instantiated has blend mode properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class BlendModeGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.BlendMode(BaseGameObject) {}

            const gameObject = new BlendModeGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.blendMode).toBeDefined();

            expect(typeof gameObject.setBlendMode).toEqual('function');
          });
        });

        describe('ComputedSize', () => {
          it('should provide a game object class that when instantiated has computed size properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class ComputedSizeGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.ComputedSize(
              PhaserTSUtils.Mixins.GameObjects.Components.Transform(BaseGameObject)
            ) {}

            const gameObject = new ComputedSizeGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.width).toBeDefined();
            expect(gameObject.height).toBeDefined();
            expect(gameObject.displayWidth).toBeDefined();
            expect(gameObject.displayHeight).toBeDefined();

            expect(typeof gameObject.setSize).toEqual('function');
            expect(typeof gameObject.setDisplaySize).toEqual('function');
          });
        });

        describe('Crop', () => {
          it('should provide a game object class that when instantiated has crop properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class CropGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Crop(BaseGameObject) {}

            const gameObject = new CropGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.texture).toBeDefined();
            expect(gameObject.frame).toBeDefined();
            expect(gameObject.isCropped).toBeDefined();

            expect(typeof gameObject.setCrop).toEqual('function');
          });
        });

        describe('Depth', () => {
          it('should provide a game object class that when instantiated has depth properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class DepthGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Depth(BaseGameObject) {}

            const gameObject = new DepthGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.depth).toBeDefined();

            expect(typeof gameObject.setDepth).toEqual('function');
          });
        });

        describe('Flip', () => {
          it('should provide a game object class that when instantiated has flip properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class FlipGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Flip(BaseGameObject) {}

            const gameObject = new FlipGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.flipX).toBeDefined();
            expect(gameObject.flipY).toBeDefined();

            expect(typeof gameObject.toggleFlipX).toEqual('function');
            expect(typeof gameObject.toggleFlipY).toEqual('function');
            expect(typeof gameObject.setFlipX).toEqual('function');
            expect(typeof gameObject.setFlipY).toEqual('function');
            expect(typeof gameObject.setFlip).toEqual('function');
            expect(typeof gameObject.resetFlip).toEqual('function');
          });
        });

        describe('GetBounds', () => {
          it('should provide a game object class that when instantiated has get bounds properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class GetBoundsGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.GetBounds(
              PhaserTSUtils.Mixins.GameObjects.Components.Origin(
                PhaserTSUtils.Mixins.GameObjects.Components.ComputedSize(
                  PhaserTSUtils.Mixins.GameObjects.Components.Transform(BaseGameObject)
                )
              )
            ) {}

            const gameObject = new GetBoundsGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(typeof gameObject.getCenter).toEqual('function');
            expect(typeof gameObject.getTopLeft).toEqual('function');
            expect(typeof gameObject.getTopCenter).toEqual('function');
            expect(typeof gameObject.getTopRight).toEqual('function');
            expect(typeof gameObject.getLeftCenter).toEqual('function');
            expect(typeof gameObject.getRightCenter).toEqual('function');
            expect(typeof gameObject.getBottomLeft).toEqual('function');
            expect(typeof gameObject.getBottomCenter).toEqual('function');
            expect(typeof gameObject.getBottomRight).toEqual('function');
            expect(typeof gameObject.getBounds).toEqual('function');
          });
        });

        describe('Mask', () => {
          it('should provide a game object class that when instantiated has mask properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class MaskGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Mask(BaseGameObject) {}

            const gameObject = new MaskGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.mask).toBeDefined();

            expect(typeof gameObject.setMask).toEqual('function');
            expect(typeof gameObject.clearMask).toEqual('function');
            expect(typeof gameObject.createBitmapMask).toEqual('function');
            expect(typeof gameObject.createGeometryMask).toEqual('function');
          });
        });

        describe('Origin', () => {
          it('should provide a game object class that when instantiated has origin properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class OriginGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Origin(
              PhaserTSUtils.Mixins.GameObjects.Components.ComputedSize(
                PhaserTSUtils.Mixins.GameObjects.Components.Transform(BaseGameObject)
              )
            ) {}

            const gameObject = new OriginGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.originX).toBeDefined();
            expect(gameObject.originY).toBeDefined();
            expect(gameObject.displayOriginX).toBeDefined();
            expect(gameObject.displayOriginY).toBeDefined();

            expect(typeof gameObject.setOrigin).toEqual('function');
            expect(typeof gameObject.setOriginFromFrame).toEqual('function');
            expect(typeof gameObject.setDisplayOrigin).toEqual('function');
            expect(typeof gameObject.updateDisplayOrigin).toEqual('function');
          });
        });

        describe('PathFollower', () => {
          it('should provide a game object class that when instantiated has path follower properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class PathFollowerGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.PathFollower(
              PhaserTSUtils.Mixins.GameObjects.Components.Transform(BaseGameObject)
            ) {}

            const gameObject = new PathFollowerGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.path).toBeDefined();
            expect(gameObject.rotateToPath).toBeDefined();

            expect(typeof gameObject.setPath).toEqual('function');
            expect(typeof gameObject.setRotateToPath).toEqual('function');
            expect(typeof gameObject.isFollowing).toEqual('function');
            expect(typeof gameObject.startFollow).toEqual('function');
            expect(typeof gameObject.pauseFollow).toEqual('function');
            expect(typeof gameObject.resumeFollow).toEqual('function');
            expect(typeof gameObject.stopFollow).toEqual('function');
            expect(typeof gameObject.pathUpdate).toEqual('function');
          });
        });

        describe('Pipeline', () => {
          it('should provide a game object class that when instantiated has pipeline properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class PipelineGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Pipeline(BaseGameObject) {}

            const gameObject = new PipelineGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.defaultPipeline).toBeDefined();
            expect(gameObject.pipeline).toBeDefined();
            expect(gameObject.hasPostPipeline).toBeDefined();
            expect(gameObject.postPipelines).toBeDefined();

            expect(typeof gameObject.initPipeline).toEqual('function');
            expect(typeof gameObject.setPipeline).toEqual('function');
            expect(typeof gameObject.setPostPipeline).toEqual('function');
            expect(typeof gameObject.setPipelineData).toEqual('function');
            expect(typeof gameObject.getPostPipeline).toEqual('function');
            expect(typeof gameObject.resetPipeline).toEqual('function');
            expect(typeof gameObject.resetPostPipeline).toEqual('function');
            expect(typeof gameObject.removePostPipeline).toEqual('function');
            expect(typeof gameObject.getPipelineName).toEqual('function');
          });
        });

        describe('ScrollFactor', () => {
          it('should provide a game object class that when instantiated has scroll factor properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class ScrollFactorGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.ScrollFactor(
              BaseGameObject
            ) {}

            const gameObject = new ScrollFactorGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.scrollFactorX).toBeDefined();
            expect(gameObject.scrollFactorY).toBeDefined();

            expect(typeof gameObject.setScrollFactor).toEqual('function');
          });
        });

        describe('Size', () => {
          it('should provide a game object class that when instantiated has size properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class SizeGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Size(
              PhaserTSUtils.Mixins.GameObjects.Components.Transform(
                PhaserTSUtils.Mixins.GameObjects.Components.Crop(BaseGameObject)
              )
            ) {}

            const gameObject = new SizeGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            gameObject.frame = new Phaser.Textures.Frame(
              new Phaser.Textures.Texture(scene.textures, 'test', document.createElement('img')),
              'test',
              0,
              0,
              0,
              10,
              10
            );

            expect(gameObject.width).toBeDefined();
            expect(gameObject.height).toBeDefined();
            expect(gameObject.displayWidth).toBeDefined();
            expect(gameObject.displayHeight).toBeDefined();

            expect(typeof gameObject.setSizeToFrame).toEqual('function');
            expect(typeof gameObject.setSize).toEqual('function');
            expect(typeof gameObject.setDisplaySize).toEqual('function');
          });
        });

        describe('TextureCrop', () => {
          it('should provide a game object class that when instantiated has texture crop properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class TextureCropGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.TextureCrop(
              BaseGameObject
            ) {}

            const gameObject = new TextureCropGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.texture).toBeDefined();
            expect(gameObject.frame).toBeDefined();

            expect(typeof gameObject.setCrop).toEqual('function');
            expect(typeof gameObject.setTexture).toEqual('function');
            expect(typeof gameObject.setFrame).toEqual('function');
          });
        });

        describe('Texture', () => {
          it('should provide a game object class that when instantiated has texture properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class TextureGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Texture(BaseGameObject) {}

            const gameObject = new TextureGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.texture).toBeDefined();
            expect(gameObject.frame).toBeDefined();

            expect(typeof gameObject.setTexture).toEqual('function');
            expect(typeof gameObject.setFrame).toEqual('function');
          });
        });

        describe('Tint', () => {
          it('should provide a game object class that when instantiated has tint properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class TintGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Tint(BaseGameObject) {}

            const gameObject = new TintGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.tintTopLeft).toBeDefined();
            expect(gameObject.tintTopRight).toBeDefined();
            expect(gameObject.tintBottomLeft).toBeDefined();
            expect(gameObject.tintBottomRight).toBeDefined();
            expect(gameObject.tintFill).toBeDefined();
            expect(gameObject.tint).toBeUndefined();
            expect(gameObject.isTinted).toBeDefined();

            expect(typeof gameObject.clearTint).toEqual('function');
            expect(typeof gameObject.setTint).toEqual('function');
            expect(typeof gameObject.setTintFill).toEqual('function');
          });
        });

        describe('Transform', () => {
          it('should provide a game object class that when instantiated has transform properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class TransformGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Transform(BaseGameObject) {}

            const gameObject = new TransformGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.x).toBeDefined();
            expect(gameObject.y).toBeDefined();
            expect(gameObject.z).toBeDefined();
            expect(gameObject.w).toBeDefined();
            expect(gameObject.scale).toBeDefined();
            expect(gameObject.scaleX).toBeDefined();
            expect(gameObject.scaleY).toBeDefined();
            expect(gameObject.angle).toBeDefined();
            expect(gameObject.rotation).toBeDefined();

            expect(typeof gameObject.setPosition).toEqual('function');
            expect(typeof gameObject.copyPosition).toEqual('function');
            expect(typeof gameObject.setRandomPosition).toEqual('function');
            expect(typeof gameObject.setRotation).toEqual('function');
            expect(typeof gameObject.setAngle).toEqual('function');
            expect(typeof gameObject.setScale).toEqual('function');
            expect(typeof gameObject.setX).toEqual('function');
            expect(typeof gameObject.setY).toEqual('function');
            expect(typeof gameObject.setZ).toEqual('function');
            expect(typeof gameObject.setW).toEqual('function');
            expect(typeof gameObject.getLocalTransformMatrix).toEqual('function');
            expect(typeof gameObject.getWorldTransformMatrix).toEqual('function');
            expect(typeof gameObject.getLocalPoint).toEqual('function');
            expect(typeof gameObject.getParentRotation).toEqual('function');
          });
        });

        describe('Visible', () => {
          it('should provide a game object class that when instantiated has visible properties', () => {
            class BaseGameObject extends Phaser.GameObjects.GameObject {}
            class VisibleGameObject extends PhaserTSUtils.Mixins.GameObjects.Components.Visible(BaseGameObject) {}

            const gameObject = new VisibleGameObject(scene, 'test');

            expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

            expect(gameObject.visible).toBeDefined();

            expect(typeof gameObject.setVisible).toEqual('function');
          });
        });
      });
    });

    describe('Scenes', () => {
      describe('Plugin API Mixin Factory', () => {
        it("mixins a plugin's factory defined api with a scene (via mapping)", () => {
          expect(scene.myGlobalPlugin instanceof GlobalPlugin).toEqual(true);
          expect(scene.myScenePlugin instanceof ScenePlugin).toEqual(true);

          expect(typeof scene.myGlobalPlugin.start).toEqual('function');
          expect(typeof scene.myGlobalPlugin.stop).toEqual('function');

          expect(typeof scene.myScenePlugin.start).toEqual('function');
          expect(typeof scene.myScenePlugin.stop).toEqual('function');
        });

        it("mixins a scene plugin's api with a scene's system instance (via mapping)", () => {
          expect(scene.sys.myScenePlugin instanceof ScenePlugin).toEqual(true);

          expect(typeof scene.sys.myScenePlugin.destroy).toEqual('function');
        });

        it("mixins a plugin's game object factories with a scene's game object factory api", () => {
          expect(typeof scene.add.globalA).toEqual('function');
          expect(typeof scene.add.globalB).toEqual('function');

          expect(typeof scene.add.sceneA).toEqual('function');
          expect(typeof scene.add.sceneB).toEqual('function');
        });

        it("mixins a plugin's game object creators with a scene's game object creator api", () => {
          expect(typeof scene.make.globalA).toEqual('function');
          expect(typeof scene.make.globalB).toEqual('function');

          expect(typeof scene.make.sceneA).toEqual('function');
          expect(typeof scene.make.sceneB).toEqual('function');
        });

        it("mixins a plugin's loader file type callbacks with a scene's loader api", () => {
          expect(typeof scene.load.globalA).toEqual('function');
          expect(typeof scene.load.globalB).toEqual('function');

          expect(typeof scene.load.sceneA).toEqual('function');
          expect(typeof scene.load.sceneB).toEqual('function');
        });
      });
    });
  });

  describe('Types', () =>
    it('exports a concrete type for constructor inference', () =>
      expect(typeof PhaserTSUtils.Types.Type).toEqual('function')));
});
