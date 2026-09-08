import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import type { UISchemaElement } from '@jsonforms/core';

import schema from '../forms/employee.schema.json';
import uischema from '../forms/employee.uischema.json';

function CopilotTest() {
  const [data, setData] = useState({});
  const uiSchema = uischema as UISchemaElement;

  return (
    <JsonForms
      schema={schema}
      uischema={uiSchema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={({ data }) => setData(data)}
    />
  );
}

export default CopilotTest;