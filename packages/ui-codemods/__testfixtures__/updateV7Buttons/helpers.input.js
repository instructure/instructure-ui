/* eslint-disable */
// test if import alias is reformatted
import { Button as BBB } from '@instructure/ui-buttons'
import { Button } from 'somewhere/else'
import { Link as LL } from '@instructure/ui'

let btn
btn = <BBB buttonRef={() => {}} />
btn = <Button fluidWidth={false} />

// test if importing from @instructure/ui is OK too
import { CloseButton } from '@instructure/ui'
btn = <CloseButton buttonRef={(_e) => 3} />

// this should cause a new import to appear
btn = <BBB variant="link" href="#" />
btn = <BBB variant="link" href="#" />
