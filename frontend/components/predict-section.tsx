"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sparkles } from "lucide-react"

interface Suggestion {
  word: string
  probability: number
}

interface PredictionResponse {
  context_tail: string[]
  suggestions: Suggestion[]
}

export function PredictSection() {
  const [sentence, setSentence] = useState("")
  const [topK, setTopK] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResponse | null>(null)
  const { toast } = useToast()

  const handlePredict = async () => {
    if (!sentence.trim()) {
      toast({
        title: "Error",
        description: "Please enter a sentence.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: sentence, top_k: topK }),
      })

      if (!response.ok) {
        throw new Error("Failed to get predictions")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get predictions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 animate-fade-in-up [animation-delay:100ms]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle className="text-2xl">Predict Next Word</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Enter a sentence and get top predicted next words.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sentence" className="text-sm font-medium">
            Sentence
          </Label>
          <Input
            id="sentence"
            placeholder="the model predicts"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            className="bg-secondary/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="topK" className="text-sm font-medium">
            Number of predictions
          </Label>
          <Input
            id="topK"
            type="number"
            min={1}
            max={20}
            value={topK}
            onChange={(e) => setTopK(Number.parseInt(e.target.value) || 5)}
            className="bg-secondary/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
        <Button
          onClick={handlePredict}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            "Predict"
          )}
        </Button>

        {result && (
          <div className="space-y-4 p-4 rounded-lg bg-secondary/50 border border-border/50 animate-fade-in">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Context:</p>
              <div className="flex flex-wrap gap-2">
                {result.context_tail.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-foreground font-medium text-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-3">Predicted Words:</p>
              <div className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 transition-all duration-300"
                  >
                    {/* Probability bar background */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 transition-all duration-500"
                      style={{ width: `${suggestion.probability * 100}%` }}
                    />

                    {/* Content */}
                    <div className="relative flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">
                          {suggestion.word}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">
                            {(suggestion.probability * 100).toFixed(2)}%
                          </div>
                          <div className="text-xs text-muted-foreground">confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
