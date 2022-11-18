<div align="center">
    <img alt="ctrl-panel" src="https://user-images.githubusercontent.com/1435457/202668072-2d92cdc5-e723-4b1f-bc0a-b6126d5af1ba.png" width="240" />
    <h1>ctrl-panel</h1>
    <p>A simple control panel.</p>
</div>

---

## Elements
| Element | Screenshot | Description | Live Demo |
| ------- | ---------- | ----------- | --------- |
| ctrl-panel | ---------- | ----------- | --------- |
| ctrl-group | ---------- | ----------- | --------- |
| ctrl-slider | ---------- | ----------- | --------- |
| ctrl-clamp | ---------- | ----------- | --------- |
| ctrl-switch | ---------- | ----------- | --------- |
| ctrl-radio | ---------- | ----------- | --------- |
| ctrl-vector | ---------- | ----------- | --------- |
| ctrl-text | ---------- | ----------- | --------- |
| ctrl-color | ---------- | ----------- | --------- |


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
        <ctrl-switch name="c">C</ctrl-switch>
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
// To enable default themes, load css.
// import '@9am/ctrl-panel/theme.css';

document.querySelector('ctrl-panel').addEventListener('CHANGE', (evt) => {
    console.table('CHANGE', evt.target.value);
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
| attribute | **`theme`** | string | `''` | theme (oldschool \| neumorphism) |
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
    name: string, // attribute 'name' <ctrl-*>
    value: Value, // property 'value'
  }
}
```


## License
[MIT](LICENSE)
