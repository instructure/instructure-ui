---

category: packages

---



## emotion

The [Emotion design library's](https://emotion.sh/) implementation in Instructure UI.

### Elements
 ```EmotionThemeProvider``` is a React component, which wraps Emotion's own ```ThemeProvider```.
#### Usage
It can be used in two ways.
Once on the top level, providing the theme for the whole application.
It accepts a ```theme``` prop, which should be an Instructure UI theme.
```jsx
import App from  './App'
import { EmotionThemeProvider } from  "@instructure/emotion"
import { canvas, canvasHighContrast } from  "@instructure/ui-themes"

const  RenderApp = () => {
return (
<EmotionThemeProvider theme={canvasHighContrast}>
	<App/>
</EmotionThemeProvider>
)}
```
Secondly it can be used in any place in the component tree in order to override the above defined themes. In this case, you should provide the same structure as the original theme, but you may include only the parts, you intend to override.
You can override things in three major way.
You can override the theme variables for every theme
 ```jsx
import SomeOtherComponent from  './SomeOtherComponent'
import { EmotionThemeProvider } from  "@instructure/emotion"
import { canvas, canvasHighContrast } from  "@instructure/ui-themes"

const  SomeComponentUnderApp = () => {
const themeOverride = {
	colors:{
		textAlert:"pink"
	}
}

return (
<EmotionThemeProvider theme={themeOverride}>
	<SomeOtherComponent/>
</EmotionThemeProvider>
)}
```
You also can override a specific theme only. The example below will override textInfo color to pink but only for canvas theme.
  ```jsx
import SomeOtherComponent from  './SomeOtherComponent'
import { EmotionThemeProvider } from  "@instructure/emotion"
import { canvas, canvasHighContrast } from  "@instructure/ui-themes"

const  SomeComponentUnderApp = () => {
const themeOverride = {
	themes:{
		canvas:{
			colors:{
				textAlert:"pink"
			}
		}
	}
}

return (
<EmotionThemeProvider theme={themeOverride}>
	<SomeOtherComponent/>
</EmotionThemeProvider>
)}
```
Lastly, you can override specific component style variables (found in styles.js for every component)
```jsx
import SomeOtherComponent from  './SomeOtherComponent'
import { EmotionThemeProvider } from  "@instructure/emotion"
import { canvas, canvasHighContrast } from  "@instructure/ui-themes"

const  SomeComponentUnderApp = () => {
const themeOverride = {
components:{
	Avatar:{
		color:"yellow"
	}
}

return (
<EmotionThemeProvider theme={themeOverride}>
	<SomeOtherComponent/>
</EmotionThemeProvider>
)}
```
You can combine class specific overrides with component specific ones
  ```jsx
import SomeOtherComponent from  './SomeOtherComponent'
import { EmotionThemeProvider } from  "@instructure/emotion"
import { canvas, canvasHighContrast } from  "@instructure/ui-themes"

const  SomeComponentUnderApp = () => {
const themeOverride = {
	themes:{
		canvas:{
			components:{
				Avatar:{
					color:"yellow"
					}
				}
				colors:{
					textAlert:"pink"
				}
			}
		}
}

return (
<EmotionThemeProvider theme={themeOverride}>
	<SomeOtherComponent/>
</EmotionThemeProvider>
)}
```

## Temporary component migration guide

### Goal
Migrate components from themeable-based  to emotion-based styling

### Migration steps

#### 1.
You need to create a ```styles.js``` file next to the ```theme.js``` and ```styles.css```. You will use the content of the two and merge into one style generator file.
You should write and export a ```function``` named ```generateStyle```

```js
/**
 * Generates the style object from the theme and provided additional informations
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Oject}      The final style object, which will be used in the component
 */
const generateStyle = (theme, themeOverride, props, state) => {

	//the name of the theme
	const  themeName=theme.key

	//if any styling should depend on the theme itself, this object should specify it
	const  themeSpecificStlye = {
		"canvas-high-contrast":{
			primaryColor:  'red',
		},
		canvas:{
			primaryColor:  'blue',
		}
	}
	//maps the theme variables to component specific style variables, and overrides it with theme and user specified overrides
	const  fromTheme = {
		primaryColor:  theme?.colors?.textBrand,
		infoColor:  theme?.colors?.anotherColor,
		background:  theme?.colors?.backgroundLightest,
		...themeSpecificStlye[themeName],
		...themeOverride
	}

	//optional mappings can be provided based on - for example - props
	const  colorStyles = {
		primary: {
			color:  fromTheme.primaryColor,
			fontSize:"20px"
		},
		info: {
			color:  fromTheme.infoColor,
		},
	}

	//return with the css you'd like to apply to the component
	return {
		root:{
			display:  "block",
			background:  fromTheme.background,
			boxSizing:  "border-box",
			...colorStyles[color]
		},
		anotherClass:{
			color: "green"
			background:  fromTheme.infoColor,
		}
	}
}
export default generateStyle
```

#### 2.
Refactor the component to functional component. Any style logic that may take place inside it, you should move to the above mentioned ```styles.js```.

```js
/** @jsx jsx */
import { jsx, css } from  '@emotion/core'
import  React, {useState} from  'react'
import { useStyle, EmotionThemeProvider } from  "@instructure/emotion"
import  generateStyle  from  "./styles"

const  MyComponent = (props) => {


const  styles = useStyle(Avatar.name,generateStyle, themeOverride, props, {...anyStateYouNeed})}
//...
//very
//important
//component
//stuff
//...
return (
	<div css={styles.root}>
		{//Magnificent content}
		<div css={styles.anotherClass}>
			{//Content that needs additional class to style}
		</div>
	</div>
)
```

[![npm][npm]][npm-url]

[![build-status][build-status]][build-status-url]

[![MIT License][license-badge]][LICENSE]

[![Code of Conduct][coc-badge]][coc]



A UI component library made by Instructure Inc.



### Installation



```sh

yarn add @instructure/emotion

```



[npm]: https://img.shields.io/npm/v/@instructure/emotion.svg

[npm-url]: https://npmjs.com/package/@instructure/emotion



[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master

[build-status-url]: https://travis-ci.org/instructure/instructure-ui  "Travis CI"



[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square

[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE



[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square

[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
