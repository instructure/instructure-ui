# AiInformation


This component is made to display specific AI related data in Instructure products.

This component is composed from

- `NutritionFacts`
- `DataPermissionLevels`

It copies their API exactly, with their name as prefix (e.g.: dataPermissionLevels' `title` becomes `dataPermissionLevelsTitle`). This leads to some redundancy of the data, but makes it easier to use the component.

```js
---
type: example
readonly: true
---
<div>
 <AiInformation
  trigger={<Button>AI information</Button>}
  title="Features"
  data={[
    {
      featureName: "Feature name",
      privacyNoticeText: "AI Privacy Notice",
      privacyNoticeUrl: "https://www.instructure.com/policies/artificial-intelligence-privacy",
      permissionLevelText: "Permission Level",
      permissionLevel: "Level 1",
      description: "We leverage anonymized aggregate data for detailed analytics to inform model development and product improvements. No AI models are used at this level.",
      permissionLevelsModalTriggerText: "Permission Levels",
      modelNameText: "Base Model",
      modelName: "Claude 3 Haiku",
      nutritionFactsModalTriggerText: "AI Nutrition Facts"
      }
  ]}

  dataPermissionLevelsTitle="Data Permission Levels"
  dataPermissionLevelsCurrentFeatureText="Current Feature:"
  dataPermissionLevelsCurrentFeature="Feature name"
  dataPermissionLevelsCloseIconButtonScreenReaderLabel="Close"
  dataPermissionLevelsCloseButtonText="Close"
  dataPermissionLevelsModalLabel="This is a Data Permission Levels modal"
  dataPermissionLevelsTriggerText="Data Permission Levels"
  dataPermissionLevelsData={[
    {
    level: "Level 1",
    title: "Descriptive Analytics and Research",
    description: "We leverage anonymized aggregate data for detailed analytics to inform model development and product improvements. No AI models are used at this level.",
    highlighted:true
  },
    {
    level: "Level 2",
    title: "AI-Powered Features Without Data Training",
    description: "We utilize off-the-shelf AI models and customer data as input to provide AI-powered features. No data is used for training this model."
  },
    {
    level: "Level 3",
    title: "AI Customization for Individual Institutions",
    description: "We customize AI solutions tailored to the unique needs and resources of educational institutions. We use customer data to fine-tune data and train AI models that only serve your institution. Your institution’s data only serves them through trained models."
  },
    {
    level: "Level 4",
    title: "Collaborative AI Consortium",
    description: "We established a consortium with educational institutions that shares anonymized data, best practices, and research findings. This fosters collaboration and accelerates the responsible development of AI in education. Specialized AI models are created for better outcomes in education, cost savings, and more."
  },
  ]}

  nutritionFactsModalLabel="This is a modal for AI facts"
  nutritionFactsTitle="Nutrition Facts"
  nutritionFactsFeatureName="Feature Name"
  nutritionFactsCloseButtonText="Close"
  nutritionFactsCloseIconButtonScreenReaderLabel="Close"
  nutritionFactsTriggerText="Nutrition Facts"
  nutritionFactsData={[
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

### Small Viewport

For mobile and other small viewport devices, modals should be fullscreen. Set the `fullscreenModals` prop to make them so.

```js
---
type: example
readonly: true
---
<div>
 <AiInformation
  fullscreenModals
  trigger={<Button>AI information</Button>}
  title="Features"
  data={[
    {
      featureName: "Feature name",
      privacyNoticeText: "AI Privacy Notice",
      privacyNoticeUrl: "https://www.instructure.com/policies/artificial-intelligence-privacy",
      permissionLevelText: "Permission Level",
      permissionLevel: "Level 1",
      description: "We leverage anonymized aggregate data for detailed analytics to inform model development and product improvements. No AI models are used at this level.",
      permissionLevelsModalTriggerText: "Permission Levels",
      modelNameText: "Base Model",
      modelName: "Claude 3 Haiku",
      nutritionFactsModalTriggerText: "AI Nutrition Facts"
      }
  ]}

  dataPermissionLevelsTitle="Data Permission Levels"
  dataPermissionLevelsCurrentFeatureText="Current Feature:"
  dataPermissionLevelsCurrentFeature="Feature name"
  dataPermissionLevelsCloseIconButtonScreenReaderLabel="Close"
  dataPermissionLevelsCloseButtonText="Close"
  dataPermissionLevelsModalLabel="This is a Data Permission Levels modal"
  dataPermissionLevelsTriggerText="Data Permission Levels"
  dataPermissionLevelsData={[
    {
    level: "Level 1",
    title: "Descriptive Analytics and Research",
    description: "We leverage anonymized aggregate data for detailed analytics to inform model development and product improvements. No AI models are used at this level.",
    highlighted:true
  },
    {
    level: "Level 2",
    title: "AI-Powered Features Without Data Training",
    description: "We utilize off-the-shelf AI models and customer data as input to provide AI-powered features. No data is used for training this model."
  },
    {
    level: "Level 3",
    title: "AI Customization for Individual Institutions",
    description: "We customize AI solutions tailored to the unique needs and resources of educational institutions. We use customer data to fine-tune data and train AI models that only serve your institution. Your institution’s data only serves them through trained models."
  },
    {
    level: "Level 4",
    title: "Collaborative AI Consortium",
    description: "We established a consortium with educational institutions that shares anonymized data, best practices, and research findings. This fosters collaboration and accelerates the responsible development of AI in education. Specialized AI models are created for better outcomes in education, cost savings, and more."
  },
  ]}

  nutritionFactsModalLabel="This is a modal for AI facts"
  nutritionFactsTitle="Nutrition Facts"
  nutritionFactsFeatureName="Feature Name"
  nutritionFactsCloseButtonText="Close"
  nutritionFactsCloseIconButtonScreenReaderLabel="Close"
  nutritionFactsTriggerText="Nutrition Facts"
  nutritionFactsData={[
    {
    blockTitle: "Model & Data",
    segmentData:[
      {
         segmentTitle: "Base Model",
        description: "The foundational AI on which further training and customizations are built.",
        value: "Value",
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| AiInformation | title | `string` | Yes | - | i18n text for the title of popover |
| AiInformation | data | `{ featureName: string privacyNoticeText: string privacyNoticeUrl: string permissionLevelText: string permissionLevel: string description: string permissionLevelsModalTriggerText: string modelNameText: string modelName: string nutritionFactsModalTriggerText: string }[]` | Yes | - | the data structure of the Features on the popover |
| AiInformation | fullscreenModals | `boolean` | No | `false` | sets the modal size to 'fullscreen' for NutritionFacts and DataPermissionLevels. Used for small viewports |
| AiInformation | trigger | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | Yes | - | The element that triggers the popover |
| AiInformation | dataPermissionLevelsModalLabel | `DataPermissionLevelsProps['modalLabel']` | Yes | - | i18n text for the label of the dataPermissionLevels modal |
| AiInformation | dataPermissionLevelsTitle | `DataPermissionLevelsProps['title']` | Yes | - | i18n text for the dataPermissionLevels title |
| AiInformation | dataPermissionLevelsData | `DataPermissionLevelsProps['data']` | Yes | - | i18n text for the "model and data" heading of the dataPermissionLevels |
| AiInformation | dataPermissionLevelsCloseButtonText | `DataPermissionLevelsProps['closeButtonText']` | Yes | - | i18n text for the dataPermissionLevels close button |
| AiInformation | dataPermissionLevelsCloseIconButtonScreenReaderLabel | `DataPermissionLevelsProps['closeIconButtonScreenReaderLabel']` | Yes | - | i18n text for the dataPermissionLevels close iconButton |
| AiInformation | dataPermissionLevelsCurrentFeatureText | `DataPermissionLevelsProps['currentFeatureText']` | Yes | - | i18n text for the dataPermissionLevels "current feature" text |
| AiInformation | dataPermissionLevelsCurrentFeature | `DataPermissionLevelsProps['currentFeature']` | Yes | - | i18n text for the dataPermissionLevels current feature |
| AiInformation | nutritionFactsModalLabel | `NutritionFactsProps['modalLabel']` | Yes | - | i18n text for the NutritionFacts label of the modal |
| AiInformation | nutritionFactsTitle | `NutritionFactsProps['title']` | Yes | - | i18n text for the NutritionFacts title |
| AiInformation | nutritionFactsFeatureName | `NutritionFactsProps['featureName']` | Yes | - | i18n text for the feature name that the NutritionFacts describes |
| AiInformation | nutritionFactsData | `NutritionFactsProps['data']` | Yes | - | i18n text for the "model and data" heading of the NutritionFacts |
| AiInformation | nutritionFactsCloseButtonText | `NutritionFactsProps['closeButtonText']` | Yes | - | i18n text for the NutritionFacts close button |
| AiInformation | nutritionFactsCloseIconButtonScreenReaderLabel | `NutritionFactsProps['closeIconButtonScreenReaderLabel']` | Yes | - | i18n text for the NutritionFacts close iconButton |
| AiInformation | themeOverride | `ThemeOverrideValue` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-instructure
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { AiInformation } from '@instructure/ui-instructure'
```

