/* eslint-disable */
import { Button } from '@instructure/ui-buttons'

let btn
btn = <Button />
btn = <Button buttonRef={() => {}} />
btn = <Button fluidWidth={false} />
btn = <Button fluidWidth={btn} />
btn = <Button fluidWidth={true} />
btn = <Button fluidWidth someOtherAtt={4}/>
btn = <Button fluidWidth textAlign="center" />
btn = <Button icon={SomeIcon} />
