import React,{ useEffect, useState } from 'react';
import './App.css';
import Header from './Component/Header';
import PokeCard from './Component/Card'
import styled from 'styled-components';
import ScrollBar from 'react-scrollbar';
import axios from 'axios';
import { Card ,Radio } from 'semantic-ui-react';

const ContainerWrapper = styled.div`
  width:100%;
  height:90vh;
  display:flex;
  justify-content:space-around;
  flex-direction:row;
`
const FilterContainer = styled.div`
  margin-top:30px;
  width:25%;
  color :  white;
`
const CardContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  padding-top:10px;
  
`
function App() {
  const pokeApi = 'https://pokeapi.co/api/v2/pokemon/';
  const [pokeSnap,setpokeSnap] = useState([]);
  const [pokeSnapSecond,setpokeSnapSecond] = useState([]);
  const [radio,setRadio] = useState('')
  const fetchpoke = async() => {
     var pokeData = await axios.get(pokeApi);
    
     const pokeDatafetchedAll = await Promise.all(pokeData.data.results.map(async(eachData)=>{
      const fetchedData = await axios.get(eachData.url);
      return fetchedData;
        }))
        console.log('full',pokeDatafetchedAll[0].data)
     setpokeSnap(pokeDatafetchedAll)
     setpokeSnapSecond(pokeDatafetchedAll)
  }
  useEffect(()=>{
    fetchpoke()
  },[]);
  const setTextFilter = (textData)=> {
    const SearchList = pokeSnapSecond.filter(({data})=> {
      return data.species.name.indexOf(textData)>-1
    })
    setpokeSnap(SearchList)
  }
  const handleRadio = (e,{value}) => {
    setRadio(value)
    if(value==='Name'){
      const SortByName = pokeSnapSecond.sort((a,b)=>{
        if(a.data.name>b.data.name)return 1;
        if(a.data.name<b.data.name)return -1
      })
      setpokeSnap(SortByName)
    }
    if(value==='Weight'){
      const SortByWeight = pokeSnapSecond.sort((a,b)=>{
        if(a.data.weight>b.data.weight)return 1;
        if(a.data.weight<b.data.weight)return -1
        return 0;
      })
      setpokeSnap(SortByWeight)
    }
    if(value==='Height'){
      const SortByHeight = pokeSnapSecond.sort((a,b)=>{
        if(a.data.height>b.data.height)return 1;
        if(a.data.height<b.data.height)return -1;
        return 0;
      })
      setpokeSnap(SortByHeight)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header filterData= {(data)=>{setTextFilter(data)}}/>
        <ContainerWrapper>
            <FilterContainer>
              <Card>
              <Card.Content>
                  <Card.Header>Filter By </Card.Header>
                </Card.Content>
                <Radio
                    label='Name'
                    name='radioGroup'
                    value='Name'
                    checked={radio==='Name'}
                    onChange={handleRadio}
                />
                <Radio
                    label='Weight'
                    name='radioGroup'
                    value='Weight'
                    checked={radio==='Weight'}
                    onChange={handleRadio}
                />
                <Radio
                    label='Height'
                    name='radioGroup'
                    value='Height'
                    checked={radio==='Height'}
                    onChange={handleRadio}
                />
              </Card>
            </FilterContainer>
            <ScrollBar
                style={{width:"70%"}}
                speed={0.8}
                horizontal={false}
              >
                  <CardContainer>
                     {
                       pokeSnap.map(({data},i)=>{
                          return<PokeCard 
                                key = {i}  
                                pokeImage ={data.sprites.back_default}
                                Name={data.name}
                                Abilities = {data.abilities}
                                Stats = {data.stats}
                                Height = {data.height}
                                Weight = {data.weight}
                                Base_experience = {data.base_experience}
                          />
                       })
                     } 
                  </CardContainer>
              </ScrollBar>
        </ContainerWrapper>
      </header>
    </div>
  );
}

export default App;
