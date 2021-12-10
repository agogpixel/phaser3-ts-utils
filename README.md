# agogpixel/phaser3-ts-utils

[![Build & Test](https://github.com/agogpixel/phaser3-ts-utils/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/agogpixel/phaser3-ts-utils/actions/workflows/build-and-test.yml)
[![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/kidthales/8783260504aa23bb1c4dd36f0ba3be01/raw/phaser3-ts-utils__heads_main.json)](https://github.com/agogpixel/phaser3-ts-utils/actions/workflows/build-and-test.yml)
[![Version](https://img.shields.io/npm/v/@agogpixel/phaser3-ts-utils.svg)](https://npmjs.org/package/@agogpixel/phaser3-ts-utils)
[![Downloads/week](https://img.shields.io/npm/dw/@agogpixel/phaser3-ts-utils.svg)](https://npmjs.org/package/@agogpixel/phaser3-ts-utils)
[![License](https://img.shields.io/npm/l/@agogpixel/phaser3-ts-utils.svg)](https://github.com/agogpixel/phaser3-ts-utils/blob/master/LICENSE)

<hr>

[Phaser 3](https://github.com/photonstorm/phaser) [TypeScript](https://www.typescriptlang.org/) utilities.

## Getting Started

1. Install the package:

    ```shell
    npm install --save @agogpixel/phaser3-ts-utils
    ```

2. Add `@agogpixel/phaser3-ts-utils` to the [types entry](https://www.typescriptlang.org/tsconfig#types) in the appropriate `tsconfig` file.

    ```json
    {
        "compilerOptions": {
            "types": ["@agogpixel/phaser3-ts-utils"]
        }
    }
    ```

3. Import the library with global scope **once** (usually in an entry file):

    ```typescript
    import '@agogpixel/phaser3-ts-utils';
    ```

## Usage

This library is intended to ease some use cases when developing with Phaser 3 & TypeScript.

### Mixins

Some Phaser functionality is leveraged by this library in the form of mixins that follow the [Mixins section](https://www.typescriptlang.org/docs/handbook/mixins.html) of the TypeScript handbook.

#### Game Objects

The [Phaser Game Object](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html) is the base class upon which various sprite & graphic classes a built; thus, they are one of the main API sufaces used in development.

##### Components

Phaser offers its own es5 compatible class extensions system that ties into how Game Objects mixin various [components](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.html). The available namespace typings do not expose some of the core functions & variables that are used to accomplish this; while these are still available for use in implementing Game Objects 'from scratch', doing so with TypeScript can be awkward (ie. a lot of boilerplate to get the typing to correctly reflect the component properties available on the Game Object).

Utilizing class mixins, we can continue to use the Game Object components provided by Phaser and get the appropriate typing on our resulting Game Object class:

```typescript
const { Alpha, BlendMode, Texture, Transform, Visible } = PhaserTSUtils.Mixins.GameObjects.Components;

// Make our own base game object type so we don't
// accidentally pollute Phaser.GameObjects.GameObject prototype.
class MyBaseGameObject extends Phaser.GameObjects.GameObject {}

class MyGameObject extends Alpha(BlendMode(Texture(Transform(Visible(MyBaseGameObject))))) {
    // Custom Game Object implementation
    // with mixed in component properties
    // available in TypeScript...
    doFoo() {
        this.setAlpha(0.75);
        // ...
    }
}
```

##### CustomGameObject

To help streamline the [components](#components) example, a [CustomGameObject](./src/mixins/gameobjects/custom-gameobject.ts) factory function is now available:

```typescript
const { Alpha, BlendMode, Texture, Transform, Visible } = PhaserTSUtils.Mixins.GameObjects.Components;

class MyGameObject extends PhaserTSUtils.Mixins.GameObjects.CustomGameObject(
    Alpha,
    BlendMode,
    Texture,
    Transform,
    Visible
) {
    // Custom Game Object implementation
    // with mixed in component properties
    // available in TypeScript...
    doFoo() {
        this.setAlpha(0.75);
        // ...
    }
}
```

#### Scenes

A [Phaser Scene](https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html) is the main controller for managing game resources; thus, they are one of the main API sufaces used in development.

##### Plugin API Mixin Factory

Phaser provides a [plugin system](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/pluginsystem/) that allows for extended functionality that can be optionally accessed through a scene. In addition to a plugin being available via a _mapping_, it can extend the Game Object [factory](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html) (`add`) & [creator](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectCreator.html) (`make`) scene properties as well as the [loader plugin](https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html) (`load`) scene property.

Utilizing a class mixin factory, we can create a mixin that coerces a given Scene class such that a plugin's injected API is available on the resulting Scene type:

```typescript
////////////////////
// Plugins
////////////////////

class GlobalPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);

        pluginManager.registerGameObject(
            'globalA',
            function (/* Args... */) {
                /* Implementation... */
            },
            function (/* Args... */) {
                /* Implementation... */
            }
        );

        pluginManager.registerGameObject(
            'globalB',
            function (/* Args... */) {
                /* Implementation... */
            },
            function (/* Args... */) {
                /* Implementation... */
            }
        );

        pluginManager.registerFileType('globalA', function (/* Args... */) {
            /* Implementation... */
        });

        pluginManager.registerFileType('globalB', function (/* Args... */) {
            /* Implementation... */
        });
    }

    globalA(/* Args... */) {
        /* Implementation... */
    }

    globalB(/* Args... */) {
        /* Implementation... */
    }
}

class ScenePlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager, pluginKey: string) {
        super(scene, pluginManager, pluginKey);

        pluginManager.registerGameObject(
            'sceneA',
            function (/* Args... */) {
                /* Implementation... */
            },
            function (/* Args... */) {
                /* Implementation... */
            }
        );

        pluginManager.registerGameObject(
            'sceneB',
            function (/* Args... */) {
                /* Implementation... */
            },
            function (/* Args... */) {
                /* Implementation... */
            }
        );

        pluginManager.registerFileType(
            'sceneA',
            function (/* Args... */) {
                /* Implementation... */
            },
            scene
        );

        pluginManager.registerFileType(
            'sceneB',
            function (/* Args... */) {
                /* Implementation... */
            },
            scene
        );
    }

    sceneA(/* Args... */) {
        /* Implementation... */
    }

    sceneB(/* Args... */) {
        /* Implementation... */
    }
}

////////////////////
// Mixins
////////////////////

const createMixin = PhaserTSUtils.Mixins.Scenes.createPluginApiMixin;

const GlobalPluginMixin = createMixin<
    GlobalPlugin,
    'globalA' | 'globalB',
    {
        globalA: (/* Args... */) => Phaser.GameObjects.GameObject;
        globalB: (/* Args... */) => Phaser.GameObjects.GameObject;
    },
    {
        globalA: (/* Args... */) => Phaser.GameObjects.GameObject;
        globalB: (/* Args... */) => Phaser.GameObjects.GameObject;
    },
    { globalA: (/* Args... */) => Phaser.Loader.LoaderPlugin; globalB: (/* Args... */) => Phaser.Loader.LoaderPlugin }
>();

const ScenePluginMixin = createMixin<
    ScenePlugin,
    'sceneA' | 'sceneB',
    {
        sceneA: (/* Args... */) => Phaser.GameObjects.GameObject;
        sceneB: (/* Args... */) => Phaser.GameObjects.GameObject;
    },
    {
        sceneA: (/* Args... */) => Phaser.GameObjects.GameObject;
        sceneB: (/* Args... */) => Phaser.GameObjects.GameObject;
    },
    { sceneA: (/* Args... */) => Phaser.Loader.LoaderPlugin; sceneB: (/* Args... */) => Phaser.Loader.LoaderPlugin }
>();

////////////////////
// Scenes
////////////////////

// Make our own base scene type so we don't
// accidentally pollute Phaser.Scene prototype.
class MyBaseScene extends Phaser.Scene {}

// Apply our mixins with with corresponding plugin
// scene mappings (see below).
class MyScene extends GlobalPluginMixin('myGlobalPlugin', ScenePluginMixin('myScenePlugin', MyBaseScene)) {
    preload() {
        // Custom loader file type callbacks...
        this.load.globalA(/* Args... */);
        this.load.globalB(/* Args... */);
        this.load.sceneA(/* Args... */);
        this.load.sceneB(/* Args... */);
    }

    create() {
        // Global plugin API...
        this.myGlobalPlugin.globalA(/* Args... */);
        this.myGlobalPlugin.globalB(/* Args... */);

        // Scene plugin API...
        this.myScenePlugin.sceneA(/* Args... */);
        this.myScenePlugin.sceneB(/* Args... */);

        // Fully exposed scene plugin API...
        this.sys.myScenePlugin.sceneA(/* Args... */);
        this.sys.myScenePlugin.sceneB(/* Args... */);
        this.sys.myScenePlugin.destroy();

        // Game Object factory...
        this.add.globalA(/* Args... */);
        this.add.globalB(/* Args... */);
        this.add.sceneA(/* Args... */);
        this.add.sceneB(/* Args... */);

        // Game Object creator...
        this.make.globalA(/* Args... */);
        this.make.globalB(/* Args... */);
        this.make.sceneA(/* Args... */);
        this.make.sceneB(/* Args... */);
    }
}

new Phaser.Game({
    // ...
    plugins: {
        // Register our plugins with scene mappings
        // (used with mixins in scene definition, see above).
        global: [{ key: 'globalPlugin', plugin: GlobalPlugin, mapping: 'myGlobalPlugin', start: true }],
        scene: [{ key: 'scenePlugin', plugin: ScenePlugin, mapping: 'myScenePlugin', start: true }]
    },
    scene: [MyScene]
    // ...
});
```

## Development

Live development with `jest` watch mode:

```shell
npm start
```

Lint files:

```shell
npm run lint      # Report issues.
npm run lint:fix  # Fix issues.
```

Unit test & create coverage report in `coverage`:

```shell
npm test
```

Build consumable `.js`, `.js.map`, & `.d.ts` files to `dist`; prepare for further packaging:

```shell
npm run build
```

Smoke test build:

```shell
npm run smoke-test
```

Create package tarball from `dist`:

```shell
npm run create-tarball               # Development stream.
npm run create-tarball -- --release  # Release stream.
```

Publish package tarball to registry (some assembly required):

```shell
npm run publish-tarball -- NPM
npm run publish-tarball -- GitHub
```

## Package Distribution

Tag for stable release with highest version: `latest`

Development release tag (tracks `main` branch): `next`

Additional distribution tags include:

|                                       Distribution                                       |       Release       |  Pre-Release  |
| :--------------------------------------------------------------------------------------: | :-----------------: | :-----------: |
|       Major versions with highest minor, patch (and possibly pre-release) version.       |     `vX~latest`     |   `vX~next`   |
|       Major, minor versions with highest patch (and possibly pre-release) version.       |    `vX.Y~latest`    |  `vX.Y~next`  |
| Major, minor, patch versions - catch all for releases that don't match any of the above. | ~~`vX.Y.Z~latest`~~ | `vX.Y.Z~next` |

## License

Licensed under the [MIT License](./LICENSE).
