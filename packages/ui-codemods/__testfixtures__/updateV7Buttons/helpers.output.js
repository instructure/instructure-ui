/* eslint-disable */
// test if import alias is reformatted
import { Button as BBB } from '@instructure/ui-buttons'
import { Button } from 'somewhere/else'
let btn
btn = <BBB elementRef={() => {}} />
btn = <Button fluidWidth={false} />

// test if importing from @instructure/ui is OK too
import { CloseButton } from '@instructure/ui'
btn = <CloseButton elementRef={(_e) => 3} />
