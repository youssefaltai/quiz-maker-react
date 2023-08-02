import { PropsWithChildren } from "react";

export default function QuizList({ children }: PropsWithChildren) {
  return (
    <div className="quiz-list">
      {children}
    </div>
  );
}
