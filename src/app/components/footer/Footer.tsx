'use client'

import Container from "../container/Container"
import FooterBottom from "./FooterBottom"
import FooterMiddle from "./FooterMiddle"
import FooterTop from "./FooterTop"

const Footer = () => {
    return (
   
    <div className="text-white footer-main">
        <Container>
        <FooterTop />
        <hr />  
        <FooterMiddle /> 
          <hr />   
        <FooterBottom />  
        </Container>    
    </div>
    
  )
}

export default Footer