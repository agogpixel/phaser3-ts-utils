# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2022-01-10

### Added

-   `UnionToIntersection` utility type.
-   [CustomGameObject](./src/mixins/gameobjects/custom-gameobject.ts) class factory with component mixin dependency checking (true/false).

### Changed

-   Do not use type unions in the `GameObjectConstraint` template parameter found in [GetBounds](./src/mixins/gameobjects/components/get-bounds.ts), [Origin](./src/mixins/gameobjects/components/origin.ts), & [Size](./src/mixins/gameobjects/components/size.ts) component mixins.
-   Set Phaser peer dependency to v3.22+. FX component is available with v3.60+, corresponding mixin must be imported directly.

### Removed

-   Development scripts and related dependencies.

## [0.1.0] - 2021-11-01

### Added

-   Initial release with scene & game object mixin support.

[unreleased]: https://github.com/agogpixel/phaser3-ts-utils/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/agogpixel/phaser3-ts-utils/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/agogpixel/phaser3-ts-utils/releases/tag/v0.1.0
