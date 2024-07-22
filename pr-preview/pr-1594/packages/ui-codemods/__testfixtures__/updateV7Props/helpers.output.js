/* eslint-disable */
// test if import alias is reformatted
import { Button as BBB } from '@instructure/ui-buttons'
import { Button } from 'somewhere/else'
import { Link as LL } from '@instructure/ui'

let btn
btn = <BBB elementRef={() => {}} />
btn = <Button fluidWidth={false} />

// test if importing from @instructure/ui is OK too
import { CloseButton } from '@instructure/ui'
btn = <CloseButton elementRef={(_e) => 3} />

// this should rename it to the import alias of Link
btn = <LL href="#" isWithinText={false} />
btn = <LL href="#" isWithinText={false} />

// the spread operator here should trigger a warning
btn = <BBB color="primary" {...{ hello: 3 }} />
