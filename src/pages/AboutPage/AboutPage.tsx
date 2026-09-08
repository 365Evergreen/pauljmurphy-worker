import React from 'react'
import styles from "./AboutPage.module.css";
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import SchemaForm from '../../components/SchemaForm/SchemaForm';

// 1. Define or fetch the layout & structures (zero code changes needed here when modified)
const dataSchema: JsonSchema = {
  type: 'object',
  properties: {
    connectionName: { type: 'string', title: 'Connection Name', minLength: 3 },
    endpointUrl: { type: 'string', title: 'Endpoint URL', format: 'uri' },
    environment: { type: 'string', enum: ['Development', 'Staging', 'Production'] }
  },
  required: ['connectionName', 'endpointUrl']
};

const uiSchema: UISchemaElement = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/connectionName' },
    { type: 'Control', scope: '#/properties/endpointUrl' },
    { type: 'Control', scope: '#/properties/environment' }
  ]
};

const AboutPage = () => {

  const handleFormSubmit = (finalData: unknown) => {
    console.log('Sending type-safe payload to backend:', finalData);
    // Execute API mutations, state updates, or automated workflows here
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.pageContent}>
        <h2>About Pauli</h2>
        <div className={styles.formTestContainer}>
          <SchemaForm
            schema={dataSchema}
            uiSchema={uiSchema}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};


export default AboutPage