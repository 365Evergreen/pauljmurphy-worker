import React, { useState, useEffect } from 'react';
import { FieldConfig } from '../../types/formConfig';
import styles from './DynamicForm.module.css';

interface DynamicFormProps {
  /** The remote endpoint URL hosting the JSON configuration */
  configUrl: string;
  /** Callback execution when the user submits valid data */
  onSubmitSuccess: (data: Record<string, any>) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ configUrl, onSubmitSuccess }) => {
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch configuration at runtime to avoid rebuilds
 useEffect(() => {
  let isMounted = true;

  async function loadFormSchema() {
    try {
      setLoading(true);
      const response = await fetch(configUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to retrieve form schema configuration.');
      
      const schemaData = await response.json();
      
      if (isMounted) {
        // Extract the array out of the Form.io root object structure safely
        const fieldConfigurations: any[] = schemaData.components || [];
        
        setFields(fieldConfigurations);
        
        // Initialize state dynamically based on the nested array loops
        const initialValues: Record<string, any> = {};
        fieldConfigurations.forEach((field) => {
          // Look for 'key' (Form.io standard) fallback to 'id'
          const fieldId = field.key || field.id; 
          if (fieldId) {
            initialValues[fieldId] = field.defaultValue ?? '';
          }
        });
        
        setFormData(initialValues);
        setError(null);
      }
    } catch (err: any) {
      if (isMounted) setError(err.message || 'An unexpected error occurred.');
    } finally {
      if (isMounted) setLoading(false);
    }
  }

  loadFormSchema();
  return () => { isMounted = false; };
}, [configUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess(formData);
  };

  if (loading) return <div className="form-loader">Loading layout specifications...</div>;
  if (error) return <div className="form-error">Configuration Error: {error}</div>;

  return (
    <form onSubmit={handleFormSubmit} className={styles.formContainer}>
      {fields.map((field) => (
        <div key={field.id} className={styles.fieldGroup}>
          <label htmlFor={field.id} className={styles.label}>
            {field.label}
            {field.validation?.required && <span className={styles.requiredStar}>*</span>}
          </label>

          {field.type === 'select' ? (
            <select
              id={field.id}
              name={field.id}
              value={formData[field.id] ?? ''}
              onChange={handleChange}
              required={field.validation?.required}
              className={styles.selectField}
            >
              <option value="">Select option...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] ?? ''}
              onChange={handleChange}
              required={field.validation?.required}
              pattern={field.validation?.pattern}
              className={styles.inputField}
            />
          )}
        </div>
      ))}

      <button type="submit" className={styles.submitButton}>
        Submit Data
      </button>
    </form>
  );
};
