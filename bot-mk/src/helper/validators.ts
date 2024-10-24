import { reactive, ref } from "vue";
import { NOT_IN_DATALIST, INVALID_DATE, FIELD_IS_EMPTY } from "./strings";

export function isEmpty(input: any, field?: string): string | undefined {
  if (field) {
    if (!input) return undefined;
    return input[field].length > 0 ? undefined : FIELD_IS_EMPTY;
  }
  return input ? undefined : FIELD_IS_EMPTY;
}
export function isExpired(input: string): string | undefined {
  return !input || Date.now() > Date.parse(input) ? INVALID_DATE : undefined;
}
export function isInData(input: string, datalist: string[]) {
  return datalist?.includes(input) ? undefined : NOT_IN_DATALIST;
}

export function validate(form: any, validators: { [key: string]: any[] }) {
  const errors: { [key: string]: any } = {};
  Object.entries(validators).forEach(([field, validatorFuncs]) => {
    const fieldValue = form[field];
    const runValidator = (validator: any, value: any) => {
      if (typeof validator === "function") {
        return validator(value);
      } else if (Array.isArray(validator)) {
        const [func, ...args] = validator;
        return func(value, ...args);
      }
      return undefined;
    };

    if (Array.isArray(fieldValue)) {
      errors[field] = fieldValue.map((item: any) => {
        const lastValidator = validatorFuncs[validatorFuncs.length - 1];
        const itemError = runValidator(lastValidator, item);
        return itemError;
      });

      if (
        errors[field].filter((val: string) => val !== undefined).length === 0
      ) {
        delete errors[field];
      }
    } else {
      const lastValidator = validatorFuncs[validatorFuncs.length - 1];
      const fieldError = runValidator(lastValidator, fieldValue);
      if (fieldError !== undefined) errors[field] = fieldError;
    }
  });

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
