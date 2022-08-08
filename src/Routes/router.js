import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentDesign from "../Pages/Content/ContentDesign";
import SidebarDesign from "../Container/Drawer/Sidebar/SidebarDesign";
import ForgotPass from "../Pages/ForgotPassword/ForgotPassDesign";
import LoginDesign from "../Pages/Login/LoginDesign";
import TheContent from "../Pages/TheContent/TheContent";
import { pageData } from '../Pages/PageData/PageData'

export default function () {

  let {
    candidateMaster,
    candUploadBatch,
    canVerification,
    agentMaster,
    agentPricingTemplate,
    adminCanUploadBatch,
    categoryMaster,
    companyMaster,
    customerMaster,
    industyMaster,roleMaster,
    skillsetMaster,
    subscriptionMaster,userMaster,batchPriority,otherIndustyCategory
  } = pageData()
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginDesign />}></Route>
        <Route path="/forgotPassword" element={<ForgotPass />}></Route>

        {/* the layout */}
        <Route path="" element={<SidebarDesign />}>
          <Route path="" element={<TheContent/>} />
        
          <Route path="candidate-master" element={<ContentDesign data={candidateMaster}/>}>

          </Route>
          <Route path="candidate-upload-batch" element={<ContentDesign data={candUploadBatch}/>}></Route>
          <Route path="candidate-verification" element={<ContentDesign data={canVerification} />}></Route>
          <Route path="agent-master" element={<ContentDesign data={agentMaster} />}></Route>
          <Route path="agent-pricing-template" element={<ContentDesign data={agentPricingTemplate} />}></Route>

          <Route path="candidate-upload-batch-admin" element={<ContentDesign data={adminCanUploadBatch} />} />
          <Route path="batch-priority" element={<ContentDesign data={batchPriority} />} />
          <Route path="other-industry-category" element={<TheContent />} />
          <Route path="category" element={<ContentDesign data={categoryMaster} />} />
          <Route path="company" element={<ContentDesign data={companyMaster} />} />
          <Route path="customer" element={<ContentDesign data={customerMaster} />} />
          <Route path="industry" element={<ContentDesign data={industyMaster} />} />
          <Route path="role" element={<ContentDesign data={roleMaster} />} />
          <Route path="skillset" element={<ContentDesign data={skillsetMaster} />} />
          <Route path="subscription" element={<ContentDesign data={subscriptionMaster} />} />
          <Route path="user" element={<ContentDesign data={userMaster} />} />
          <Route path="help" element={<TheContent />} />
          <Route path="about" element={<TheContent />} />

        </Route>
      </Routes>
    </Router>
  );
}
