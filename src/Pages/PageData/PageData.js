import React from "react";

const pageData = () => {
  
  const data = {
    candidateMaster: {
      page: "candidate-master",
      buttonText: "",
      pageTitle:"Candidate Master"
    },
    
    candUploadBatch: {
      page: "candidate-upload-batch",
      buttonText: "",
      pageTitle:"Candidate Upload Batch"
    },
    canVerification: {
      page: "candidate-verification",
      buttonText: "",
      pageTitle:"Candidate Verification"
    },
    agentMaster: {
      page: "agent-master",
      buttonText: "",
      pageTitle:"Agent Master"
    },
    agentPricingTemplate: {
      page: "agent-pricing-template",
      buttonText: "",
      pageTitle:"Agent Pricing Template"
    },
    adminCanUploadBatch: {
      page: "candidate-upload-batch-admin",
      buttonText: "",
      pageTitle:"Admin - Candidate Upload Batch"
    },
    
  };

  return data;
};

export { pageData };
