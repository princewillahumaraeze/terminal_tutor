'use client'

import { useState } from 'react'
import Terminal from '@/components/Terminal'
import { Button } from '@/components/ui/button'

interface Task {
  id: number
  description: string
  command: string
}

interface Lesson {
  title: string
  description: string
  tasks: Task[]
}

export default function LessonContent({ lesson }: { lesson: Lesson }) {
  const [currentTask, setCurrentTask] = useState(0)

  const handleNextTask = () => {
    if (currentTask < lesson.tasks.length - 1) {
      setCurrentTask(currentTask + 1)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Task:</h2>
        <p>{lesson.tasks[currentTask].description}</p>
      </div>
      <Terminal
        lessonMode={true}
        expectedCommand={lesson.tasks[currentTask].command}
        onTaskComplete={handleNextTask}
      />
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => setCurrentTask(Math.max(0, currentTask - 1))}
          disabled={currentTask === 0}
        >
          Previous Task
        </Button>
        <Button
          onClick={handleNextTask}
          disabled={currentTask === lesson.tasks.length - 1}
        >
          Next Task
        </Button>
      </div>
    </div>
  )
}

