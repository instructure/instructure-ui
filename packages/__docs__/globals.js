import React from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'
import 'moment/min/locales'
import lorem from 'lorem-ipsum'

import * as UICore from '@instructure/ui-core'
import * as UISVGImages from '@instructure/ui-svg-images'

import IconUser from '@instructure/ui-icons/lib/Line/IconUser'
import IconPlus from '@instructure/ui-icons/lib/Solid/IconPlus'
import IconX from '@instructure/ui-icons/lib/Solid/IconX'

import '@instructure/ui-icons/lib/font/Solid/InstructureIcons-Solid.css'
import '@instructure/ui-icons/lib/font/Line/InstructureIcons-Line.css'

import iconExample from '!svg-inline-loader!./heart_lg.svg' // eslint-disable-line
import avatarImage from './placeholder-avatar.png'
import placeholderImage from './placeholder-image'

const globals = Object.assign(
  {
    PlaceholderIcon: IconUser,
    IconPlus: IconPlus,
    IconX: IconX,
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
  },
  UICore,
  UISVGImages
)

Object.keys(globals).forEach((key) => {
  global[key] = globals[key]
})

module.exports = globals
