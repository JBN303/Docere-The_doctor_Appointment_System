import React, { useContext } from 'react'

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';

import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PreviewIcon from '@mui/icons-material/Preview';


const Patientinterface = () => {

  

  return (
    <div className='sidebar'>
      <div className="top"><Link to="/" style={{textDecoration:"none"}}>
        <span className="logo"><img className='logoofsidebar' src="https://i.ibb.co/GHKbxxD/black-white-nature-logo.png" /></span></Link></div>
<hr/>
      <div className="center">
        <ul>
            <p className="title">MAIN</p>
            <Link to="/home" style={{textDecoration:"none"}}>
            <li>
                <DashboardIcon className='icon'/>
                <span>Dashboard</span>
            </li></Link>
            <p className="title">LISTS</p>
            
            <Link to="/profile" style={{textDecoration:"none"}}>
            <li>
                
                <AccountCircleOutlinedIcon className='icon'/>
                <span>Profile</span>
            </li>
            </Link>
            <Link to="/products" style={{textDecoration:"none"}}>
            <li>
                < AddBusinessIcon className='icon'/>
                <span>Add</span>
            </li>
            </Link>
            <Link to="/users" style={{textDecoration:"none"}}>
            <li>
                
                <PersonOutlineOutlinedIcon className='icon'/>
                <span>Users</span>
            </li>
            </Link>
            <li><Link to="/allproduct" style={{textDecoration:"none"}}>
            <PreviewIcon className='icon'/>
                <span>Products</span></Link>
            </li>
           
{/*            
            <li>
                <AssessmentIcon className='icon'/>
               <span>stats</span>
            </li>
            <li> <NotificationsNoneIcon className='icon'/>
                <span>Notification</span>
            </li>
            <li>
                <LocalShippingIcon className='icon'/>              
                <span>Order</span>
            </li>
            <p className="title">SERVICE</p>
            
            <li>
                
                <TimelineIcon className='icon'/>
                <span>Logs</span>
            </li>
            <li>
                <SettingsOutlinedIcon className='icon'/>
                <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
            <CreditCardIcon className='icon'/>
                <span>Others</span>
            </li> */}
            <li>
                <LogoutOutlinedIcon className='icon'/>
                <span>Logout</span>
            </li>
        </ul>
      </div>
     
    </div>
  )
}

export default Patientinterface