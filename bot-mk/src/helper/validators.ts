import { NOT_IN_DATALIST, INVALID_DATE, FIELD_IS_EMPTY } from "./strings";

export function isEmpty(input: string): string | undefined {
  if (input?.length <= 0) return FIELD_IS_EMPTY;
  else return undefined;
}
export function isExpired(input: string): string | undefined {
  
  if (Date.now() > Date.parse(input) || !input) {
    return INVALID_DATE;
  } else undefined;
}
export function isInData(input: string, datalist: string[]) {
  if (!datalist.includes(input)) return NOT_IN_DATALIST;
}
export function validate(form: any, validators: { [key: string]: any }) {
  let errors: { [key: string]: any } = {};
  Object.entries(validators).forEach((field) => {
    let result = field[1](form[field[0]]);
    if (result != undefined) errors[field[0]] = result;
  });

  return { isValid: Object.keys(errors).length === 0, errors: errors };
}
