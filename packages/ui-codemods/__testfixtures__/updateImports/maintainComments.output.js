/* eslint-disable */
import { Foo } from '@instructure/ui-foo'

// This comment should stay here
// This comment should be amended to the above comment
import { Bar, Qux, Baz } from '@instructure/ui-baz'

// This comment should stay here since this line isn't going away
import { Qaz } from 'instructure-ui/lib/components/Qux'

/*
 * This multiline comment
 * block should stay
 * here
 */
/*
This multline comment block
should get moved to the theme line
*/
import theme, { colors } from 'somepackage'

import { children, render } from 'anotherpackage' // This side comment should stay here // This side comment should be moved above

// This comment should also stay here
import { xor } from 'ui-prop-types'
import { elementType } from 'ui-element-type'