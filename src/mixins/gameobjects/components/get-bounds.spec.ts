import { ComputedSize } from './computed-size';
import { GetBounds } from './get-bounds';
import { Origin } from './origin';
import { Transform } from './transform';

describe('GetBounds Game Object Component Mixin', () => {
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

  it('should provide a game object class that when instantiated has get bounds properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class GetBoundsGameObject extends GetBounds(Origin(ComputedSize(Transform(BaseGameObject)))) {}

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
