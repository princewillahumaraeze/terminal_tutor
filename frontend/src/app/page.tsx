import Terminal from '@/components/Terminal'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-8 text-center">Terminal Tutor</h1>
      <Terminal />
    </main>
  )
}
