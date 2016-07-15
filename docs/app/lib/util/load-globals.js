import React from 'react'
import ReactDOM from 'react-dom'
import placeholderImage from 'mocks/util/placeholder-image'
import { IconComposeSolid } from 'instructure-icons'
import avatarImage from 'mocks/images/placeholder-avatar.png'
import faker from 'faker'

// These need to be globals to render examples
global.placeholderImage = placeholderImage
global.PlaceholderIcon = IconComposeSolid
global.avatarImage = avatarImage
global.React = React
global.ReactDOM = ReactDOM
global.lorem = faker.lorem
