import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface FormField {
  value: any;
  error: string | null;
  touched: boolean;
  rules?: ValidationRule;
}

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) => {
  const [fields, setFields] = useState<Record<keyof T, FormField>>(() => {
    const initialFields: Record<keyof T, FormField> = {} as any;
    
    Object.keys(initialValues).forEach((key) => {
      const fieldKey = key as keyof T;
      initialFields[fieldKey] = {
        value: initialValues[fieldKey],
        error: null,
        touched: false,
        rules: validationRules[fieldKey],
      };
    });
    
    return initialFields;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((fieldName: keyof T, value: any): string | null => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return 'This field is required';
    }

    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [validationRules]);

  const setFieldValue = useCallback((fieldName: keyof T, value: any) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        error: validateField(fieldName, value),
      },
    }));
  }, [validateField]);

  const setFieldTouched = useCallback((fieldName: keyof T, touched: boolean = true) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        touched,
      },
    }));
  }, []);

  const setFieldError = useCallback((fieldName: keyof T, error: string | null) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        error,
      },
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newFields = { ...fields };

    Object.keys(fields).forEach((key) => {
      const fieldKey = key as keyof T;
      const field = fields[fieldKey];
      const error = validateField(fieldKey, field.value);
      
      newFields[fieldKey] = {
        ...field,
        error,
        touched: true,
      };

      if (error) {
        isValid = false;
      }
    });

    setFields(newFields);
    return isValid;
  }, [fields, validateField]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const values = Object.keys(fields).reduce((acc, key) => {
        const fieldKey = key as keyof T;
        acc[fieldKey] = fields[fieldKey].value;
        return acc;
      }, {} as T);

      await onSubmit?.(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, validateForm, onSubmit]);

  const reset = useCallback(() => {
    setFields(() => {
      const resetFields: Record<keyof T, FormField> = {} as any;
      
      Object.keys(initialValues).forEach((key) => {
        const fieldKey = key as keyof T;
        resetFields[fieldKey] = {
          value: initialValues[fieldKey],
          error: null,
          touched: false,
          rules: validationRules[fieldKey],
        };
      });
      
      return resetFields;
    });
    setIsSubmitting(false);
  }, [initialValues, validationRules]);

  const values = Object.keys(fields).reduce((acc, key) => {
    const fieldKey = key as keyof T;
    acc[fieldKey] = fields[fieldKey].value;
    return acc;
  }, {} as T);

  const errors = Object.keys(fields).reduce((acc, key) => {
    const fieldKey = key as keyof T;
    acc[fieldKey] = fields[fieldKey].error;
    return acc;
  }, {} as Record<keyof T, string | null>);

  const touched = Object.keys(fields).reduce((acc, key) => {
    const fieldKey = key as keyof T;
    acc[fieldKey] = fields[fieldKey].touched;
    return acc;
  }, {} as Record<keyof T, boolean>);

  const isValid = Object.values(errors).every(error => !error);
  const hasErrors = Object.values(errors).some(error => error !== null);

  return {
    values,
    errors,
    touched,
    isValid,
    hasErrors,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    validateForm,
    handleSubmit,
    reset,
  };
};