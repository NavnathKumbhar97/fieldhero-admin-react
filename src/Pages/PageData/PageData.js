import React from "react";

const pageData = () => {
  
  const data = {
    candidateMaster: {
      page: "candidate-master",
      buttonText: "New",
      pageTitle:"Candidate Master",
      modalTitle:"Add Candidate"
    },
    
    candUploadBatch: {
      page: "candidate-upload-batch",
      buttonText: "Upload",
      pageTitle:"Candidate Upload Batch",
      modalTitle:'Bulk Upload Candidate'

    },
    canVerification: {
      page: "candidate-verification",
      buttonText: "Assign",
      pageTitle:"Candidate Verification",
      
    },
    agentMaster: {
      page: "agent-master",
      buttonText: "New",
      pageTitle:"Agent Master",
      modalTitle:'Add Agent'

    },
    agentPricingTemplate: {
      page: "agent-pricing-template",
      buttonText: "New",
      pageTitle:"Agent Pricing Template",
      modalTitle:'Add Agent Pricing Template'
    },
    adminCanUploadBatch: {
      page: "candidate-upload-batch-admin",
      buttonText: "Upload",
      pageTitle:"Admin - Candidate Upload Batch"
    },
    batchPriority: {
      page: "batch-priority",
      buttonText: "Change",
      pageTitle:"Batch Priority"
    },
    otherIndustyCategory: {
      page: "other-industry-category",
      buttonText: "",
      pageTitle:"Other Industry Category"
    },
    categoryMaster: {
      page: "category",
      buttonText: "New",
      pageTitle:"Category - Master",
      modalTitle:'Add Category'
    },
    companyMaster: {
      page: "company",
      buttonText: "New",
      pageTitle:"Company - Master",
      modalTitle:'Add Company'
    },
    customerMaster: {
      page: "customer",
      buttonText: "New",
      pageTitle:"Customer - Master"
    },
    industyMaster: {
      page: "industry",
      buttonText: "New",
      pageTitle:"Industry - Master",
      modalTitle:'Add Industry'
    },
    roleMaster: {
      page: "role",
      buttonText: "New",
      pageTitle:"Role - Master",
      modalTitle:'Add Role'
    },
    skillsetMaster: {
      page: "skillset",
      buttonText: "New",
      pageTitle:"Skill Set - Master",
      modalTitle:'Add Skill Set'
    },
    subscriptionMaster: {
      page: "subscription",
      buttonText: "New",
      pageTitle:"Subscription",
      modalTitle:'Add Subscription'
    },
    userMaster: {
      page: "user",
      buttonText: "New",
      pageTitle:"User - Master",
      modalTitle:'Add User'
    },
    
  };

  return data;
};

export { pageData };
