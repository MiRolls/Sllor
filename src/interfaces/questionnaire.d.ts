export interface Questionnaire {
    //main interface
    title: string;
    // the title of questionnaire
    questions: (RadioCheckboxAndSelect | InputAndTextarea | Slider)[];
}

export interface Question {
    title: string;
    type: "radio" | "checkbox" | "input" | "textarea" | "select" | "slider";
    // use tag name, easier for develop
}

export interface RadioCheckboxAndSelect extends Question {
    type: "radio" | "checkbox" | "select";
    options: string[];
    // options look like["orange","apple","banana"]
}

export interface InputAndTextarea extends Question {
    type: "input" | "textarea";
    placeholder: string;
    // <input placeholder="" type="text">
}

export interface Slider extends Question {
    type: "slider";
    range: [number, number];
    unit: number;
}

export type QuestionType = "radio" | "checkbox" | "input" | "textarea" | "select" | "slider";
