import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import AboutUs from './component/common/AboutUs.jsx'
import ContactUs from './component/common/ContactUs.jsx'

import AdminLogin from './component/admin/AdminLogin.jsx'
import Admin from './component/admin/Admin.jsx'
import AdminDashBoard from './component/admin/AdminDashBoard.jsx'
import AllContacts from './component/admin/AllContacts.jsx'

import User from './component/user/User.jsx'
import UserReg from './component/user/UserReg.jsx'
import UserLogin from './component/user/UserLogin.jsx'
import UserDashBoard from './component/user/UserDashBoard.jsx'
import UserFeedback from './component/user/UserFeedback.jsx'
import AllFeedback from './component/user/Allfeedback.jsx'
import Blog from './component/user/Blog.jsx'
import BlogDashboard from './component/user/BlogDashboard.jsx'
import AdminEditProfile from './component/admin/AdminEditProfile.jsx'
import ChangePassword from './component/admin/ChangePassword.jsx'
import UserEditProfile from './component/user/UserEditProfile.jsx'
import UserChangePassword from './component/user/UserChangePassword.jsx'
import ProfileUpload from './component/admin/ProfileUpload.jsx'
import FetchFeedback from './component/common/FetchFeedback.jsx'
import CompetitionNotice from './component/admin/CompetitionNotice.jsx'
import CreativeWriterPage from './component/user/CreativeWriterPage.jsx'
import SearchBlog from './component/user/SearchBlog.jsx'
import ViewCompitition from './component/user/ViewCompitition.jsx';
import Participate from './component/user/Participate.jsx'
import AllCompetition from './component/admin/AllCompetition.jsx'
import ViewAllParticipents from './component/admin/ViewAllParticipents.jsx'
import OurWinners from './component/user/OurWinners.jsx'
import UserAllCompetition from './component/user/UserAllCompetition.jsx'
import UserHelp from './component/user/UserHelp.jsx'
import AdminReg from './component/admin/AdminReg.jsx'



function PathMapper() {

  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='' element={<App />} />

          <Route path='/about' element={<AboutUs />} />

          <Route path="/contact" element={<ContactUs />} />

          <Route path="/admin" element={<AdminLogin />} />

          <Route path="/user" element={<User />} />

          <Route path="/adminpanel" element={<Admin />} />

          <Route path="/register/user" element={<UserReg />} />

          <Route path="/login/user" element={<UserLogin />} />

          <Route path="/user/feedback" element={<UserFeedback />} />

          <Route path="/admindashboard" element={<AdminDashBoard />} />

          <Route path="/userdashboard" element={<UserDashBoard />} />

          <Route path="/allcontacts" element={<AllContacts />} />

          <Route path="/user/allfeedback" element={<AllFeedback />} />

          <Route path="/blog" element={<Blog />} />

          <Route path="/blogDashboard" element={<BlogDashboard />} />

          <Route path="/adminEditProfile" element={<AdminEditProfile />} />

          <Route path="/changepassword" element={<ChangePassword />} />

          <Route path="/user/edit-profile" element={<UserEditProfile />} />

          <Route path="/user/changepassword" element={<UserChangePassword />} />

          <Route path="/profileUpload" element={<ProfileUpload />} />

          <Route path="/fetchFeedback" element={<FetchFeedback />} />

          <Route path="/competitionNotice" element={<CompetitionNotice/>} />

          <Route path="/CreativeWriterPage" element={<CreativeWriterPage />} /> 

          <Route path="/searchBlog" element={<SearchBlog />} />

          <Route path="/viewcompitition" element={<ViewCompitition />} />

          <Route path="/participate" element={<Participate />} />

          <Route path="/allcompetition" element={<AllCompetition />} />

          <Route path="/viewallparticipants" element={<ViewAllParticipents />} />

          <Route path="/user/ourwinners" element={<OurWinners />} />

          <Route path="/user/allCompetition" element={<UserAllCompetition />} />

          <Route path="/userHelp" element={<UserHelp />} />

          <Route path="/adminreg" element={<AdminReg />} />

          

           

          






          

          











          
         


        </Routes>

      </BrowserRouter>
    </>
  )
}

export default PathMapper