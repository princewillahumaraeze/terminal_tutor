import { notFound } from 'next/navigation'
import LessonContent from '@/components/LessonContent'

async function getLessonData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${slug}`, { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error('Failed to fetch lesson data')
  }
  return res.json()
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons`)
  const lessons = await res.json()
  return lessons.map((lesson: { slug: string }) => ({
    slug: lesson.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const lesson = await getLessonData(params.slug)
  return {
    title: `${lesson.title} | Terminal Tutor`,
    description: lesson.description,
  }
}

export default async function LessonPage({ params }: { params: { slug: string } }) {
  let lesson
  try {
    lesson = await getLessonData(params.slug)
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <p className="mb-6">{lesson.description}</p>
      <LessonContent lesson={lesson} />
    </div>
  )
}

