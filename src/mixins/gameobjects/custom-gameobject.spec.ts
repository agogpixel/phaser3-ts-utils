import { CustomGameObject } from './custom-gameobject';
import { Alpha } from './components/alpha';
import { ComputedSize } from './components/computed-size';
import { Flip } from './components/flip';
import { GetBounds, Origin, PathFollower, Size, Transform } from './components';

describe('Custom Game Object', () => {
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

  it('creates a simple custom game object type [Alpha, Flip]', () => {
    class AlphaFlipGameObject extends CustomGameObject(Alpha, Flip) {}

    const gameObject = new AlphaFlipGameObject(scene, 'test');

    expect(gameObject).toBeDefined();
    expect(gameObject.name).toBeDefined();
    expect(gameObject.alpha).toBeDefined();
    expect(typeof gameObject.setFlip).toEqual('function');
  });

  it('throws when Transform is not available for ComputedSize', () =>
    expect(() => CustomGameObject(ComputedSize)).toThrow('CustomGameObject: ComputedSize requires Transform'));

  it('throws when ComputedSize or Size is not available for GetBounds', () =>
    expect(() => CustomGameObject(GetBounds)).toThrow(
      'CustomGameObject: GetBounds requires one of ComputedSize or Size'
    ));

  it('throws when Origin is not available for GetBounds', () =>
    expect(() => CustomGameObject(GetBounds, ComputedSize, Transform)).toThrow(
      'CustomGameObject: GetBounds requires Origin and Transform'
    ));

  it('throws when ComputedSize or Size is not available for Origin', () =>
    expect(() => CustomGameObject(Origin)).toThrow('CustomGameObject: Origin requires one of ComputedSize or Size'));

  it('throws when Transform is not available for PathFollower', () =>
    expect(() => CustomGameObject(PathFollower)).toThrow('CustomGameObject: PathFollower requires Transform'));

  it('throws when Transform is not available for Size', () =>
    expect(() => CustomGameObject(Size)).toThrow('CustomGameObject: Size requires Transform'));

  it('throws when Crop, Texture, & TextureCrop are not available for Size', () =>
    expect(() => CustomGameObject(Size, Transform)).toThrow(
      'CustomGameObject: Size requires one of Crop, Texture, or TextureCrop'
    ));
});
