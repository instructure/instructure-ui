"use strict";
(globalThis["webpackChunkdocs_app"] = globalThis["webpackChunkdocs_app"] || []).push([[11],{

/***/ 18011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Shared: () => (/* binding */ Shared),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14041);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11448);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var codemirror_mode_jsx_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28573);
/* harmony import */ var codemirror_mode_jsx_jsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_jsx_jsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(62977);
/* harmony import */ var codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var codemirror_mode_css_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61421);
/* harmony import */ var codemirror_mode_css_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_css_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var codemirror_mode_htmlmixed_htmlmixed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66493);
/* harmony import */ var codemirror_mode_htmlmixed_htmlmixed__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_htmlmixed_htmlmixed__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47821);
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var codemirror_mode_yaml_yaml__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24353);
/* harmony import */ var codemirror_mode_yaml_yaml__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_yaml_yaml__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(54380);
/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */




// Language modes







class Controlled extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  /** @internal */
  constructor(props) {
    super(props);
    /** @internal */
    this.appliedNext = void 0;
    /** @internal */
    this.deferred = void 0;
    /** @internal */
    this.editor = void 0;
    /** @internal */
    this.emulating = void 0;
    /** @internal */
    this.hydrated = void 0;
    /** @internal */
    this.initCb = void 0;
    /** @internal */
    this.mirror = void 0;
    /** @internal */
    this.mounted = void 0;
    /** @internal */
    this.ref = void 0;
    /** @internal */
    this.shared = void 0;
    this.appliedNext = false;
    this.deferred = null;
    this.emulating = false;
    this.hydrated = false;
    this.initCb = () => {
      if (this.props.editorDidConfigure) {
        this.props.editorDidConfigure(this.editor);
      }
    };
    this.mounted = false;
  }

  /** @internal */
  hydrate(props) {
    const _options = props && props.options ? props.options : {};
    const userDefinedOptions = Object.assign({}, (codemirror__WEBPACK_IMPORTED_MODULE_1___default().defaults), this.editor.options, _options);
    const optionDelta = Object.keys(userDefinedOptions).some(key => this.editor.getOption(key) !== userDefinedOptions[key]);
    if (optionDelta) {
      Object.keys(userDefinedOptions).forEach(key => {
        // eslint-disable-next-line no-prototype-builtins
        if (_options.hasOwnProperty(key)) {
          if (this.editor.getOption(key) !== userDefinedOptions[key]) {
            this.editor.setOption(key, userDefinedOptions[key]);
            this.mirror.setOption(key, userDefinedOptions[key]);
          }
        }
      });
    }
    if (!this.hydrated) {
      this.deferred ? this.resolveChange(props.value) : this.initChange(props.value || '');
    }
    this.hydrated = true;
  }

  /** @internal */
  initChange(value) {
    this.emulating = true;
    const doc = this.editor.getDoc();
    const lastLine = doc.lastLine();
    const lastChar = doc.getLine(doc.lastLine()).length;
    doc.replaceRange(value || '', {
      line: 0,
      ch: 0
    }, {
      line: lastLine,
      ch: lastChar
    });
    this.mirror.setValue(value);
    doc.clearHistory();
    this.mirror.clearHistory();
    this.emulating = false;
  }

  /** @internal */
  resolveChange(value) {
    this.emulating = true;
    const doc = this.editor.getDoc();
    if (this.deferred.origin === 'undo') {
      doc.undo();
    } else if (this.deferred.origin === 'redo') {
      doc.redo();
    } else {
      doc.replaceRange(this.deferred.text, this.deferred.from, this.deferred.to, this.deferred.origin);
    }
    if (value && value !== doc.getValue()) {
      const cursor = doc.getCursor();
      doc.setValue(value);
      doc.setCursor(cursor);
    }
    this.emulating = false;
    this.deferred = null;
  }

  /** @internal */
  mirrorChange(deferred) {
    const doc = this.editor.getDoc();
    if (deferred.origin === 'undo') {
      doc.setHistory(this.mirror.getHistory());
      this.mirror.undo();
    } else if (deferred.origin === 'redo') {
      doc.setHistory(this.mirror.getHistory());
      this.mirror.redo();
    } else {
      this.mirror.replaceRange(deferred.text, deferred.from, deferred.to, deferred.origin);
    }
    return this.mirror.getValue();
  }

  /** @internal */
  componentDidMount() {
    if (this.props.defineMode) {
      if (this.props.defineMode.name && this.props.defineMode.fn) {
        codemirror__WEBPACK_IMPORTED_MODULE_1___default().defineMode(this.props.defineMode.name, this.props.defineMode.fn);
      }
    }
    this.editor = codemirror__WEBPACK_IMPORTED_MODULE_1___default()(this.ref, this.props.options);
    this.shared = new Shared(this.editor, this.props);
    this.mirror = codemirror__WEBPACK_IMPORTED_MODULE_1___default()(() => {}, this.props.options);
    this.editor.on('electricInput', () => {
      this.mirror.setHistory(this.editor.getDoc().getHistory());
    });
    this.editor.on('cursorActivity', () => {
      this.mirror.setCursor(this.editor.getDoc().getCursor());
    });
    this.editor.on('beforeChange', (_cm, data) => {
      if (this.emulating) {
        return;
      }
      data.cancel();
      this.deferred = data;
      const phantomChange = this.mirrorChange(this.deferred);
      if (this.props.onBeforeChange) this.props.onBeforeChange(this.editor, this.deferred, phantomChange);
    });
    this.editor.on('change', (_cm, data) => {
      if (!this.mounted) {
        return;
      }
      if (this.props.onChange) {
        this.props.onChange(this.editor, data, this.editor.getValue());
      }
    });
    this.hydrate(this.props);
    this.shared.apply(this.props);
    this.mounted = true;
    this.shared.wire(this.props);
    if (this.editor.getOption('autofocus')) {
      this.editor.focus();
    }
    if (this.props.editorDidMount) {
      this.props.editorDidMount(this.editor, this.editor.getValue(), this.initCb);
    }
  }

  /** @internal */
  componentDidUpdate(prevProps) {
    const preserved = {
      cursor: void 0
    };
    if (this.props.value !== prevProps.value) {
      this.hydrated = false;
    }
    if (!this.props.autoCursor && this.props.autoCursor !== void 0) {
      preserved.cursor = this.editor.getDoc().getCursor();
    }
    this.hydrate(this.props);
    if (!this.appliedNext) {
      this.shared.applyNext(prevProps, this.props, preserved);
      this.appliedNext = true;
    }
    this.shared.applyUserDefined(prevProps, preserved);
  }

  /** @internal */
  componentWillUnmount() {
    if (this.props.editorWillUnmount) {
      this.props.editorWillUnmount((codemirror__WEBPACK_IMPORTED_MODULE_1___default()));
    }
  }

  /** @internal */
  shouldComponentUpdate() {
    return true;
  }

  /** @internal */
  render() {
    const className = this.props.className ? `react-codemirror2 ${this.props.className}` : 'react-codemirror2';
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: className,
      ref: self => this.ref = self
    });
  }
}
Controlled.displayName = "Controlled";
class Helper {
  static equals(x, y) {
    const ok = Object.keys,
      tx = typeof x,
      ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? ok(x).length === ok(y).length && ok(x).every(key => this.equals(x[key], y[key])) : x === y;
  }
}
class Shared {
  constructor(editor, props) {
    this.editor = void 0;
    this.props = void 0;
    this.editor = editor;
    this.props = props;
  }
  delegateCursor(position, scroll, focus) {
    const doc = this.editor.getDoc();
    if (focus) {
      this.editor.focus();
    }
    scroll ? doc.setCursor(position) : doc.setCursor(position, void 0, {
      scroll: false
    });
  }
  delegateScroll(coordinates) {
    this.editor.scrollTo(coordinates.x, coordinates.y);
  }
  delegateSelection(ranges, focus) {
    const doc = this.editor.getDoc();
    doc.setSelections(ranges);
    if (focus) {
      this.editor.focus();
    }
  }
  apply(props) {
    // init ranges
    if (props && props.selection && props.selection.ranges) {
      this.delegateSelection(props.selection.ranges, props.selection.focus || false);
    }

    // init cursor
    if (props && props.cursor) {
      this.delegateCursor(props.cursor, props.autoScroll || false, this.editor.getOption('autofocus') || false);
    }

    // init scroll
    if (props && props.scroll) {
      this.delegateScroll(props.scroll);
    }
  }
  applyNext(props, next, preserved) {
    // handle new ranges
    if (props && props.selection && props.selection.ranges) {
      if (next && next.selection && next.selection.ranges && !Helper.equals(props.selection.ranges, next.selection.ranges)) {
        this.delegateSelection(next.selection.ranges, next.selection.focus || false);
      }
    }

    // handle new cursor
    if (props && props.cursor) {
      if (next && next.cursor && !Helper.equals(props.cursor, next.cursor)) {
        this.delegateCursor(preserved.cursor || next.cursor, next.autoScroll || false, next.autoCursor || false);
      }
    }

    // handle new scroll
    if (props && props.scroll) {
      if (next && next.scroll && !Helper.equals(props.scroll, next.scroll)) {
        this.delegateScroll(next.scroll);
      }
    }
  }
  applyUserDefined(props, preserved) {
    if (preserved && preserved.cursor) {
      this.delegateCursor(preserved.cursor, props.autoScroll || false, this.editor.getOption('autofocus') || false);
    }
  }
  wire(props) {
    Object.keys(props || {}).filter(p => /^on/.test(p)).forEach(prop => {
      switch (prop) {
        case 'onBlur':
          {
            ;
            this.editor.on('blur', (_cm, event) => {
              var _this$props$onBlur, _this$props;
              (_this$props$onBlur = (_this$props = this.props).onBlur) === null || _this$props$onBlur === void 0 ? void 0 : _this$props$onBlur.call(_this$props, this.editor, event);
            });
          }
          break;
        case 'onContextMenu':
          {
            this.editor.on('contextmenu', (_cm, event) => {
              var _this$props$onContext, _this$props2;
              (_this$props$onContext = (_this$props2 = this.props).onContextMenu) === null || _this$props$onContext === void 0 ? void 0 : _this$props$onContext.call(_this$props2, this.editor, event);
            });
            break;
          }
        case 'onCopy':
          {
            this.editor.on('copy', (_cm, event) => {
              var _this$props$onCopy, _this$props3;
              (_this$props$onCopy = (_this$props3 = this.props).onCopy) === null || _this$props$onCopy === void 0 ? void 0 : _this$props$onCopy.call(_this$props3, this.editor, event);
            });
            break;
          }
        case 'onCursor':
          {
            this.editor.on('cursorActivity', () => {
              var _this$props$onCursor, _this$props4;
              (_this$props$onCursor = (_this$props4 = this.props).onCursor) === null || _this$props$onCursor === void 0 ? void 0 : _this$props$onCursor.call(_this$props4, this.editor, this.editor.getDoc().getCursor());
            });
          }
          break;
        case 'onCursorActivity':
          {
            this.editor.on('cursorActivity', () => {
              var _this$props$onCursorA, _this$props5;
              (_this$props$onCursorA = (_this$props5 = this.props).onCursorActivity) === null || _this$props$onCursorA === void 0 ? void 0 : _this$props$onCursorA.call(_this$props5, this.editor);
            });
          }
          break;
        case 'onCut':
          {
            this.editor.on('cut', (_cm, event) => {
              var _this$props$onCut, _this$props6;
              (_this$props$onCut = (_this$props6 = this.props).onCut) === null || _this$props$onCut === void 0 ? void 0 : _this$props$onCut.call(_this$props6, this.editor, event);
            });
            break;
          }
        case 'onDblClick':
          {
            this.editor.on('dblclick', (_cm, event) => {
              var _this$props$onDblClic, _this$props7;
              (_this$props$onDblClic = (_this$props7 = this.props).onDblClick) === null || _this$props$onDblClic === void 0 ? void 0 : _this$props$onDblClic.call(_this$props7, this.editor, event);
            });
            break;
          }
        case 'onDragEnter':
          {
            this.editor.on('dragenter', (_cm, event) => {
              var _this$props$onDragEnt, _this$props8;
              (_this$props$onDragEnt = (_this$props8 = this.props).onDragEnter) === null || _this$props$onDragEnt === void 0 ? void 0 : _this$props$onDragEnt.call(_this$props8, this.editor, event);
            });
          }
          break;
        case 'onDragLeave':
          {
            this.editor.on('dragleave', (_cm, event) => {
              var _this$props$onDragLea, _this$props9;
              (_this$props$onDragLea = (_this$props9 = this.props).onDragLeave) === null || _this$props$onDragLea === void 0 ? void 0 : _this$props$onDragLea.call(_this$props9, this.editor, event);
            });
            break;
          }
        case 'onDragOver':
          {
            this.editor.on('dragover', (_cm, event) => {
              var _this$props$onDragOve, _this$props0;
              (_this$props$onDragOve = (_this$props0 = this.props).onDragOver) === null || _this$props$onDragOve === void 0 ? void 0 : _this$props$onDragOve.call(_this$props0, this.editor, event);
            });
          }
          break;
        case 'onDragStart':
          {
            this.editor.on('dragstart', (_cm, event) => {
              var _this$props$onDragSta, _this$props1;
              (_this$props$onDragSta = (_this$props1 = this.props).onDragStart) === null || _this$props$onDragSta === void 0 ? void 0 : _this$props$onDragSta.call(_this$props1, this.editor, event);
            });
            break;
          }
        case 'onDrop':
          {
            this.editor.on('drop', (_cm, event) => {
              var _this$props$onDrop, _this$props10;
              (_this$props$onDrop = (_this$props10 = this.props).onDrop) === null || _this$props$onDrop === void 0 ? void 0 : _this$props$onDrop.call(_this$props10, this.editor, event);
            });
          }
          break;
        case 'onFocus':
          {
            ;
            this.editor.on('focus', (_cm, event) => {
              var _this$props$onFocus, _this$props11;
              (_this$props$onFocus = (_this$props11 = this.props).onFocus) === null || _this$props$onFocus === void 0 ? void 0 : _this$props$onFocus.call(_this$props11, this.editor, event);
            });
          }
          break;
        case 'onGutterClick':
          {
            this.editor.on('gutterClick', (_cm, lineNumber, gutter, event) => {
              var _this$props$onGutterC, _this$props12;
              (_this$props$onGutterC = (_this$props12 = this.props).onGutterClick) === null || _this$props$onGutterC === void 0 ? void 0 : _this$props$onGutterC.call(_this$props12, this.editor, lineNumber, gutter, event);
            });
          }
          break;
        case 'onInputRead':
          {
            this.editor.on('inputRead', (_cm, EditorChangeEvent) => {
              var _this$props$onInputRe, _this$props13;
              (_this$props$onInputRe = (_this$props13 = this.props).onInputRead) === null || _this$props$onInputRe === void 0 ? void 0 : _this$props$onInputRe.call(_this$props13, this.editor, EditorChangeEvent);
            });
          }
          break;
        case 'onKeyDown':
          {
            this.editor.on('keydown', (_cm, event) => {
              var _this$props$onKeyDown, _this$props14;
              (_this$props$onKeyDown = (_this$props14 = this.props).onKeyDown) === null || _this$props$onKeyDown === void 0 ? void 0 : _this$props$onKeyDown.call(_this$props14, this.editor, event);
            });
          }
          break;
        case 'onKeyHandled':
          {
            this.editor.on('keyHandled', (_cm, key, event) => {
              var _this$props$onKeyHand, _this$props15;
              (_this$props$onKeyHand = (_this$props15 = this.props).onKeyHandled) === null || _this$props$onKeyHand === void 0 ? void 0 : _this$props$onKeyHand.call(_this$props15, this.editor, key, event);
            });
          }
          break;
        case 'onKeyPress':
          {
            this.editor.on('keypress', (_cm, event) => {
              var _this$props$onKeyPres, _this$props16;
              (_this$props$onKeyPres = (_this$props16 = this.props).onKeyPress) === null || _this$props$onKeyPres === void 0 ? void 0 : _this$props$onKeyPres.call(_this$props16, this.editor, event);
            });
          }
          break;
        case 'onKeyUp':
          {
            this.editor.on('keyup', (_cm, event) => {
              var _this$props$onKeyUp, _this$props17;
              (_this$props$onKeyUp = (_this$props17 = this.props).onKeyUp) === null || _this$props$onKeyUp === void 0 ? void 0 : _this$props$onKeyUp.call(_this$props17, this.editor, event);
            });
          }
          break;
        case 'onMouseDown':
          {
            this.editor.on('mousedown', (_cm, event) => {
              var _this$props$onMouseDo, _this$props18;
              (_this$props$onMouseDo = (_this$props18 = this.props).onMouseDown) === null || _this$props$onMouseDo === void 0 ? void 0 : _this$props$onMouseDo.call(_this$props18, this.editor, event);
            });
            break;
          }
        case 'onPaste':
          {
            this.editor.on('paste', (_cm, event) => {
              var _this$props$onPaste, _this$props19;
              (_this$props$onPaste = (_this$props19 = this.props).onPaste) === null || _this$props$onPaste === void 0 ? void 0 : _this$props$onPaste.call(_this$props19, this.editor, event);
            });
            break;
          }
        case 'onRenderLine':
          {
            this.editor.on('renderLine', (_cm, line, element) => {
              var _this$props$onRenderL, _this$props20;
              (_this$props$onRenderL = (_this$props20 = this.props).onRenderLine) === null || _this$props$onRenderL === void 0 ? void 0 : _this$props$onRenderL.call(_this$props20, this.editor, line, element);
            });
            break;
          }
        case 'onScroll':
          {
            this.editor.on('scroll', _cm => {
              var _this$props$onScroll, _this$props21;
              (_this$props$onScroll = (_this$props21 = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props21, this.editor, this.editor.getScrollInfo());
            });
          }
          break;
        case 'onSelection':
          {
            this.editor.on('beforeSelectionChange', (_cm, data) => {
              var _this$props$onSelecti, _this$props22;
              (_this$props$onSelecti = (_this$props22 = this.props).onSelection) === null || _this$props$onSelecti === void 0 ? void 0 : _this$props$onSelecti.call(_this$props22, this.editor, data);
            });
          }
          break;
        case 'onTouchStart':
          {
            this.editor.on('touchstart', (_cm, event) => {
              var _this$props$onTouchSt, _this$props23;
              (_this$props$onTouchSt = (_this$props23 = this.props).onTouchStart) === null || _this$props$onTouchSt === void 0 ? void 0 : _this$props$onTouchSt.call(_this$props23, this.editor, event);
            });
            break;
          }
        case 'onUpdate':
          {
            this.editor.on('update', _cm => {
              var _this$props$onUpdate, _this$props24;
              (_this$props$onUpdate = (_this$props24 = this.props).onUpdate) === null || _this$props$onUpdate === void 0 ? void 0 : _this$props$onUpdate.call(_this$props24, this.editor);
            });
          }
          break;
        case 'onViewportChange':
          {
            this.editor.on('viewportChange', (_cm, from, to) => {
              var _this$props$onViewpor, _this$props25;
              (_this$props$onViewpor = (_this$props25 = this.props).onViewportChange) === null || _this$props$onViewpor === void 0 ? void 0 : _this$props$onViewpor.call(_this$props25, this.editor, from, to);
            });
          }
          break;
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controlled);

/***/ })

}]);