import * as Yup from "yup";

declare module "yup" {
  interface ObjectSchema<
    TIn extends Yup.Maybe<Yup.AnyObject>,
    TContext = Yup.AnyObject,
    TDefault = any,
    TFlags extends Yup.Flags = ""
  > {
    uniqueProperty(propertyName: string, message: string): this;
    uniqueProperties(propertyNames: [string, string][]): this;
  }

  interface NumberSchema {
    decimal(message: string): this;
  }
}

const uniquePropertyTest = function (
  value: Record<string, any>,
  propertyName: string,
  message: string
) {
  if (
    this.parent
      .filter((v: any) => v !== value)
      .some((v: any) => {
        const emptyValues = [undefined, null, ""];

        if (
          emptyValues.includes(v?.[propertyName]) ||
          emptyValues.includes(value?.[propertyName])
        )
          return false;

        return v?.[propertyName] === value?.[propertyName];
      })
  ) {
    throw this.createError({
      path: `${this.path}.${propertyName}`,
      message,
    });
  }

  return true;
};

Yup.addMethod(Yup.number, "decimal", function (message: string) {
  return this.test("decimal", message, function (value) {
    if (value != undefined) {
      return /^\d+((\.|\,)\d{0,2})?$/.test(value.toString());
    }
    return true;
  });
});

Yup.addMethod(
  Yup.object,
  "uniqueProperty",
  function (propertyName: string, message: string) {
    return this.test("unique", message, function (value) {
      return uniquePropertyTest.call(this, value, propertyName, message);
    });
  }
);

Yup.addMethod(
  Yup.object,
  "uniqueProperties",
  function (propertyNames: [string, string][]) {
    return this.test("unique", "", function (value) {
      const errors = propertyNames
        .map(([propertyName, message]) => {
          try {
            return uniquePropertyTest.call(this, value, propertyName, message);
          } catch (error) {
            return error;
          }
        })
        .filter((error) => error instanceof Yup.ValidationError);

      if (errors?.length > 0) {
        throw new Yup.ValidationError(errors);
      }

      return true;
    });
  }
);

export default Yup;
