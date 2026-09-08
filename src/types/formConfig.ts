export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio';

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;         // Regex pattern as a string string (e.g., "^[0-9]{4}$")
  customMessage?: string;   // Error message override
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface FieldConfig {
  /** Unique key for the form state object */
  id: string;
  
  /** HTML input type to toggle rendering blocks */
  type: FieldType;
  
  /** Display label text */
  label: string;
  
  /** Input placeholder string (where applicable) */
  placeholder?: string;
  
  /** Initial default value for state setup */
  defaultValue?: string | number | boolean | string[];
  
  /** Available choices for 'select', 'radio', or multiple 'checkbox' types */
  options?: SelectOption[];
  
  /** Built-in HTML5 or custom validation constraints */
  validation?: ValidationRules;
  
  /** Layout styling triggers (e.g., width configuration) */
  gridSpan?: number;
}