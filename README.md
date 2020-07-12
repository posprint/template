# POS Print Template

## Introduction

JSX template for POS print.

## API

### dydrate

```javascript
dydrate(template, style, data, context);
```

- template: the template string.
- style: style object referenced in the template.
- data: data object referenced in the template.
- context: context object referenced in the template.

Returns a hydrated dom tree.

### precompile

```javascript
precompile(template);
```

- template: the template string.

Returns the precompiled code ready for hydrate.

## Template example

```xml
<root charset="utf-8" isa="esc">
  <text>Hello, world!</text>
</root>
```

## Tags in template

### root

Should be the only root node of the template.

```xml
<root
  charset="utf-8|GB2312|GB18030..."
  isa="esc|tsc"
>
  ...
</root>
```

- charset (required): sepcify the charset for printer and the template (no charactor beyond the charset scope).
- isa (required): the instruction set architecture of the printer. Currently `esc` and `tsc` are avialable.

### text

```xml
<text
  [margin-position="none|bottom|left|right"]
  [margin-size="[0-255]"]
  [align="left|center|right"]
  [font-family="a|b|c"]
  [font-style="normal|b|i|u|u2|bi|biu|biu2|bu|bu2|iu|iu2"]
  [font-size="normal|wide|high|wide-high"]
  [text-spacing="default|[0-255]"]
  [color="normal|red|reverse"]
>
  Hello, world!
</text>
```

### qrcode

```xml
<qrcode
  [align="left|center|right"]
  [margin="default|[0-255]"]
  [size="normal|wide|high|wide-high"]
>
  https://www.example.com
</qrcode>
```

### img

```xml
<img
  format="bmp|png|jpg"
  [size="normal|wide|high|wide-high"]
  [align="left|center|right"]
>
  iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=
</img>
```

### table

```xml
<table
  columns-width="4,2,1,1"
  columns-align="left,center,right,right"
  columns-overflow="wrap,ellipse,hidden,hidden"
  [font-family="a|b|c"]
  [font-style="normal|b|i|u|u2|bi|biu|biu2|bu|bu2|iu|iu2"]
  [font-size="normal|wide|high|wide-high"]
  [text-spacing="default|[0-255]"]
  [color="normal|red|reverse"]
>
  <tr
    [font-family="a|b|c"]
    [font-style="normal|b|i|u|u2|bi|biu|biu2|bu|bu2|iu|iu2"]
    [font-size="normal|wide|high|wide-high"]
    [text-spacing="default|[0-255]"]
    [color="normal|red|reverse"]
  >
    <td [align="inherit|left|center|right"]>abcdefg</td>
    <td [align="inherit|left|center|right"]>abc</td>
    <td [align="inherit|left|center|right"]>abc</td>
    <td [align="inherit|left|center|right"]>abc</td>
  </tr>
</table>
```

### separator

```xml
<separator char="-|=|.|..." />
```

### blank

```xml
<blank lines="1..." />
```

### command

```xml
<command cmd="cut|open-cash-box" />
```
 
### text for tsc

```xml
<text
  [margin-position="none|bottom|left|right"]
  [margin-size="[0-255]"]
  [align="left|center|right"]
  [font-family="1|2|3|4|5|TSS24.BF2|TSS16.BF2"]
  [font-size="normal|wide|high|wide-high"]
  [rotation="0|90|180|270"]
>
  Hello, world!
</text>
```

### lr-text (unimplemented)

```xml
<lr-text>
  <text>A</text>
  <text>B</text>
</lr-text>
```

### separator for tsc

```xml
<separator char="-|=|.|..." />
```
