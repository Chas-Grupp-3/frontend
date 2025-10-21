import { useState } from "react";
import type { ChangeEvent } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

export function useFormValidation<T extends Record<string, unknown>>(
  validateFn: (values: T) => Errors<T>,
  initialValues?: Partial<T>
) {
  const initial = (initialValues ?? {}) as T;
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>(
    Object.keys(initial).reduce((acc, k) => ({ ...acc, [k]: false }), {})
  );

  const handleChange =
    (field: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newValues = { ...values, [field]: value } as T;
      setValues(newValues);
      setErrors(validateFn(newValues));
    };

  const handleBlur = (field: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [String(field)]: true }));
    setErrors(validateFn(values));
  };

  const handleSubmit = async (onValid: (values: T) => void | Promise<void>) => {
    const newErrors = validateFn(values);
    setErrors(newErrors);

    // ensure we mark all known fields as touched
    const allKeys = Array.from(
      new Set([...Object.keys(values), ...Object.keys(initial)])
    );
    const newTouched = allKeys.reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(newTouched);

    if (Object.keys(newErrors).length === 0) {
      await onValid(values);
    }
  };

  return {
    values,
    errors,
    touched: touched as Record<keyof T, boolean>,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  };
}
