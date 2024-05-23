import { SimpleGrid, Text, Heading, Box, Stack } from "@chakra-ui/react";
import { RecipeCard } from "../components/RecipeCard";
import { data } from "../utils/data";
import { SearchInput } from "../components/SearchInput";
import { useState } from "react";

export const RecipeListPage = ({ clickFn }) => {
  const [searchField, setSearchField] = useState("");

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };
  // Lowercase fix
  const matchedRecipes = data.hits.filter((recipe) => {
    const searchString = searchField.toLowerCase();
    return (
      recipe.recipe.label.toLowerCase().includes(searchString) ||
      recipe.recipe.healthLabels.some((label) =>
        label.toLowerCase().includes(searchString)
      ) ||
      recipe.recipe.dietLabels.some((label) =>
        label.toLowerCase().includes(searchString)
      ) ||
      recipe.recipe.cautions.some((caution) =>
        caution.toLowerCase().includes(searchString)
      )
    );
  });

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" bgColor="blue.500" color="White">
        <Heading>
          <Text textAlign="center" fontWeight={300} fontSize={40} mt={[15, 45]}>
          <strong>Winc Recipe Checker</strong>
          </Text>
          <SearchInput changeFn={handleChange} w={[200, 500]} mt={2} mb={5}/>
        </Heading>
      </Box>
      <SimpleGrid bg="white" columns={{ base: 1, md: 3, lg: 4}}  maxWidth="120%" marginX="auto" >
        {matchedRecipes.map((recipe) => (<RecipeCard key={recipe.recipe.label} recipe={recipe.recipe} clickFn={clickFn}></RecipeCard>))}
      </SimpleGrid>
      <Heading>
        <Text textAlign="center" fontWeight={300} fontSize={15} mt={[15, 55]} mb={[15, 55]}>
          © 2024 <strong>Winc Recipe Checker</strong> 
        </Text>
      </Heading>
    </>
  );
};

/*
<Stack bg="white" columns={{ base: 1, md: 2, lg: 4 }} spacing={3} maxWidth="80%" marginX="auto">
  {matchedRecipes.map((recipe) => (<RecipeCard key={recipe.recipe.label} recipe={recipe.recipe} clickFn={clickFn}></RecipeCard>))}
</Stack>

<SimpleGrid bg="white" columns={{ base: 1, md: 2, lg: 4 }} spacing={3} maxWidth="80%" marginX="auto">
        {matchedRecipes.map((recipe) => (<RecipeCard key={recipe.recipe.label} recipe={recipe.recipe} clickFn={clickFn}></RecipeCard>))}
      </SimpleGrid>

      */