import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import styles from './SchemaForm.module.css';

interface SchemaFormProps {
  schema: JsonSchema;
  uiSchema?: UISchemaElement;
  initialData?: unknown;
  onSubmit: (data: unknown) => void;
}

export default function SchemaForm({ schema, uiSchema, initialData = {}, onSubmit }: SchemaFormProps) {
  const [formData, setFormData] = useState<unknown>(initialData);

  const handleFormChange = ({ data }: { data: unknown }) => {
    setFormData(data);
  };

  return (
    <div className={styles.formContainer}>
      <JsonForms
        schema={schema}
        uischema={uiSchema}
        data={formData}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={handleFormChange}
      />
      <button 
        type="button" 
        className={styles.submitButton} 
        onClick={() => onSubmit(formData)}
      >
        Save Configuration
      </button>
    </div>
  );
}
