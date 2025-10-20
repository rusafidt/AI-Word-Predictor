"use client"

import { TrainSection } from "@/components/train-section"
import { PredictSection } from "@/components/predict-section"
import { Brain, Sparkles } from "lucide-react"


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              AI Word Predictor
            </h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Train a simple AI model that predicts your next word.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <TrainSection />
          <PredictSection />
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-muted-foreground">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-6" />
          <p>Built with FastAPI & Next.js</p>
        </footer>
      </div>
    </div>
  )
}
