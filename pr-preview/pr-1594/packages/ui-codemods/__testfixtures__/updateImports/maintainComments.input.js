/* eslint-disable */
import Foo from 'instructure-ui/lib/components/Foo'

// This comment should stay here
import { Bar } from 'instructure-ui/lib/components/Bar'

// This comment should be amended to the above comment
import { Baz } from 'instructure-ui/lib/components/Baz'

// This comment should stay here since this line isn't going away
import { Qux, Qaz } from 'instructure-ui/lib/components/Qux'

/*
 * This multiline comment
 * block should stay
 * here
 */
import theme from 'somepackage/lib/components/theme'
/*
This multline comment block
should get moved to the theme line
*/
import colors from 'somepackage/lib/components/colors'

import { children } from 'anotherpackage/lib/children' // This side comment should stay here
import { render } from 'anotherpackage/lib/render' // This side comment should be moved above

// This comment should also stay here
import { elementType, xor } from 'ui-prop-types'
