type Answer = {
  order: number;
  answer: string;
}

type Quiz = {
  id: string;
  name: string;
  timer: number;
  question: string;
  answers: Answer[];
  correctAnswer: number;
}

export function quizFromJson(json: any): Quiz {
  return {
    id: json._id,
    name: json.name,
    timer: json.timer,
    question: json.question,
    answers: json.answers.map((answer: any) => {
      return {
        order: answer.order,
        answer: answer.answer,
      };
    }),
    correctAnswer: json.correctAnswer
  };
}

export default Quiz;
