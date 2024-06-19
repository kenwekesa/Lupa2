'use client'

import Container from "../container/Container"
import FooterBottom from "./FooterBottom"
import FooterMiddle from "./FooterMiddle"
import FooterTop from "./FooterTop"

const Footer = () => {
    return (
   
    <div className="footer-main pt-14 pb-2">
        <Container>
        {/* <FooterTop />
        <hr />   */}
        <FooterMiddle /> 
        </Container>
        <div className="text-neutral-700 bg-neutral-700">
            <hr className="border-0 h-[1px] bg-neutral-700"/>
        </div>  
        <Container>
        <FooterBottom />  
        </Container>    
    </div>
    
  )
}

export default Footer