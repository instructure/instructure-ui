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

import React, { useState } from 'react'
import {Avatar} from '@instructure/ui-avatar'

const components = {
  Avatar:[
    <Avatar key={"key"} themeOverride={{color:"blue"}} name="Sarah Robinson" margin="0 small 0 0" />,
    <Avatar key={"key2"} name="Rarah Sobinson" margin="0 small 0 0" />],
  }
const App = () => {
  const [ renderedComponent , setRenderedComponent] = useState()

   return (
     <div style = {{display:"flex"}}>
      <div style = {{flex:1, cursor:"pointer"}}>
        {Object.keys(components).map((name)=>
          <button
            onKeyPress={()=>{}}
            style = {{
              margin: 10,
              height:30,
              borderBottom:"solid",
              borderWidth:1,
              textAlign:"center",
              lineHeight:"30px"
            }}
            key = {name}
            onClick={()=>setRenderedComponent(name)}>
            {name}
          </button>
        )}
          </div>
        <div style = {{flex:10}}>
          <h1 style = {{textAlign:"center"}}>{renderedComponent}</h1>
          {components[renderedComponent] &&components[renderedComponent][0] ? components[renderedComponent].map((component,index)=>
          <div key = {`${renderedComponent}-${index}`}>{component} <hr  /></div>):components[renderedComponent]
          }
        </div>
     </div>
   )
}

export default App
export { App }
