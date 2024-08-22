"use strict";(globalThis.webpackChunkdocs_app=globalThis.webpackChunkdocs_app||[]).push([[11],{18011:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Shared:()=>Shared,default:()=>__WEBPACK_DEFAULT_EXPORT__})
var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(14041),codemirror__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(11448),codemirror__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_1__)
__webpack_require__(28573),__webpack_require__(62977),__webpack_require__(61421),__webpack_require__(66493),__webpack_require__(47821),__webpack_require__(24353)
class Controlled extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.appliedNext=void 0,this.deferred=void 0,this.editor=void 0,this.emulating=void 0,this.hydrated=void 0,this.initCb=void 0,this.mirror=void 0,this.mounted=void 0,this.ref=void 0,this.shared=void 0,this.appliedNext=!1,this.deferred=null,this.emulating=!1,this.hydrated=!1,this.initCb=()=>{this.props.editorDidConfigure&&this.props.editorDidConfigure(this.editor)},this.mounted=!1}hydrate(props){const _options=props&&props.options?props.options:{},userDefinedOptions=Object.assign({},codemirror__WEBPACK_IMPORTED_MODULE_1___default().defaults,this.editor.options,_options)
Object.keys(userDefinedOptions).some((key=>this.editor.getOption(key)!==userDefinedOptions[key]))&&Object.keys(userDefinedOptions).forEach((key=>{_options.hasOwnProperty(key)&&this.editor.getOption(key)!==userDefinedOptions[key]&&(this.editor.setOption(key,userDefinedOptions[key]),this.mirror.setOption(key,userDefinedOptions[key]))})),this.hydrated||(this.deferred?this.resolveChange(props.value):this.initChange(props.value||"")),this.hydrated=!0}initChange(value){this.emulating=!0
const doc=this.editor.getDoc(),lastLine=doc.lastLine(),lastChar=doc.getLine(doc.lastLine()).length
doc.replaceRange(value||"",{line:0,ch:0},{line:lastLine,ch:lastChar}),this.mirror.setValue(value),doc.clearHistory(),this.mirror.clearHistory(),this.emulating=!1}resolveChange(value){this.emulating=!0
const doc=this.editor.getDoc()
if("undo"===this.deferred.origin?doc.undo():"redo"===this.deferred.origin?doc.redo():doc.replaceRange(this.deferred.text,this.deferred.from,this.deferred.to,this.deferred.origin),value&&value!==doc.getValue()){const cursor=doc.getCursor()
doc.setValue(value),doc.setCursor(cursor)}this.emulating=!1,this.deferred=null}mirrorChange(deferred){const doc=this.editor.getDoc()
return"undo"===deferred.origin?(doc.setHistory(this.mirror.getHistory()),this.mirror.undo()):"redo"===deferred.origin?(doc.setHistory(this.mirror.getHistory()),this.mirror.redo()):this.mirror.replaceRange(deferred.text,deferred.from,deferred.to,deferred.origin),this.mirror.getValue()}componentDidMount(){this.props.defineMode&&this.props.defineMode.name&&this.props.defineMode.fn&&codemirror__WEBPACK_IMPORTED_MODULE_1___default().defineMode(this.props.defineMode.name,this.props.defineMode.fn),this.editor=codemirror__WEBPACK_IMPORTED_MODULE_1___default()(this.ref,this.props.options),this.shared=new Shared(this.editor,this.props),this.mirror=codemirror__WEBPACK_IMPORTED_MODULE_1___default()((()=>{}),this.props.options),this.editor.on("electricInput",(()=>{this.mirror.setHistory(this.editor.getDoc().getHistory())})),this.editor.on("cursorActivity",(()=>{this.mirror.setCursor(this.editor.getDoc().getCursor())})),this.editor.on("beforeChange",((_cm,data)=>{if(this.emulating)return
data.cancel(),this.deferred=data
const phantomChange=this.mirrorChange(this.deferred)
this.props.onBeforeChange&&this.props.onBeforeChange(this.editor,this.deferred,phantomChange)})),this.editor.on("change",((_cm,data)=>{this.mounted&&this.props.onChange&&this.props.onChange(this.editor,data,this.editor.getValue())})),this.hydrate(this.props),this.shared.apply(this.props),this.mounted=!0,this.shared.wire(this.props),this.editor.getOption("autofocus")&&this.editor.focus(),this.props.editorDidMount&&this.props.editorDidMount(this.editor,this.editor.getValue(),this.initCb)}componentDidUpdate(prevProps){const preserved={cursor:void 0}
this.props.value!==prevProps.value&&(this.hydrated=!1),this.props.autoCursor||void 0===this.props.autoCursor||(preserved.cursor=this.editor.getDoc().getCursor()),this.hydrate(this.props),this.appliedNext||(this.shared.applyNext(prevProps,this.props,preserved),this.appliedNext=!0),this.shared.applyUserDefined(prevProps,preserved)}componentWillUnmount(){this.props.editorWillUnmount&&this.props.editorWillUnmount(codemirror__WEBPACK_IMPORTED_MODULE_1___default())}shouldComponentUpdate(){return!0}render(){const className=this.props.className?`react-codemirror2 ${this.props.className}`:"react-codemirror2"
return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className,ref:self=>this.ref=self})}}Controlled.displayName="Controlled"
class Helper{static equals(x,y){const ok=Object.keys,tx=typeof x
return x&&y&&"object"===tx&&tx===typeof y?ok(x).length===ok(y).length&&ok(x).every((key=>this.equals(x[key],y[key]))):x===y}}class Shared{constructor(editor,props){this.editor=void 0,this.props=void 0,this.editor=editor,this.props=props}delegateCursor(position,scroll,focus){const doc=this.editor.getDoc()
focus&&this.editor.focus(),scroll?doc.setCursor(position):doc.setCursor(position,void 0,{scroll:!1})}delegateScroll(coordinates){this.editor.scrollTo(coordinates.x,coordinates.y)}delegateSelection(ranges,focus){this.editor.getDoc().setSelections(ranges),focus&&this.editor.focus()}apply(props){props&&props.selection&&props.selection.ranges&&this.delegateSelection(props.selection.ranges,props.selection.focus||!1),props&&props.cursor&&this.delegateCursor(props.cursor,props.autoScroll||!1,this.editor.getOption("autofocus")||!1),props&&props.scroll&&this.delegateScroll(props.scroll)}applyNext(props,next,preserved){props&&props.selection&&props.selection.ranges&&next&&next.selection&&next.selection.ranges&&!Helper.equals(props.selection.ranges,next.selection.ranges)&&this.delegateSelection(next.selection.ranges,next.selection.focus||!1),props&&props.cursor&&next&&next.cursor&&!Helper.equals(props.cursor,next.cursor)&&this.delegateCursor(preserved.cursor||next.cursor,next.autoScroll||!1,next.autoCursor||!1),props&&props.scroll&&next&&next.scroll&&!Helper.equals(props.scroll,next.scroll)&&this.delegateScroll(next.scroll)}applyUserDefined(props,preserved){preserved&&preserved.cursor&&this.delegateCursor(preserved.cursor,props.autoScroll||!1,this.editor.getOption("autofocus")||!1)}wire(props){Object.keys(props||{}).filter((p=>/^on/.test(p))).forEach((prop=>{switch(prop){case"onBlur":this.editor.on("blur",((_cm,event)=>{var _this$props$onBlur,_this$props
null===(_this$props$onBlur=(_this$props=this.props).onBlur)||void 0===_this$props$onBlur||_this$props$onBlur.call(_this$props,this.editor,event)}))
break
case"onContextMenu":this.editor.on("contextmenu",((_cm,event)=>{var _this$props$onContext,_this$props2
null===(_this$props$onContext=(_this$props2=this.props).onContextMenu)||void 0===_this$props$onContext||_this$props$onContext.call(_this$props2,this.editor,event)}))
break
case"onCopy":this.editor.on("copy",((_cm,event)=>{var _this$props$onCopy,_this$props3
null===(_this$props$onCopy=(_this$props3=this.props).onCopy)||void 0===_this$props$onCopy||_this$props$onCopy.call(_this$props3,this.editor,event)}))
break
case"onCursor":this.editor.on("cursorActivity",(()=>{var _this$props$onCursor,_this$props4
null===(_this$props$onCursor=(_this$props4=this.props).onCursor)||void 0===_this$props$onCursor||_this$props$onCursor.call(_this$props4,this.editor,this.editor.getDoc().getCursor())}))
break
case"onCursorActivity":this.editor.on("cursorActivity",(()=>{var _this$props$onCursorA,_this$props5
null===(_this$props$onCursorA=(_this$props5=this.props).onCursorActivity)||void 0===_this$props$onCursorA||_this$props$onCursorA.call(_this$props5,this.editor)}))
break
case"onCut":this.editor.on("cut",((_cm,event)=>{var _this$props$onCut,_this$props6
null===(_this$props$onCut=(_this$props6=this.props).onCut)||void 0===_this$props$onCut||_this$props$onCut.call(_this$props6,this.editor,event)}))
break
case"onDblClick":this.editor.on("dblclick",((_cm,event)=>{var _this$props$onDblClic,_this$props7
null===(_this$props$onDblClic=(_this$props7=this.props).onDblClick)||void 0===_this$props$onDblClic||_this$props$onDblClic.call(_this$props7,this.editor,event)}))
break
case"onDragEnter":this.editor.on("dragenter",((_cm,event)=>{var _this$props$onDragEnt,_this$props8
null===(_this$props$onDragEnt=(_this$props8=this.props).onDragEnter)||void 0===_this$props$onDragEnt||_this$props$onDragEnt.call(_this$props8,this.editor,event)}))
break
case"onDragLeave":this.editor.on("dragleave",((_cm,event)=>{var _this$props$onDragLea,_this$props9
null===(_this$props$onDragLea=(_this$props9=this.props).onDragLeave)||void 0===_this$props$onDragLea||_this$props$onDragLea.call(_this$props9,this.editor,event)}))
break
case"onDragOver":this.editor.on("dragover",((_cm,event)=>{var _this$props$onDragOve,_this$props10
null===(_this$props$onDragOve=(_this$props10=this.props).onDragOver)||void 0===_this$props$onDragOve||_this$props$onDragOve.call(_this$props10,this.editor,event)}))
break
case"onDragStart":this.editor.on("dragstart",((_cm,event)=>{var _this$props$onDragSta,_this$props11
null===(_this$props$onDragSta=(_this$props11=this.props).onDragStart)||void 0===_this$props$onDragSta||_this$props$onDragSta.call(_this$props11,this.editor,event)}))
break
case"onDrop":this.editor.on("drop",((_cm,event)=>{var _this$props$onDrop,_this$props12
null===(_this$props$onDrop=(_this$props12=this.props).onDrop)||void 0===_this$props$onDrop||_this$props$onDrop.call(_this$props12,this.editor,event)}))
break
case"onFocus":this.editor.on("focus",((_cm,event)=>{var _this$props$onFocus,_this$props13
null===(_this$props$onFocus=(_this$props13=this.props).onFocus)||void 0===_this$props$onFocus||_this$props$onFocus.call(_this$props13,this.editor,event)}))
break
case"onGutterClick":this.editor.on("gutterClick",((_cm,lineNumber,gutter,event)=>{var _this$props$onGutterC,_this$props14
null===(_this$props$onGutterC=(_this$props14=this.props).onGutterClick)||void 0===_this$props$onGutterC||_this$props$onGutterC.call(_this$props14,this.editor,lineNumber,gutter,event)}))
break
case"onInputRead":this.editor.on("inputRead",((_cm,EditorChangeEvent)=>{var _this$props$onInputRe,_this$props15
null===(_this$props$onInputRe=(_this$props15=this.props).onInputRead)||void 0===_this$props$onInputRe||_this$props$onInputRe.call(_this$props15,this.editor,EditorChangeEvent)}))
break
case"onKeyDown":this.editor.on("keydown",((_cm,event)=>{var _this$props$onKeyDown,_this$props16
null===(_this$props$onKeyDown=(_this$props16=this.props).onKeyDown)||void 0===_this$props$onKeyDown||_this$props$onKeyDown.call(_this$props16,this.editor,event)}))
break
case"onKeyHandled":this.editor.on("keyHandled",((_cm,key,event)=>{var _this$props$onKeyHand,_this$props17
null===(_this$props$onKeyHand=(_this$props17=this.props).onKeyHandled)||void 0===_this$props$onKeyHand||_this$props$onKeyHand.call(_this$props17,this.editor,key,event)}))
break
case"onKeyPress":this.editor.on("keypress",((_cm,event)=>{var _this$props$onKeyPres,_this$props18
null===(_this$props$onKeyPres=(_this$props18=this.props).onKeyPress)||void 0===_this$props$onKeyPres||_this$props$onKeyPres.call(_this$props18,this.editor,event)}))
break
case"onKeyUp":this.editor.on("keyup",((_cm,event)=>{var _this$props$onKeyUp,_this$props19
null===(_this$props$onKeyUp=(_this$props19=this.props).onKeyUp)||void 0===_this$props$onKeyUp||_this$props$onKeyUp.call(_this$props19,this.editor,event)}))
break
case"onMouseDown":this.editor.on("mousedown",((_cm,event)=>{var _this$props$onMouseDo,_this$props20
null===(_this$props$onMouseDo=(_this$props20=this.props).onMouseDown)||void 0===_this$props$onMouseDo||_this$props$onMouseDo.call(_this$props20,this.editor,event)}))
break
case"onPaste":this.editor.on("paste",((_cm,event)=>{var _this$props$onPaste,_this$props21
null===(_this$props$onPaste=(_this$props21=this.props).onPaste)||void 0===_this$props$onPaste||_this$props$onPaste.call(_this$props21,this.editor,event)}))
break
case"onRenderLine":this.editor.on("renderLine",((_cm,line,element)=>{var _this$props$onRenderL,_this$props22
null===(_this$props$onRenderL=(_this$props22=this.props).onRenderLine)||void 0===_this$props$onRenderL||_this$props$onRenderL.call(_this$props22,this.editor,line,element)}))
break
case"onScroll":this.editor.on("scroll",(_cm=>{var _this$props$onScroll,_this$props23
null===(_this$props$onScroll=(_this$props23=this.props).onScroll)||void 0===_this$props$onScroll||_this$props$onScroll.call(_this$props23,this.editor,this.editor.getScrollInfo())}))
break
case"onSelection":this.editor.on("beforeSelectionChange",((_cm,data)=>{var _this$props$onSelecti,_this$props24
null===(_this$props$onSelecti=(_this$props24=this.props).onSelection)||void 0===_this$props$onSelecti||_this$props$onSelecti.call(_this$props24,this.editor,data)}))
break
case"onTouchStart":this.editor.on("touchstart",((_cm,event)=>{var _this$props$onTouchSt,_this$props25
null===(_this$props$onTouchSt=(_this$props25=this.props).onTouchStart)||void 0===_this$props$onTouchSt||_this$props$onTouchSt.call(_this$props25,this.editor,event)}))
break
case"onUpdate":this.editor.on("update",(_cm=>{var _this$props$onUpdate,_this$props26
null===(_this$props$onUpdate=(_this$props26=this.props).onUpdate)||void 0===_this$props$onUpdate||_this$props$onUpdate.call(_this$props26,this.editor)}))
break
case"onViewportChange":this.editor.on("viewportChange",((_cm,from,to)=>{var _this$props$onViewpor,_this$props27
null===(_this$props$onViewpor=(_this$props27=this.props).onViewportChange)||void 0===_this$props$onViewpor||_this$props$onViewpor.call(_this$props27,this.editor,from,to)}))}}))}}const __WEBPACK_DEFAULT_EXPORT__=Controlled}}])
