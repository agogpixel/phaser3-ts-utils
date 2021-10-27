import { PathFollower } from './path-follower';
import { Transform } from './transform';

describe('PathFollower Game Object Component Mixin', () => {
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

  it('should provide a game object class that when instantiated has path follower properties', () => {
    class BaseGameObject extends Phaser.GameObjects.GameObject {}
    class PathFollowerGameObject extends PathFollower(Transform(BaseGameObject)) {}

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
