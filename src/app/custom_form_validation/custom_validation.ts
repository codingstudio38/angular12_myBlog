import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export class CustomValidators {
  static message = {
    fieldIsRequired: 'Field is required',
    fieldIsInvalid: 'Field is invalid',
    maxLength: (l: number) => `Maximum string length of ${l} exceeded.`,
    minLength: (l: number) => `Minimum string length of ${l} required.`,
    positiveNumberOnly: 'Positive numbers only',
  };

  static min(min: number, errorMessage: string | null = null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      const returnData =
        !isNaN(value) && value < min
          ? {
              min: { min: min, actual: control.value },
              message: errorMessage || CustomValidators.message.fieldIsRequired,
            }
          : null;

      return returnData;
    };
  }

  static max(max: number, errorMessage: string | null = null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value > max
        ? {
            max: { max: max, actual: control.value },
            message: errorMessage || CustomValidators.message.fieldIsRequired,
          }
        : null;
    };
  }

  static mustBePositiveNumber(errorMessage: string | null = null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return +control.value <= 0
        ? {
            mustBePositiveNumber: true,
            message: errorMessage || CustomValidators.message.fieldIsInvalid,
          }
        : null;
    };
  }

  static greaterThan(
    value: number,
    errorMessage: string | null = null
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return +control.value > value
        ? null
        : {
            greaterThan: true,
            message: errorMessage || CustomValidators.message.fieldIsInvalid,
          };
    };
  }

  static minLength(
    minLength: number,
    errorMessage: string | null = null
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const length: number = control.value ? control.value.length : 0;
      return length < minLength
        ? {
            minlength: {
              requiredLength: minLength,
              actualLength: length,
            },
            message:
              errorMessage || CustomValidators.message.minLength(minLength),
          }
        : null;
    };
  }

  static maxLength(
    maxLength: number,
    errorMessage: string | null = null
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      return length > maxLength
        ? {
            maxlength: {
              requiredLength: maxLength,
              actualLength: length,
            },
            message:
              errorMessage || CustomValidators.message.maxLength(maxLength),
          }
        : null;
    };
  }

  static hobbies(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      if (length <= 0) {
        return { invalid: true, message: errorMessage };
      } else {
        return null;
      }
    };
  }

  static required(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return isEmptyInputValue(control.value)
        ? {
            invalid: true,
            message: errorMessage,
          }
        : null;
    };
  }

  static checkarraylength(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length <= 0) {
        return { invalid: true, message: errorMessage };
      } else {
        return null;
      }
    };
  }

  static invalidfile(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
       return { invalid: true, message: errorMessage };
    };
  }
  static filevalidation(
    errorMessage: string,
    filetype: any,
    mb: number
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(isEmptyInputValue(control.value)){
        return { invalid: true, message: errorMessage };
      }
      if (control.value.length <= 0) {
        return { invalid: true, message: errorMessage };
      } 
    // const fileis = event.target.files[0];
    // const filetype = event.target.files[0].type;
    // const filesize: number = event.target.files[0].size;
        return null;
     };
  }

  static namecheck(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validName = new RegExp('[a-zA-Z ]+$');
      if (isEmptyInputValue(control.value)) {
        return { invalid: true, message: errorMessage };
      } else if (!control.value.match(validName)) {
        return { invalid: true, message: 'Allow only alphabets(a-z,A-Z)' };
      } else {
        return null;
      }
    };
  }

  static emailcheck(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validEmailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (isEmptyInputValue(control.value)) {
        return { invalid: true, message: errorMessage };
      } else if (!control.value.match(validEmailRegex)) {
        return { invalid: true, message: 'Enter a valid email id' };
      } else {
        return null;
      }
    };
  }

  static phonecheck(
    errorMessage: string,
    min: number,
    max: number
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      const validNumberRegex = /^[0-9]+$/; //Validators.pattern('[0-9]+$')
      if (isEmptyInputValue(control.value)) {
        return { invalid: true, message: errorMessage };
      } else if (!control.value.match(validNumberRegex)) {
        return { invalid: true, message: 'Allow only numbers' };
      } else if (length < min) {
        return {
          invalid: { requiredLength: min, actualLength: length },
          message: `Maximum length is ${min}`,
        };
      } else if (length > max) {
        return {
          invalid: { requiredLength: max, actualLength: length },
          message: `Maximum length is ${max}`,
        };
      } else {
        return null;
      }
    };
  }

  static passwordcheck(
    errorMessage: string,
    min: number,
    max: number
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      if (isEmptyInputValue(control.value)) {
        return { invalid: true, message: errorMessage };
      } else if (length < min) {
        return {
          invalid: { requiredLength: min, actualLength: length },
          message: `Maximum length is ${min}`,
        };
      } else if (length > max) {
        return {
          invalid: { requiredLength: max, actualLength: length },
          message: `Maximum length is ${max}`,
        };
      } else {
        return null;
      }
    };
  }
}
