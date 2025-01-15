import { NextResponse } from 'next/server'

const lessonData = {
  'intro-to-cli': {
    title: 'Introduction to the Command Line',
    description: 'Learn the basics of interacting with the command line interface.',
    tasks: [
      { id: 1, description: 'Type "hello" to greet the terminal', command: 'hello' },
      { id: 2, description: 'Use the "echo" command to print a message', command: 'echo "Hello, World!"' },
      { id: 3, description: 'Try the "date" command to see the current date and time', command: 'date' },
    ],
  },
  'file-system-navigation': {
    title: 'Navigating the File System',
    description: 'Learn how to navigate through directories using the command line.',
    tasks: [
      { id: 1, description: 'Use "pwd" to print the current working directory', command: 'pwd' },
      { id: 2, description: 'List the contents of the current directory with "ls"', command: 'ls' },
      { id: 3, description: 'Change to the home directory using "cd ~"', command: 'cd ~' },
    ],
  },
  // Add more lessons here
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  const lesson = lessonData[slug as keyof typeof lessonData]

  if (!lesson) {
    return new NextResponse('Lesson not found', { status: 404 })
  }

  return NextResponse.json(lesson)
}

