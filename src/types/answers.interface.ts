export interface AnswersLocal {
  type:     string;
  name:     string;
  message:  string;
  default?: number;
  choices?: Choice[];
  namesOfInput: NamesOfValues;
}

export interface Choice {
  value: string;
  name:  string;
}

enum NamesOfValues {
  font_size = "font_size",
  opacity = "opacity"
}

enum E {
  hello = "hello",
  world = "world"
};
