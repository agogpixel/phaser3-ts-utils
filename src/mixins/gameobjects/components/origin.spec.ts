import { ComputedSize } from './computed-size';
import { Origin } from './origin';
import { Transform } from './transform';

describe('Origin Game Object Component Mixin', () => {
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

  it('should provide a game object class that when instantiated has origin properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class OriginGameObject extends Origin(ComputedSize(Transform(BaseGameObject))) {}

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
