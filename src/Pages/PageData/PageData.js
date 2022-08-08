import React from "react";

const pageData = () => {
  
  const data = {
    candidateMaster: {
      page: "candidate-master",
      buttonText: "New",
      pageTitle:"Candidate Master"
    },
    
    candUploadBatch: {
      page: "candidate-upload-batch",
      buttonText: "Upload",
      pageTitle:"Candidate Upload Batch"
    },
    canVerification: {
      page: "candidate-verification",
      buttonText: "Assign",
      pageTitle:"Candidate Verification"
    },
    agentMaster: {
      page: "agent-master",
      buttonText: "New",
      pageTitle:"Agent Master"
    },
    agentPricingTemplate: {
      page: "agent-pricing-template",
      buttonText: "New",
      pageTitle:"Agent Pricing Template"
    },
    adminCanUploadBatch: {
      page: "candidate-upload-batch-admin",
      buttonText: "Upload",
      pageTitle:"Admin - Candidate Upload Batch"
    },
    categoryMaster: {
      page: "category",
      buttonText: "New",
      pageTitle:"Category - Master"
    },
    companyMaster: {
      page: "company",
      buttonText: "New",
      pageTitle:"Company - Master"
    },
    customerMaster: {
      page: "customer",
      buttonText: "New",
      pageTitle:"Customer - Master"
    },
    industyMaster: {
      page: "industry",
      buttonText: "New",
      pageTitle:"Industry - Master"
    },
    roleMaster: {
      page: "role",
      buttonText: "New",
      pageTitle:"Role - Master"
    },
    skillsetMaster: {
      page: "skillset",
      buttonText: "New",
      pageTitle:"Skill Set - Master"
    },
    subscriptionMaster: {
      page: "subscription",
      buttonText: "New",
      pageTitle:"Subscription"
    },
    userMaster: {
      page: "user",
      buttonText: "New",
      pageTitle:"User - Master"
    },
    
  };

  return data;
};

export { pageData };
