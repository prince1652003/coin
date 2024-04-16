import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../main'
import { Container, HStack, Heading, VStack, Text, Image, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import Error from './Error'
import Coincard from './Coincard'


const Coins = () => {

    const [coins, setcoins] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false)
    const [page, setpage] = useState(1)
    const [currency, setcurrency] = useState("inr")

    const currencySymbol= currency=== "inr" ? "₹" : currency==="eur"? "€" : "$";

    const changePage= (page) => {
      setpage(page);
      setloading(true);
    }

    const btns= new Array(132).fill(1);


    useEffect(() => {
        const fetchCoins= async ()=>{
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setcoins(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                setloading(false);
                
            }
        }
        fetchCoins();
    
    }, [currency,page])

    if (error) return <Error message={"error while fetching the coins"}/>
  

  return <Container maxW={"container.xl"}>
    { loading ? <Loader/> : <>

    <RadioGroup value={currency} onChange={setcurrency} p={"4"}>
      <HStack spacing={"4"}>
        <Radio value={"inr"}>INR</Radio>
        <Radio value={"usd"}>USD</Radio>
        <Radio value={"eur"}>EURO</Radio>
      </HStack>
    </RadioGroup>
    
    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {
            coins.map((i)=>(
                <Coincard 
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
                />
            ))
        }
    </HStack>
    <HStack w={"full"} overflowX={"auto"} p={"8"}>
      {
        btns.map((items,index)=>(
          <Button key={index} bgColor={"blackAlpha.900"} color={'white'} onClick={()=>changePage(index+1)}>{index+1}</Button>
        ))
      }
    </HStack>
    </>}

  </Container>

}

export default Coins
