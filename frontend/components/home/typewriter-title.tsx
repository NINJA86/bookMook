"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type TypewriterTitleProps = {
  words: string[];
  className?: string;
};

const TYPING_DELAY = 90;
const ERASING_DELAY = 45;
const HOLD_DELAY = 1700;

export function TypewriterTitle({ words, className }: TypewriterTitleProps) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!safeWords.length) {
      return;
    }

    const currentWord = safeWords[wordIndex % safeWords.length];
    const completedWord = displayText === currentWord;
    const completedDeletion = displayText.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          if (completedWord) {
            setIsDeleting(true);
            return;
          }

          setDisplayText(currentWord.slice(0, displayText.length + 1));
          return;
        }

        if (!completedDeletion) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
          return;
        }

        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % safeWords.length);
      },
      completedWord && !isDeleting ? HOLD_DELAY : isDeleting ? ERASING_DELAY : TYPING_DELAY
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, safeWords, wordIndex]);

  return (
    <span className={cn("inline-flex min-h-[1.2em] items-center", className)} aria-live="polite">
      <span>{displayText}</span>
      <span className="ml-1 inline-block h-[0.95em] w-[2px] animate-pulse bg-primary" aria-hidden="true" />
    </span>
  );
}
