// for loading examples in codepen
import React from 'react'
import ReactDOM from 'react-dom'

import IconComposeSolid from 'instructure-icons/lib/Solid/IconComposeSolid'
import IconPlusSolid from 'instructure-icons/lib/Solid/IconPlusSolid'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

import lorem from 'lorem-ipsum' // eslint-disable-line import/no-extraneous-dependencies

import moment from 'moment' // eslint-disable-line import/no-extraneous-dependencies
import 'moment/min/locales' // eslint-disable-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import * as InstUI from 'instructure-ui'

import placeholderImage from './util/placeholder-image'

import avatarImage from './images/placeholder-avatar.png'

Object.keys(InstUI).forEach(function (component) {
  global[component] = InstUI[component]
})

// These need to be globals to render examples
global.placeholderImage = placeholderImage
global.PlaceholderIcon = IconComposeSolid
global.IconPlus = IconPlusSolid
global.IconX = IconXSolid
global.avatarImage = avatarImage
global.React = React
global.ReactDOM = ReactDOM
global.lorem = {
  sentence () {
    return lorem({
      count: 1,
      units: 'sentences'
    })
  },
  paragraph () {
    return lorem({
      count: 1,
      units: 'paragraphs'
    })
  },
  paragraphs (count) {
    return lorem({
      count: count || Math.floor(Math.random() * 10),
      units: 'paragraphs'
    })
  }
}
global.moment = moment
