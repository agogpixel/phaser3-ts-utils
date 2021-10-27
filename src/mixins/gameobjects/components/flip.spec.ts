import { Flip } from './flip';

describe('Flip Game Object Component Mixin', () => {
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

  it('should provide a game object class that when instantiated has flip properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class FlipGameObject extends Flip(BaseGameObject) {}

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
