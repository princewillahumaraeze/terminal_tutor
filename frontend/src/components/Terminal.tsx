'use client'

import React, { useState} from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Terminal(){
    const [input, setInput] = useState('')
    const [output, setOutput] = useState<string[]>(['Welcome to Terminal Tutor! Type a command to begin.'])

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setOutput(prev => [...prev, `$ ${input}`])

        try {
            const response = await fetch('/api/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({command: input}),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            setOutput(prev => [...prev, data.output])
        }   catch (error) {
            setOutput(prev => [...prev, 'Error: Could not process command'])
        }
        setInput('')
    }

    return (
       <div className="w-full max-w-2xl bg-black text-green-400 p-4 rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto mb-4">
        {output.map((line, index) => (
          <pre key={index} className="whitespace-pre-wrap">{line}</pre>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent border-green-400 text-green-400"
          placeholder="Enter a command..."
        />
        <Button type="submit" className="bg-green-400 text-black hover:bg-green-500">
          Submit
        </Button>
      </form>
    </div>
  )

}
