import { Pipeline } from './pipeline';

describe('Pipeline Game Object Component Mixin', () => {
  // Squelch console.log output.
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Running game calls window.focus method.
  jest.spyOn(window, 'focus').mockImplementation(() => undefined);

  let game: Phaser.Game;
  let scene: Phaser.Scene;

  beforeAll((done) => {
    game = new Phaser.Game({
      type: Phaser.HEADLESS,
      scene: {
        init: function () {
          scene = this;
          done();
        }
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

  it('should provide a game object class that when instantiated has pipeline properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class PipelineGameObject extends Pipeline(BaseGameObject) {}

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
