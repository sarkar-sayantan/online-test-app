import { Question } from "./question.model";

export class Test{
    testID: string;
    testName: string;
    timeLimitInMins: number;
    authorID: string;
    subject: string;
    dateOfCreation: Date;
    questions: Question[];
}