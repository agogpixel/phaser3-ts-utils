import { Transform } from './transform';

describe('Transform Game Object Component Mixin', () => {
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

  it('should provide a game object class that when instantiated has transform properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class TransformGameObject extends Transform(BaseGameObject) {}

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
