---
describes: DataPermissionLevels
---

This component is made to display specific AI related data in Instructure products.

```js
---
type: example
readonly: true
---
<div>
 <DataPermissionLevels
  title="Data Permission Levels"
  currentFeatureText="Current Feature:"
  currentFeature="Feature name"
  closeIconButtonScreenReaderLabel="Close"
  closeButtonText="Close"
  modalLabel="This is a Data Permission Levels modal"
  triggerText="Data Permission Levels"
  data={[
    {
    level: "LEVEL 1",
    title: "Descriptive Analytics and Research",
    description: "We leverage anonymized aggregate data for detailed analytics to inform model development and product improvements. No AI models are used at this level.",
    highlighted:true
  },
    {
    level: "LEVEL 2",
    title: "AI-Powered Features Without Data Retention",
    description: "We utilize off-the-shelf AI models and customer data as input to provide AI-powered features. No data is used for training this model."
  },
    {
    level: "LEVEL 3",
    title: "AI Customization for Individual Institutions",
    description: "We customize AI solutions tailored to the unique needs and resources of educational institutions. We use customer data to fine-tune data and train AI models that only serve your institution. Your institution’s data only serves them through trained models."
  },
    {
    level: "LEVEL 4",
    title: "Collaborative AI Consortium",
    description: "We established a consortium with educational institutions that shares anonymized data, best practices, and research findings. This fosters collaboration and accelerates the responsible development of AI in education. Specialized AI models are created for better outcomes in education, cost savings, and more."
  },
  ]}

 />
</div>
```
