export class Question{
    questionID: string;
    questionText: string;
    questionType: string;
    marks: number;
    isMcq: boolean;
    options: string[];
    correctOption: string;
    testID: string;
    authorID: string;
}