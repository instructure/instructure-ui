---
title: Writing Docs
category: Contributor Guides
order: 6
---

# How To Write Docs

This page documents how to add and maintain documentation.

## Overview

The documentation site is generated from the **source code** and the `.md` files. There are two types of `.md` files: `README.md` and `named-md-files.md`, under the `docs folder`.

The **source code** is parsed with [JSDoc](https://jsdoc.app/) and it inprocides `type` information for the docs.

The docs can be written in `markdown`, with some added flavor, so the docs can handle special code-display cases.

## Special Mardown Rules

The only special markdown part is the `codeblock`. It can be displayed in several different ways.

### 1. code

If a code example is needed with syntax highlighting:

````md
---
type: code
---

    ```js
    ---
    type: code
    ---
    console.log("my js example comes here")
    ```
````

The above code will display like this:

```js
---
type: code
---
console.log("my js example comes here")
```

Most common languages can be used for syntax highlight, such as `jsx`, `bash` or `md`

### 2. embed

The `type: embed` will render the containing code into the page. It must be valid `javascript`

````md
---
type: code
---

    ```js
    ---
    type: embed
    ---
    <Button>InstUI button</Button>
    ```
````

The above code will display like this:

```jsx
---
type: embed
---
<Button>InstUI button</Button>
```

**_Note:_** you can use any instUI components in the examples

### 3. example

The most complex type is the `type: example`. It will render as the `embed` did, but it also provides access to the code, which is editable and the changes reflect on the rendered view immediately.

There are two ways these examples can be written.

In the first example, a valid `ReactNode` is enough and the docs system will take care of the rendering.
In the second example, a whole `component` is needed and it must be `rendered` with the built in `render` method at the very end of the example

##### Example for ReactNode

````md
---
type: code
---

    ```js
    ---
    type: example
    ---
    <div>
        <Avatar name="Sarah Robinson" src={avatarSquare} margin="0 small 0 0" />
        <Avatar name="Sarah Robinson" margin="0 small 0 0" />
        <Avatar name="Sarah Robinson" renderIcon={<IconGroupLine />} margin="0 small 0 0" />
        <Avatar name="Kyle Montgomery" src={avatarSquare} shape="rectangle" margin="0 small 0 0" />
        <Avatar name="Kyle Montgomery" shape="rectangle" margin="0 small 0 0" />
        <Avatar name="Kyle Montgomery" renderIcon={<IconGroupLine />} shape="rectangle" />
    </div>
    ```
````

The above code will display like this:

```js
---
type: example
---
<div>
    <Avatar name="Sarah Robinson" src={avatarSquare} margin="0 small 0 0" />
    <Avatar name="Sarah Robinson" margin="0 small 0 0" />
    <Avatar name="Sarah Robinson" renderIcon={<IconGroupLine />} margin="0 small 0 0" />
    <Avatar name="Kyle Montgomery" src={avatarSquare} shape="rectangle" margin="0 small 0 0" />
    <Avatar name="Kyle Montgomery" shape="rectangle" margin="0 small 0 0" />
    <Avatar name="Kyle Montgomery" renderIcon={<IconGroupLine />} shape="rectangle" />
</div>
```

##### Example for Component

````md
---
type: code
---

    ```js
    ---
    type: example
    ---
    class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        selected: "",
        colors: [
            "#ffffff",
            "#0CBF94",
            "#0C89BF00",
            "#BF0C6D",
            "#BF8D0C",
            "#ff0000",
            "#576A66",
            "#35423A",
            "#35423F",
        ],
        };
    }

    render() {
        return (
        <div>
            <ColorPreset
            label="Choose a color"
            colors={this.state.colors}
            selected={this.state.selected}
            onSelect={(selected) => this.setState({ selected })}
            />
        </div>
        );
    }
    }


    render(<Example />);
    ```
````

The above code will display like this:

```js
---
type: example
---
class Example extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    selected: "",
    colors: [
        "#ffffff",
        "#0CBF94",
        "#0C89BF00",
        "#BF0C6D",
        "#BF8D0C",
        "#ff0000",
        "#576A66",
        "#35423A",
        "#35423F",
    ],
    };
}

render() {
    return (
    <div>
        <ColorPreset
        label="Choose a color"
        colors={this.state.colors}
        selected={this.state.selected}
        onSelect={(selected) => this.setState({ selected })}
        />
    </div>
    );
    }
}

render(<Example />);
```

**_Note:_** you can use `funcional React` as well.

### 4. Multi example

If an example should be shown in `class` and `function` form as well, it needs to be written as a `list` with two items.

````md
---
type: code
---

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        counter: 0
      }
    }

    render() {
      return (
        <div>
          <Button
            onClick={() => this.setState({ counter: this.state.counter + 1 })}
          >
            I was Clicked {this.state.counter} times
          </Button>
        </div>
      )
    }
  }

  render(<Exmple />)
  ```

- ```js
  const Example = () => {
    const [counter, setCounter] = useState(0)

    return (
      <div>
        <Button onClick={() => setCounter(counter + 1)}>
          I was Clicked {counter} times
        </Button>
      </div>
    )
  }

  render(<Exmple />)
  ```
````

The above code will display like this:

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        counter: 0
      }
    }

    render() {
      return (
        <div>
          <Button
            onClick={() => this.setState({ counter: this.state.counter + 1 })}
          >
            I was Clicked {this.state.counter} times
          </Button>
        </div>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [counter, setCounter] = useState(0)

    return (
      <div>
        <Button onClick={() => setCounter(counter + 1)}>
          I was Clicked {counter} times
        </Button>
      </div>
    )
  }

  render(<Example />)
  ```

**_Note:_** beacuse of this feature, code examples can not be displayed by `lists`

### 5. comment examples

`JSDoc` can parse `markdown` even in the comments of `js/ts files`. These `comment-based examples` can not contain `front-matter`:

```text
---
type: code
---
---
key: value
---
```

This means that it can not get a `type`. The `docs` can display list-based, tabbable options as described at the 4th point.

The other three can be postfixed after the language of the markdown code block:

````text
---
type: code
---
    ```js-code
    // code here
    ```

    ```js-embed
    // code here
    ```

    ```js-example
    // code here
    ```
````

The compiler will strip the postfix and calculate the language and type from it as well.

## Named files

Under the docs folder, there are additional folders, which are containing `.md` files, which are for general documentation. These need a `frontmatter`:

```md
---
type: code
---

---

title: Writing Docs
category: Contributor Guides
order: 6

---
```

The `title` will be used as the name of the menuitem in the docs page.

The `order` will determine the order under the `category` it's placed

The `category` is the category under which the doc will be palced in the menu tree. If you want to add another `category`, you have to register it in two places:

`packages/__docs__/src/Search/index.tsx` for the search function to work and

`packages/__docs__/src/Nav/index.tsx` to determine the order of the categories

## Additional information

There are automatically generated parts of the documentation, such as:

- Table of content
- Properties
- Default Theme Variables
- Usage
