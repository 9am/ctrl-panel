<div align="center">
    <img alt="ctrl-panel" src="https://user-images.githubusercontent.com/1435457/202668072-2d92cdc5-e723-4b1f-bc0a-b6126d5af1ba.png" width="240" />
    <h1>&lt;ctrl-panel&gt;</h1>
    <p>A simple control panel.</p>
    <p>
        <a href="https://github.com/9am/ctrl-panel/blob/main/LICENSE">
            <img alt="GitHub" src="https://img.shields.io/github/license/9am/ctrl-panel?style=flat-square&color=success">
        </a>
        <a href="https://www.npmjs.com/package/@9am/ctrl-panel">
            <img alt="npm" src="https://img.shields.io/npm/v/@9am/ctrl-panel?style=flat-square&color=orange">
        </a>
        <a href="https://www.npmjs.com/package/@9am/ctrl-panel">
            <img alt="npm" src="https://img.shields.io/npm/dt/@9am/ctrl-panel?style=flat-square&color=blue">
        </a>
        <a href="https://bundlephobia.com/package/@9am/ctrl-panel@latest">
            <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@9am/ctrl-panel?style=flat-square">
        </a>
    </p>
</div>

---

## Why Build This
See my blog post on [9am.github.io](https://9am.github.io/)
> [Every Animation Lover Needs A Control Panel](https://github.com/9am/9am.github.io/issues/10)

## Features
- **9 custom elements** to choose.
- **3 themes** out of the box.
- **Control the value shape** with the template.
- Customize or make your own theme with **CSS properties.**

## Elements
| Element | Screenshot | Varient | Description | Live Demo |
| ------- | ---------- | ------- | ----------- | --------- |
| ctrl-panel | ------- | ------- | The root element. | [demo](http://9am.github.io/ctrl-panel/ctrl-panel.html) |
| ctrl-group | ------- | ------- | Group ctrl-* together to shape the value. | [demo](http://9am.github.io/ctrl-panel/ctrl-group.html) |
| ctrl-slider | ![slider-1](https://user-images.githubusercontent.com/1435457/233948538-65ea017b-fddd-4026-a8a8-a739f199533a.gif) | ![slider-2](https://user-images.githubusercontent.com/1435457/233948534-3aa95a1c-5043-43d8-a8e7-5c81cdce2357.gif) | A numblic slider. | [demo](http://9am.github.io/ctrl-panel/ctrl-slider.html) |
| ctrl-clamp | ![clamp-1](https://user-images.githubusercontent.com/1435457/233948483-22b0851b-c0d9-4ba0-82b4-5ba7993af5b4.gif) | ![clamp-2](https://user-images.githubusercontent.com/1435457/233948511-3f689958-500c-4e6a-83a2-c278cbc61b1b.gif) | Select a tuple low-high value. | [demo](http://9am.github.io/ctrl-panel/ctrl-clamp.html) |
| ctrl-switch | ![switch-1](https://user-images.githubusercontent.com/1435457/233948542-e5611014-c9c9-4b3d-a2c0-be53745bd63e.gif) | ![switch-2](https://user-images.githubusercontent.com/1435457/233948545-6b2efbe3-ae87-4602-98f8-ded0537a6cae.gif) | A ON/OFF switch. | [demo](http://9am.github.io/ctrl-panel/ctrl-switch.html) |
| ctrl-radio | ![radio-1](https://user-images.githubusercontent.com/1435457/233948532-03a2f23c-41d3-4291-b8b7-fe770750b869.gif) | ![radio-2](https://user-images.githubusercontent.com/1435457/233948528-d19f430a-9681-4658-a23b-25f4f404f8e4.gif) | Multiple/Single switch. | [demo](http://9am.github.io/ctrl-panel/ctrl-radio.html) |
| ctrl-vector | ![vector](https://user-images.githubusercontent.com/1435457/233948552-672f7051-f07a-4c4c-950c-f7c8e5ccb122.gif) | | Select a tuple vector on a 2D surface. | [demo](http://9am.github.io/ctrl-panel/ctrl-vector.html) |
| ctrl-text | ![text](https://user-images.githubusercontent.com/1435457/233948548-1088ed00-5bba-4d52-a64c-95341679c8d0.gif) | | Text input. | [demo](http://9am.github.io/ctrl-panel/ctrl-text.html) |
| ctrl-color | ![color](https://user-images.githubusercontent.com/1435457/233948524-3f5b06b2-fdbf-4586-8892-d76fc0d6cfc6.gif) | | Color picker. | [demo](http://9am.github.io/ctrl-panel/ctrl-color.html) |


## Usage

#### Install
```bash
npm install @9am/ctrl-panel
```

#### HTML
```html
<ctrl-panel theme="neumorphism">
    <ctrl-slider name="slider">slider</ctrl-slider>
    <ctrl-clamp name="clamp">clamp</ctrl-clamp>
    <ctrl-vector name="vector">vector</ctrl-vector>
    <ctrl-switch name="switch">switch</ctrl-switch>
    <ctrl-radio name="radio">
        <ctrl-switch name="a">A</ctrl-switch>
        <ctrl-switch name="b">B</ctrl-switch>
        <ctrl-switch name="c" default="true">C</ctrl-switch>
    </ctrl-radio>
    <ctrl-group name="group">
        <ctrl-text name="text">text</ctrl-text>
        <ctrl-color name="color">color</ctrl-color>
    </ctrl-group>
</ctrl-panel>
```

#### Javascript
```js
import '@9am/ctrl-panel';
// import '@9am/ctrl-panel/theme.css'; // css to enable default themes.

document.querySelector('ctrl-panel').addEventListener('CHANGE', (evt) => {
    console.log('[panel value]:', evt.currentTarget.value);
    /* output:
     * {
     *     slider: 5,
     *     clamp: [0, 10],
     *     vector: [0, 0],
     *     switch: false,
     *     radio: 'c',
     *     group: {
     *         text: '',
     *         color: '#000000'
     *     }
     * }
     */
});

```

## Documentation

### \<ctrl-group\>

| Doc | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| attribute | **`name*`** | string | **required** | value key |
| attribute | **`orientation`** | h \| v | `h` | layout direction |
| attribute | **`type`** | object \| array | `object` | value shape |
| ---- |  |  |  |  |
| property | get **`value`** | Value | `{}` | value |
| ---- |  |  |  |  |
| slot | **`label`** | html tag |  | label |
| slot | **`default`** | ctrl-* | `''` | value |

### \<ctrl-panel\>

| Doc | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| attribute | `extends <ctrl-group>` | ---- | ---- | ---- |
| attribute | **`theme`** | string | `flat` | theme (flat \| oldschool \| neumorphism) |
| attribute | **`width`** | css length | `auto` | panel width |
| attribute | **`height`** | css length | `auto` | panel height |
| attribute | **`placement`** | top-left \| top-right \| bottom-left \| bottom-right | `''` | if placement is set, panel will be positioned as fixed, and with a button to toggle the visibility. |
| ---- |  |  |  |  |
| property | `extends <ctrl-group>` | ---- | ---- | ---- |
| ---- |  |  |  |  |
| slot | `extends <ctrl-group>` | ---- | ---- | ---- |

### \<ctrl-radio\>

| Doc | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| attribute | `extends <ctrl-group>` | ---- | ---- | ---- |
| attribute | **`multiple`** | boolean | `false` | enable select multiple items |
| ---- |  |  |  |  |
| property | `extends <ctrl-group>` | ---- | ---- | ---- |
| ---- |  |  |  |  |
| slot | `extends <ctrl-group>` | ---- | ---- | ---- |
| slot | **`default`** | `ctrl-switch` | `''` | value |

### \<ctrl-slider\>

| Doc | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| attribute | **`name*`** | string | **required** | value key |
| attribute | **`orientation`** | h \| v | `h` | layout direction |
| attribute | **`type`** | range \| knob | `range` | slider type |
| attribute | **`min`** | number | `0` | min value |
| attribute | **`max`** | number | `10` | max value |
| attribute | **`step`** | number \| 'any' | `1` | step interval |
| attribute | **`default`** | number | `5` | default value |
| ---- |  |  |  |  |
| property | get **`value`** | number | `5` | value |

### \<ctrl-clamp\>

| Doc | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| attribute | `extends <ctrl-slider>` | ---- | ---- | ---- |
| attribute | **`default`** | string(JSON) | `'[0,10]'` | default value |
| ---- |  |  |  |  |
| property | `extends <ctrl-slider>` | ---- | ---- | ---- |
| property | get **`value`** | number | `[0,10]` | value |
| ---- |  |  |  |  |
| slot | `extends <ctrl-slider>` | ---- | ---- | ---- |

### \<ctrl-switch\>

| Doc | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| attribute | **`name*`** | string | **required** | value key |
| attribute | **`orientation`** | h \| v | `h` | layout direction |
| attribute | **`type`** | range \| toggle | `toggle` | slider type |
| attribute | **`default`** | boolean |  | default value |
| ---- |  |  |  |  |
| property | get **`value`** | number | `false` | value |

### \<ctrl-text\>

| Doc | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| attribute | **`name*`** | string | **required** | value key |
| attribute | **`default`** | string | `''` | default value |
| ---- |  |  |  |  |
| property | get **`value`** | number | `''` | value |

### \<ctrl-color\>

| Doc | Name | Type | Default | Description |
| --- | ---- | ---- | ------- | ----------- |
| attribute | **`name*`** | string | **required** | value key |
| attribute | **`orientation`** | h \| v | `h` | layout direction |
| attribute | **`default`** | string | `#000000` | default value |
| ---- |  |  |  |  |
| property | get **`value`** | number | `#000000` | value |

### Event

```js
{
  type: 'CHANGE',
  detail: {
    name: string, // attribute 'name' of <ctrl-*>
    value: Value, // property 'value' of <ctrl-*>
  }
}
```


## License
[MIT](LICENSE)
