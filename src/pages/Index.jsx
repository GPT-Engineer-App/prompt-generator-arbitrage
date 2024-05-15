import React, { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";

const generatePrompt = (tokenPairs) => {
  const promptTemplate = `
  Write a Solidity smart contract that performs arbitrage trading across multiple token pairs between Uniswap v2 and Sushiswap v2. The contract should:
  - Use a flash loan from Balancer to obtain the required funds.
  - Swap tokens on Uniswap v2 and Sushiswap v2 to exploit price differences of at least 2% for each token pair.
  - Ensure that all loans are repaid at the end of the transaction.
  - Transfer any profits to the contract owner.

  The contract should include functions to:
  1. Execute the flash loan.
  2. Perform the token swaps on Uniswap v2 and Sushiswap v2 for each token pair.
  3. Repay the flash loan.
  4. Transfer profits to the owner.

  Here is a sample of the data for the trades:
  {token_data}

  The contract should be optimized for gas efficiency and security.
  `;

  let tokenData = "";
  tokenPairs.forEach((pair) => {
    tokenData += `- Token Pair: ${pair.tokenA}/${pair.tokenB}\n`;
    tokenData += `  - Uniswap v2 price: ${pair.uniswap_price}\n`;
    tokenData += `  - Sushiswap v2 price: ${pair.sushiswap_price}\n`;
  });

  return promptTemplate.replace("{token_data}", tokenData);
};

const Index = () => {
  const [tokenPairs, setTokenPairs] = useState([]);
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [uniswapPrice, setUniswapPrice] = useState("");
  const [sushiswapPrice, setSushiswapPrice] = useState("");
  const toast = useToast();

  const addTokenPair = () => {
    if (tokenA && tokenB && uniswapPrice && sushiswapPrice) {
      setTokenPairs([...tokenPairs, { tokenA, tokenB, uniswap_price: uniswapPrice, sushiswap_price: sushiswapPrice }]);
      setTokenA("");
      setTokenB("");
      setUniswapPrice("");
      setSushiswapPrice("");
      toast({
        title: "Token pair added.",
        description: "Your token pair has been added to the list.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error.",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const generateAndShowPrompt = () => {
    const prompt = generatePrompt(tokenPairs);
    alert(prompt);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Arbitrage Trading Prompt Generator</Text>
        <Box width="100%">
          <Input placeholder="Token A" value={tokenA} onChange={(e) => setTokenA(e.target.value)} mb={2} />
          <Input placeholder="Token B" value={tokenB} onChange={(e) => setTokenB(e.target.value)} mb={2} />
          <Input placeholder="Uniswap v2 price" value={uniswapPrice} onChange={(e) => setUniswapPrice(e.target.value)} mb={2} />
          <Input placeholder="Sushiswap v2 price" value={sushiswapPrice} onChange={(e) => setSushiswapPrice(e.target.value)} mb={2} />
          <Button leftIcon={<FaExchangeAlt />} colorScheme="teal" onClick={addTokenPair} width="100%">
            Add Token Pair
          </Button>
        </Box>
        <Button colorScheme="blue" onClick={generateAndShowPrompt} width="100%">
          Generate Prompt
        </Button>
        <Box width="100%">
          <Text fontSize="lg" mt={4}>
            Token Pairs:
          </Text>
          {tokenPairs.map((pair, index) => (
            <Box key={index} p={2} borderWidth="1px" borderRadius="lg" mb={2}>
              <Text>
                {pair.tokenA}/{pair.tokenB}
              </Text>
              <Text>Uniswap v2 price: {pair.uniswap_price}</Text>
              <Text>Sushiswap v2 price: {pair.sushiswap_price}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
