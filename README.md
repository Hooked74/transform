<h1 align="center"><strong>Transform</strong></h1>

[![Build Status](https://travis-ci.org/Hooked74/transform.svg?branch=master)](https://travis-ci.org/Hooked74/transform)
[![npm](https://img.shields.io/npm/v/@hooked74/transform)](https://www.npmjs.com/package/@hooked74/transform)
[![License](https://img.shields.io/npm/l/@hooked74/transform)](https://github.com/Hooked74/transform/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/Hooked74/transform/branch/master/graph/badge.svg)](https://codecov.io/gh/Hooked74/transform)
[![Module Size](https://img.shields.io/badge/dynamic/json?color=success&label=module%20size&query=%24.module&url=https%3A%2F%2Fraw.githubusercontent.com%2FHooked74%2Ftransform%2Fmaster%2F.size-snapshot.json)](https://github.com/Hooked74/transform/blob/master/.size-snapshot.json)

## Table of contents

<!--ts-->
- [Overview](#overview)
- [Install](#install)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Inheritance](#inheritance)
  - [Options](#options)
- [API](#api)
  - [Properties](#properties)
  - [Methods](#methods)
- [Development](#development)
  <!--te-->

## Overview

This library will parse the matrix transformation of the element into the following properties: **scale**, **translate**, **rotate**, **skew**. Interface allows to change these properties and generate a matrix from them that will update the transform property. The library also parses and allows you to change the **transform-origin** property using a special interface.

Has the following constructor signature:

```js
  new Transform(node, options?)
```

**node** [HTMLElement|SVGElement] element with which transformations will be performed. Required parameter. \
**options** [Object] described in [options](#options). Optional parameter.

## Install

```
npm install @hooked74/transform
```

## Usage

### Basic Usage

```js
  import Transform from "@hooked/transform";

  // Use Transformation for HTMLElement
  const transform = new Transform(htmlElement);
  transform.origin = { x: 1, y: 0.5 };
  transform.scaleX = 2;

  // Use Transformation for SVGElement
  const transform = new Transform(svgElement);
  transform.originX = 0.5;
  transform.y = 100;
```

### Inheritance

```js
  import Transform from "@hooked/transform";

  class Entity extends Transform {
    constructor(node) {
      super(node);
    }
    // ...
  }

  const entity = new Entity(htmlElement);
  entity.origin = { x: 0.5, y: 0.5 };
  entity.angle = 10;
```

### Options

Transform has the following options:

#### **transformOrder**

This option provides the ability to generate a matrix that will be composed of properties in a given order. By default this order:

```js
  ["skew", "scale", "rotate", "translate"]
```

This order was selected empirically.

Available orders:

```js
  [
    ["rotate", "scale", "translate", "skew"],
    ["rotate", "scale", "skew", "translate"],
    ["rotate", "skew", "scale", "translate"],
    ["rotate", "skew", "translate", "scale"],
    ["rotate", "translate", "skew", "scale"],
    ["rotate", "translate", "scale", "skew"],

    ["scale", "rotate", "translate", "skew"],
    ["scale", "rotate", "skew", "translate"],
    ["scale", "skew", "rotate", "translate"],
    ["scale", "skew", "translate", "rotate"],
    ["scale", "translate", "skew", "rotate"],
    ["scale", "translate", "rotate", "skew"],

    ["skew", "rotate", "scale", "translate"],
    ["skew", "rotate", "translate", "scale"],
    ["skew", "scale", "rotate", "translate"],
    ["skew", "scale", "translate", "rotate"],
    ["skew", "translate", "rotate", "scale"],
    ["skew", "translate", "scale", "rotate"],

    ["translate", "rotate", "scale", "skew"],
    ["translate", "rotate", "skew", "scale"],
    ["translate", "skew", "rotate", "scale"],
    ["translate", "skew", "scale", "rotate"],
    ["translate", "scale", "skew", "rotate"],
    ["translate", "scale", "rotate", "skew"]
  ]
```

## API

### Properties

#### **width** [float]

Allow to change the width of the element. Return the width of the element in pixels.

#### **height** [float]

Allow to change the height of the element. Return the height of the element in pixels.

#### **styleTransform** [string]

Allow to change the transformation property of the element. Return value in transformation matrix format.

#### **styleTransformOrigin** [string]

Allow to change **transform-origin** of the element. Return the value of **transform-origin** in the format **Xpx Ypx**.

#### **rotate** [{ angle: float }]

Change the state of rotate. The main property of the state is the angle of rotation. Return rotate state.

#### **angle** [float]

Element rotation angle. Limited to values from 0 to 360.

#### **scale** [{ x: float, y: float }]

Change the state of scale. The main properties of the state is the scale x and scale y. Return scale state.

#### **scaleX** [float]

Element scaling by X. Limited to values from 0 to 1 where 1 is 100%.

#### **scaleY** [float]

Element scaling by Y. Limited to values from 0 to 1 where 1 is 100%.

#### **skew** [{ x: float, y: float }]

Change the state of skew. The main properties of the state is the skew x and skew y. Return skew state.

#### **skewX** [float]

Element skewing by X. Value in degrees.

#### **skewY** [float]

Element skewing by Y. Value in degrees.

#### **translate** [{ x: float, y: float }]

Change the state of translate. The main properties of the state is the translate x and translate y. Return translate state.

#### **x** [float]

Element offset by X.

#### **y** [float]

Element offset by Y.

#### **origin** [{ x: float, y: float }]

Change the state of origin. The main properties of the state is the origin x and origin y. Return origin state.

#### **originX** [float]

Set the X coordinate relative to which the element will be transformed.

#### **originY** [float]

Set the Y coordinate relative to which the element will be transformed.

### Methods

#### **getStyleProperty(property: string): string**

Get element style property.

#### **setStyleProperty(property: string, value: string): void**

Set element style property.

#### **update(isOrigin: boolean): void**

Force update transformation. It’s not worth using without need, since it is called automatically when the class properties change. If **isOrigin** is true then updates **transform-origin** otherwise **transform**.

## Development

You can run some built-in commands:

### **npm run build**

Builds the app for production. Your app is ready to be deployed.

### **npm run test:watch**

Runs the test watcher in an interactive mode. By default, runs tests related to files changed since the last commit.
