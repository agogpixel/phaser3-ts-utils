import { ScrollFactor } from './scroll-factor';

describe('ScrollFactor Game Object Component Mixin', () => {
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

  it('should provide a game object class that when instantiated has scroll factor properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class ScrollFactorGameObject extends ScrollFactor(BaseGameObject) {}

    const gameObject = new ScrollFactorGameObject(scene, 'test');

    expect(gameObject instanceof Phaser.GameObjects.GameObject).toEqual(true);

    expect(gameObject.scrollFactorX).toBeDefined();
    expect(gameObject.scrollFactorY).toBeDefined();

    expect(typeof gameObject.setScrollFactor).toEqual('function');
  });
});
