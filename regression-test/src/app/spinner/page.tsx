'use client'
import React from 'react'
import { Spinner, Text, View } from '@instructure/ui/latest'

const SIZES = ['x-small', 'small', 'medium', 'large'] as const

function Row({
  variant
}: {
  variant: 'default' | 'inverse' | 'ai' | 'ai-inverse'
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {SIZES.map((size) => (
        <Spinner
          key={size}
          renderTitle={`Loading ${variant} ${size}`}
          variant={variant}
          size={size}
        />
      ))}
    </div>
  )
}

export default function SpinnerPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/*
        The spinner animates forever, so a screenshot would catch a different
        frame every run and always count as a diff. Pausing keeps the animation
        styles in the page but freezes every spinner on its first frame.
      */}
      <style>{`.axe-test * { animation-play-state: paused !important; }`}</style>

      <div>
        <Text>default</Text>
      </div>
      <Row variant="default" />

      <div>
        <Text>inverse</Text>
      </div>
      <View background="primary-inverse" as="div" padding="small">
        <Row variant="inverse" />
      </View>

      <div>
        <Text>ai</Text>
      </div>
      <Row variant="ai" />

      <div>
        <Text>ai-inverse</Text>
      </div>
      <View background="primary-inverse" as="div" padding="small">
        <Row variant="ai-inverse" />
      </View>
    </main>
  )
}
