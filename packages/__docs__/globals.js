import React from 'react'
import ReactDOM from 'react-dom'
import IconUserLine from 'instructure-icons/lib/Line/IconUserLine'
import IconPlusSolid from 'instructure-icons/lib/Solid/IconPlusSolid'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'
import moment from 'moment'
import 'moment/min/locales'
import lorem from 'lorem-ipsum'

import avatarImage from './placeholder-avatar.png'
import iconExample from './heart_lg.svg'
import placeholderImage from './placeholder-image'

import * as UICore from '../ui-core/src'

const globals = Object.assign({
  PlaceholderIcon: IconUserLine,
  IconPlus: IconPlusSolid,
  IconX: IconXSolid,
  moment,
  avatarImage,
  iconExample,
  lorem: {
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
  },
  placeholderImage,
  React,
  ReactDOM
}, UICore)

Object.keys(globals).forEach((key) => {
  global[key] = globals[key]
})

module.exports = globals
