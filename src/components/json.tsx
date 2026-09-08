import  { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';

// 1. Your code requires zero changes when these external JSON files change
const externalDataSchema: JsonSchema = {
  type: 'object',
  properties: {
    fullName: { type: 'string', minLength: 3, title: "Full Name" },
    role: { type: 'string', enum: ['Admin', 'User', 'Guest'] },
  },
  required: ['fullName'],
};

// Optional layout file: controls columns, ordering, or visibility without code
const externalUiSchema: UISchemaElement = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/fullName' },
    { type: 'Control', scope: '#/properties/role' },
  ],
};

export default function DynamicFormEngine() {
  const [formData, setFormData] = useState<unknown>({});

  const handleFormChange = ({ data }: { data: unknown }) => {
    setFormData(data);
  };

  const onSubmit = () => {
    // Cast the runtime data to your expected type safely for internal operations
    console.log("Submitted Type-Safe Data:", formData);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <JsonForms
        schema={externalDataSchema}
        uischema={externalUiSchema}
        data={formData}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={handleFormChange}
      />
      <button onClick={onSubmit} style={{ marginTop: '15px' }}>
        Submit Form
      </button>
    </div>
  );
}
