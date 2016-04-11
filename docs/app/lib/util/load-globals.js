import React from 'react'
import placeholderImage from 'mocks/util/placeholder-image'
import avatarImage from 'mocks/images/placeholder-avatar.png'
import faker from 'faker'

// These need to be globals to render examples
global['placeholderImage'] = placeholderImage
global['avatarImage'] = avatarImage
global.React = React
global.lorem = faker.lorem
