<div align="center">
    <img alt="ctrl-panel" src="https://user-images.githubusercontent.com/1435457/202668072-2d92cdc5-e723-4b1f-bc0a-b6126d5af1ba.png" width="240" />
    <h1>ctrl-panel</h1>
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

## Features
- **9 custom elements** to choose.
- **3 themes** out of the box.
- **Control the value shape** with the template.
- Customize or make your own theme with **CSS properties.**

## Elements
| Element | Screenshot | Description | Live Demo |
| ------- | ---------- | ----------- | --------- |
| ctrl-panel | ---------- | ----------- | --------- |
| ctrl-group | ---------- | ----------- | --------- |
| ctrl-slider | ![slider-range](https://user-images.githubusercontent.com/1435457/203936646-0902d3d7-0994-4b8a-a1a3-20a3f5269d00.gif)</br>![slider-knob](https://user-images.githubusercontent.com/1435457/203936642-73d7487f-e619-437c-a532-fde14d711480.gif) | ----------- | --------- |
| ctrl-clamp | ![clamp-range](https://user-images.githubusercontent.com/1435457/203936632-fb207779-2102-412a-9506-b41829afc0f8.gif)</br>![clamp-knob](https://user-images.githubusercontent.com/1435457/203936627-f9135d59-790e-4d53-8228-7ade10f3b73d.gif) | ----------- | --------- |
| ctrl-switch | ![switch-toggle](https://user-images.githubusercontent.com/1435457/203938021-5600c6e1-6f99-428c-99e9-66d204a5c6b0.gif)</br>![switch-range](https://user-images.githubusercontent.com/1435457/203938018-9f83e2b4-0868-4be1-a3db-a3e477b230e0.gif) | ----------- | --------- |
| ctrl-radio | ![radio](https://user-images.githubusercontent.com/1435457/203936639-a55c9232-f851-4678-ac66-3e2f1ea822cf.gif) | ----------- | --------- |
| ctrl-vector | ![vector](https://user-images.githubusercontent.com/1435457/203936657-13ca68fe-7c1b-4f6e-a2c1-e84bacfc829e.gif) | ----------- | --------- |
| ctrl-text | ![text](https://user-images.githubusercontent.com/1435457/203936654-3a78f2df-a675-43d6-a748-ee0842081067.gif) | ----------- | --------- |
| ctrl-color | ![color](https://user-images.githubusercontent.com/1435457/203936634-68099376-731f-4442-aae5-918e606c4b09.gif) | ----------- | --------- |


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
