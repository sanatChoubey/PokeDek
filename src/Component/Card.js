import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal,Image,Header,Progress } from 'semantic-ui-react';
import {BeatLoader} from "react-spinners";

const WrapperCard = styled.div`
     background-color:white;
     width:275px;
     height:265px;
     border-radius:10px;
     margin-top:20px;
     margin-right:10px;
     margin-left:10px;
     box-shadow: -12px -12px 9px 0px rgb(255,255,255,0.2),
                    12px 12px 12px 0px rgb(0,0,0);

`
const TitleWrapper = styled.div`
     width:100%;
     margin-top:10px;
     font-size:26px;
     text-align:center;
     font-weight:500;
`
const PokeCard = ({pokeImage,Name,Abilities,Stats,Height,Weight,Base_experience})=>{
     const [modalState,setModalState] = useState(false)
     useEffect(()=>{
     
     },[Name])
     const ShowModalforData= ()=> {
          setModalState(true)
        }
     return (
          <WrapperCard onClick= {ShowModalforData} >
                {pokeImage?<img src = {pokeImage}
                alt='' 
                style={{width:'100%',height:'200px'}}
                />:<div style={{marginTop:'50%',marginLeft:'40%'}}><BeatLoader color={"#123abc"} size={20}/></div>}
               <TitleWrapper>
                    {Name}
               </TitleWrapper>
               <Modal size ={'large'}open ={modalState} onClose={()=>{setModalState(false)}}>
                         <Modal.Header>
                              {Name}     
                         </Modal.Header>
                         <Modal.Content image>
                              <Image wrapped size='medium' src= {pokeImage}/>
                              <Modal.Description>
                              <Header>Detail</Header>
                              <div>
                                   <div style={{width:'550px',display:'flex',flexDirection:'row'}}><h4>Weight</h4> : {Weight}</div>
                                   <div style={{width:'550px',display:'flex',flexDirection:'row'}}><h4>Height</h4> : {Height}</div>
                                   <div style={{width:'550px',display:'flex',flexDirection:'row'}}><h4>base_experience</h4> : {<Progress style={{width:'300px'}}percent={Base_experience} color='purple' progress />}</div>
                                    <div style={{width:'550px',display:'flex',flexDirection:'column'}}><h4>Stats:</h4>  {Stats.map(data=><div>{data.stat.name} <Progress style={{width:'300px'}}percent={data.base_stat}  color='purple'  progress /></div>)}</div>
                                   <div style={{width:'550px',display:'flex',flexDirection:'row'}}><h4>Abilities</h4>:{Abilities.map(data=><div style={{marginRight:"10px"}}>{data.ability.name}</div>)} </div>
                              </div>
                              
                              </Modal.Description>
                         </Modal.Content>
               </Modal>
          </WrapperCard>
     )
}
export default PokeCard;
