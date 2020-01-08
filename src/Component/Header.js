import React from 'react';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';
const HeaderWrapper = styled.div`
     width:100%;
     height:50px;
     display:flex;
     background-color:#ffff;
     align-items:center;
     justify-content:space-between;
     padding-left:20px;
     padding-right:50px;
`
const Header = ({ filterData }) => {
     const changeSearch = (event)=> {
          filterData(event.target.value)
     }
     return(
          <HeaderWrapper>
               <div style ={{fontSize:'25px',fontWeight:'700',color:'orange',fontFamily:'sans-serif'}}>PokeDek</div>
               <Input icon = {{ name: 'search', circular: true, link: true }} onChange={changeSearch}placeholder = 'Search' />        
          </HeaderWrapper>
     )
}
export default Header;
