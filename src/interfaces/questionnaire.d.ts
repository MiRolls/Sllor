export interface Questionnaire {
    //main interface
    title: string;
    // the title of questionnaire
    questions: (RadioCheckboxAndSelect | InputAndTextarea | Slider)[];
}

export interface QuestionOrigin {
    title: string;
    type: "radio" | "checkbox" | "input" | "textarea" | "select" | "slider";
    // use tag name, easier for develop
}

export interface RadioCheckboxAndSelect extends QuestionOrigin {
    type: "radio" | "checkbox" | "select";
    options: string[];
    // options look like["orange","apple","banana"]
}

export interface InputAndTextarea extends QuestionOrigin {
    type: "input" | "textarea";
    placeholder: string;
    // <input placeholder="" type="text">
}

export interface Slider extends QuestionOrigin {
    type: "slider";
    range: [number, number];
    unit: number;
}

export interface Question {
    type: "radio" | "checkbox" | "input" | "textarea" | "select" | "slider";
    title: string;
    options?: string[];
    placeholder?: string;
    range?: [number, number];
    unit?: number;
}
export type QuestionType = "radio" | "checkbox" | "input" | "textarea" | "select" | "slider";
