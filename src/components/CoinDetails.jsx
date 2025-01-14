import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import {useParams} from "react-router-dom"
import axios from 'axios';
import { server } from '../main';
import Coincard from './Coincard';
import Error from './Error';
import Chart from './Chart';

const CoinDetails = () => { 

  const [coin, setcoin] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false)
  const [currency, setcurrency] = useState("inr")
  const [days, setdays] = useState("24h")
  const [chartarray, setchartarray] = useState([])

  const currencySymbol= currency=== "inr" ? "₹" : currency==="eur"? "€" : "$";

  const params= useParams();

  useEffect(() => {
    const fetchCoin= async ()=>{
        try {
            const {data} = await axios.get(`${server}/coins/${params.id}`);

            const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
            setcoin(data);
            setchartarray(chartData.prices)
            setloading(false);
        } catch (error) {
            seterror(true);
            setloading(false);
        }
    }
    fetchCoin();

}, [params.id])

if (error) return <Error message={"error while fetching the coins"}/>

  return <Container maxW={"container.xl"}>
    {
      loading ? <Loader/> :
      <>
      <Box w={"full"} borderWidth={1}>
        <Chart arr={chartarray} currency={currencySymbol} days={days}/>
      </Box>



      <RadioGroup value={currency} onChange={setcurrency} p={"4"}>
      <HStack spacing={"4"}>
        <Radio value={"inr"}>INR</Radio>
        <Radio value={"usd"}>USD</Radio>
        <Radio value={"eur"}>EURO</Radio>
      </HStack>
      </RadioGroup>

      <VStack spacing={'4'} p={"16"} alignItems={"flex-start"}>
        <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
          Last Upadated on {Date(coin.market_data.last_updated).split("G")[0]}
        </Text>

        <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"conntainer"} />

        <Stat>
          <StatLabel>{coin.name}</StatLabel>

          <StatNumber>
            {currencySymbol}
            {coin.market_data.current_price[currency]}
          </StatNumber>

          <StatHelpText>
            <StatArrow type= {coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
            {coin.market_data.price_change_percentage_24h}%
          </StatHelpText> 

        </Stat>

        <Badge fontSize={"2*1"} bgColor={"blackAlpha.800"} color={"white"}>
          {`#${coin.market_cap_rank}`}
        </Badge>

        <CustomBar 
           high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
           low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} 
        />

        <Box w={"full"} p="4" >
          <Item title={"Max Supply"} value={coin.market_data.max_supply} />
          <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
          <Item title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
          <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
          <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
        </Box>


      </VStack>
      </>
    }
  </Container>


}

const Item =({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar=({high,low})=>(
  <VStack>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children ={low} colorScheme={"red"}/>
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children ={high} colorScheme={"green"}/>
    </HStack>
  </VStack>
)

export default CoinDetails
