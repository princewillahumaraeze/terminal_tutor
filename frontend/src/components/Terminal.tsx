'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TerminalProps {
  lessonMode?: boolean
  expectedCommand?: string
  onTaskComplete?: () => void
}

export default function Terminal({ lessonMode = false, expectedCommand = '', onTaskComplete }: TerminalProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>(['Welcome to Terminal Tutor! Type a command to begin.'])

  useEffect(() => {
    if (lessonMode && expectedCommand) {
      setOutput(prev => [...prev, `Task: Enter the command "${expectedCommand}"`])
    }
  }, [lessonMode, expectedCommand])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setOutput(prev => [...prev, `$ ${input}`])

  if (lessonMode && input.trim() === expectedCommand.trim()) {
    setOutput(prev => [...prev, 'Correct! Well done.'])
    if (onTaskComplete) {
      onTaskComplete()
    }
  } else {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process_command/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "command": `${input}` }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setOutput(prev => [...prev, data.output])
    } catch (error) {
      setOutput(prev => [...prev, 'Error: Could not process command'])
    }
  }

  setInput('')
}

  return (
    <div className="w-full max-w-2xl bg-background border border-border rounded-lg shadow-lg overflow-hidden">
      <div className="bg-muted px-4 py-2 border-b border-border">
        <h2 className="text-lg font-semibold">Terminal</h2>
      </div>
      <ScrollArea className="h-[400px] p-4">
        {output.map((line, index) => (
          <pre key={index} className="whitespace-pre-wrap text-sm text-foreground">{line}</pre>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
            placeholder="Enter a command..."
            aria-label="Command input"
          />
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

