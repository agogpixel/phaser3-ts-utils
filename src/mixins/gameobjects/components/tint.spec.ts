import { Tint } from './tint';

describe('Tint Game Object Component Mixin', () => {
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

  it('should provide a game object class that when instantiated has tint properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class TintGameObject extends Tint(BaseGameObject) {}

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
