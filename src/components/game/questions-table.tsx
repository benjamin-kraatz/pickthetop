"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Question } from "~/lib/game-types";
import { cn } from "~/lib/utils";

interface QuestionsTableProps {
  questions: Question[];
  showAnswers?: boolean;
  topAnswers?: string[];
}

export function QuestionsTable({
  questions,
  showAnswers = false,
  topAnswers = [],
}: QuestionsTableProps) {
  const normalizedTopAnswers = topAnswers.map((a) => a.toLowerCase().trim());

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Nr.</TableHead>
            <TableHead>Frage</TableHead>
            {showAnswers && <TableHead className="w-48">Antwort</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.id}</TableCell>
              <TableCell>{question.text}</TableCell>
              {showAnswers && (
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "rounded py-0.5",
                      normalizedTopAnswers.includes(
                        question.answer.toLowerCase().trim(),
                      ) && "font-medium text-green-700",
                    )}
                  >
                    {question.answer}
                  </span>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
