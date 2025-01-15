import Link from 'next/link'
import {Button} from "@/components/ui/button";


const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/`)
const lessons = await data.json()


export default function LessonsPage(){
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terminal Tutor Lessons</h1>
            <div className="grid gap-4">
                {lessons.map((lesson) => (
                    <div key={lesson.id}
                         className="border border-border rounded-lg p-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">{lesson.title}</h2>
                        <Button asChild>
                            <Link href={`/lessons/${lesson.slug}`}>Start Lesson</Link>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
