import React from 'react'
import { Toolbar, Box, Typography } from "@mui/material";
import SalesCards from './cards/SalesCards';
import SalesTable from './table/SalesTable';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
export default function Sales() {
    const cardsData = [
        {
          title: "Total Sales",
          amount: "1,20,000",
          bgcolor: "#1976d2",
          icon: <PaidOutlinedIcon sx={{mt:1,color:'blue',fontSize: 22}}/>,
        },
        {
          title: "Paid",
          amount: "500000",
          bgcolor: "#388e3c",
          icon: <GetAppOutlinedIcon sx={{mt:0.6,color: 'green'}}/>,
        },
        {
          title: "Unpaid",
          amount: "12,000",
          bgcolor: "#f57c00",
          icon: <UploadOutlinedIcon sx={{mt:0.8,color:'red'}}/>,
        },
      ];
  return (
    <Box>
        {/* <Box sx={{background: '#fff',marginTop: -9,padding: 1,width: '30%',borderRadius:30}}> */}
        <Typography sx={{color:'#fff',marginTop: -7,fontSize: 32,marginLeft: 3,fontWeight:'bold'}}>Sales</Typography>
        {/* </Box> */}
       
         <Toolbar />
        <SalesCards cardsData={cardsData}/>
        <SalesTable/>
    </Box>
  )
}
