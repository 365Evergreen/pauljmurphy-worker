import React from 'react';
import { DynamicForm } from '../../components/DynamicForm/DynamicForm';
import styles from './RegistrationPage.module.css';
import CopilotTest from '../../components/copilottest';

export const FormRegistrationPage: React.FC = () => {
  // Point to where your runtime JSON configuration file is hosted
  const JSON_SCHEMA_URL = 'src/components/GetInTouch/ContactForm.json';

  const handleFormSubmission = (formData: Record<string, any>) => {
    console.log('Ingested Dynamic Form Data Payload:', formData);
    
    // Proactively send data to your data destination API route here
    // e.g., fetch('/api/submissions', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>System Access Registration</h1>
        <p className={styles.subtitle}>
          Please fill out the form below. Configuration changes updated in the schema file will reflect instantly without a system rebuild.
        </p>
      </header>

      <main className={styles.contentArea}>
        <DynamicForm 
          configUrl={JSON_SCHEMA_URL} 
          onSubmitSuccess={handleFormSubmission} 
        />

        <CopilotTest />
      </main>
    </div>
  );
};

export default FormRegistrationPage;
