import { Alpha } from './alpha';

describe('Alpha Game Object Component Mixin', () => {
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

  it('should provide a game object class that when instantiated has alpha properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class AlphaGameObject extends Alpha(BaseGameObject) {}

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
