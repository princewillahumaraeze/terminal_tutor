import { NextResponse } from 'next/server'

const lessons = [
  { id: 1, title: 'Introduction to the Command Line', slug: 'intro-to-cli' },
  { id: 2, title: 'Navigating the File System', slug: 'file-system-navigation' },
  { id: 3, title: 'Working with Files and Directories', slug: 'files-and-directories' },
  { id: 4, title: 'Basic Text Manipulation', slug: 'text-manipulation' },
]

export async function GET() {
  return NextResponse.json(lessons)
}

