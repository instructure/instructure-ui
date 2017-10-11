import PropTypes from 'prop-types'

export const LibraryPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  version: PropTypes.string,
  repository: PropTypes.string,
  author: PropTypes.string,
  codepen: PropTypes.object // eslint-disable-line react/forbid-prop-types
})

export const DocPropType = PropTypes.shape({
  props: PropTypes.object,
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  undocumented: PropTypes.bool,
  srcPath: PropTypes.string,
  srcUrl: PropTypes.string,
  requirePath: PropTypes.string,
  packageName: PropTypes.string,
  children: PropTypes.array
})
