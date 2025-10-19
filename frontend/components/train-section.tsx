"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Brain } from "lucide-react"

export function TrainSection() {
  const [trainingText, setTrainingText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [vocabSize, setVocabSize] = useState<number | null>(null)
  const { toast } = useToast()

  const handleTrain = async () => {
    console.log("[v0] Train button clicked")
    console.log("[v0] Training text:", trainingText)

    if (!trainingText.trim()) {
      console.log("[v0] Training text is empty")
      toast({
        title: "Error",
        description: "Please provide some training text.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trainingText }),
      })

      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response ok:", response.ok)

      if (!response.ok) {
        throw new Error("Failed to train model")
      }

      const data = await response.json()
      console.log("[v0] Response data:", data)

      setVocabSize(data.new_vocab_size || null)

      toast({
        title: "Success!",
        description: data.message || "Model trained successfully!",
      })
    } catch (error) {
      console.error("[v0] Training error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to train model",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      console.log("[v0] Training complete, loading state reset")
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 animate-fade-in-up">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <CardTitle className="text-2xl">Train the Model</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Provide some text so the model can learn word patterns.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your training text here... The more text you provide, the better the model will learn patterns."
          value={trainingText}
          onChange={(e) => setTrainingText(e.target.value)}
          className="min-h-[200px] resize-none bg-secondary/50 border-border/50 focus:border-primary/50 transition-colors"
        />
        <Button
          onClick={handleTrain}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Training...
            </>
          ) : (
            "Train Model"
          )}
        </Button>
        {vocabSize !== null && (
          <div className="p-3 rounded-lg bg-secondary/50 border border-border/50 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Vocabulary size: <span className="text-foreground font-semibold">{vocabSize}</span> words
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
