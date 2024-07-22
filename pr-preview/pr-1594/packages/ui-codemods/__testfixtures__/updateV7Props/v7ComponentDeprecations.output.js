/* eslint-disable */
// these just result in warnings
import { DeprecatedButton } from '@instructure/ui-buttons'
import { Media } from '@instructure/ui-byline'
import { MetricsList } from '@instructure/ui-metric'
import { Position } from '@instructure/ui-position'
import { Progress } from '@instructure/ui-progress'
// add here something so there is test output
import { Heading } from '@instructure/ui-heading'

const a = (
  <p>
    <DeprecatedButton />
    <Media />
    <MetricsList />
    <Position>
      <Position.Content />
      <Position.Target />
    </Position>
    <Progress />
    <Heading>abc</Heading>
  </p>
)
