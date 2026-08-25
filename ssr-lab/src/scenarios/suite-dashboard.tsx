'use client'

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {
  View as vw,
  Heading as hd,
  Text as tx,
  Metric as mc,
  MetricGroup as mcg,
  ProgressBar as pb,
  ProgressCircle as pc,
  Pill as pl,
  Table as tb,
  Link as lk,
  TruncateText as tt,
  Avatar as av,
  Badge as bd,
  IconCheckLine as icl
} from '@instructure/ui/latest'

const View = vw as any
const Heading = hd as any
const Text = tx as any
const Metric = mc as any
const MetricGroup = mcg as any
const ProgressBar = pb as any
const ProgressCircle = pc as any
const Pill = pl as any
const Table = tb as any
const Link = lk as any
const TruncateText = tt as any
const Avatar = av as any
const Badge = bd as any
const IconCheckLine = icl as any

const courses = [
  ['English literature 204', 'Anna Coleman', 82],
  ['Mathematics 101', 'Ben Nagy', 64],
  ['History 300', 'Cynthia Sabo', 91],
  ['Physics 210', 'Dennis Toth', 47]
] as const

/**
 * Mixes the two failure modes on one page: cards and metrics (two-pass styles)
 * next to TruncateText and Pill (DOM measurement).
 */
export default function Scenario() {
  return (
    <View as="div" maxWidth="52rem">
      <Heading level="h1">Overview</Heading>

      <View as="div" margin="medium 0">
        <MetricGroup>
          <Metric renderLabel="Average" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
          <Metric renderLabel="Submitted" renderValue="18" />
        </MetricGroup>
      </View>

      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <ProgressCircle
          screenReaderLabel="Term progress"
          valueNow={40}
          valueMax={60}
        />
        <Badge count={12}>
          <Avatar name="Anna Coleman" size="small" />
        </Badge>
        <Pill renderIcon={<IconCheckLine />} color="success">
          Up to date
        </Pill>
      </div>

      <View as="div" maxWidth="26rem" margin="0 0 medium">
        <Text as="p">
          <TruncateText maxLines={2}>
            A longer announcement that TruncateText can only cut down to size
            after hydration, so the server sends the whole thing.
          </TruncateText>
        </Text>
      </View>

      <Table caption={() => 'Courses'} layout="auto" hover>
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="course">Course</Table.ColHeader>
            <Table.ColHeader id="teacher">Teacher</Table.ColHeader>
            <Table.ColHeader id="progress">Progress</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {courses.map(([name, teacher, progress]) => (
            <Table.Row key={name}>
              <Table.Cell>
                <Link href="#">{name}</Link>
              </Table.Cell>
              <Table.Cell>{teacher}</Table.Cell>
              <Table.Cell>
                <ProgressBar
                  size="small"
                  screenReaderLabel={`${name} progress`}
                  valueNow={progress}
                  valueMax={100}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </View>
  )
}
