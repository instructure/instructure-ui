---
describes: NutritionFacts
---

This component is made to display specific AI related data in Instructure products.

```js
---
type: example
---
<div>
  <NutritionFacts
  modalLabel="This is a modal for AI facts"
  title="Nutrition Facts"
  featureName="Feature Name"
  closeButtonText="Close"
  closeIconButtonScreenReaderLabel="Close"
  triggerText="Nutrition Facts"
  data={[
    {
    blockTitle: "Model & Data",
    segmentData:[
      {
         segmentTitle: "Base Model",
        description: "The foundational AI on which further training and customizations are built.",
        value: "Value",
        valueDescription: "Description"
      },
      {
         segmentTitle: "Trained with User Data",
        description: "Indicates the AI model has been given customer data in order to improve its results.",
        value: "Value",
      },
      {
         segmentTitle: "Data Shared with Model",
        description: "Indicates which training or operational content was given to the model.",
        value: "Value",
      }
    ]
  },
  {
    blockTitle: "Privacy & Compliance",
    segmentData:[
      {
        segmentTitle: "Data Retention",
        description: "How long the model stores customer data.",
        value: "Value",
      },
      {
        segmentTitle: "Data Logging",
        description: "Recording the AI's performance for auditing, analysis, and improvement.",
        value: "Value",
      },
      {
        segmentTitle: "Regions Supported",
        description: "The locations where the AI model is officially available and supported.",
        value: "Value",
      },
      {
        segmentTitle: "PII",
        description: "Sensitive data that can be used to identify an individual.",
        value: "Value",
      },
    ]
  },
  {
    blockTitle: "Outputs",
    segmentData:[
      {
        segmentTitle: "AI Settings Control",
        description: "The ability to turn the AI on or off within the product.",
        value: "Value",
      },
      {
        segmentTitle: "Human in the Loop",
        description: "Indicates if a human is involved in the AI's process or output.",
        value: "Value",
      },
      {
        segmentTitle: "Guardrails",
        description: "Preventative safety mechanisms or limitations built into the AI model.",
        value: "Value",
      },
      {
        segmentTitle: "Expected Risks",
        description: "Any risks the model may pose to the user.",
        value: "Value",
      },
      {
        segmentTitle: "Intended Outcomes",
        description: "The specific results the AI model is meant to achieve.",
        value: "Value",
      }
    ]
  }
  ]}
   />
</div>
```
