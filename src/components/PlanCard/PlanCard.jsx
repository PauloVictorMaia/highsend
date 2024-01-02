/* eslint-disable react/prop-types */
import { Ring } from "@uiball/loaders";
import { Container, Description, DescriptionContainer, Type, PlanPriceContent, Currency, Price, PerMonth, ActionButton, ResourcesContent } from "./PlanCard.styles"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useState } from "react";

function PlanCard({ type, description, price, action, id, originalType, resources }) {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <Type>{type}</Type>
      <DescriptionContainer>
        <Description>{description}</Description>
      </DescriptionContainer>
      <PlanPriceContent>
        <Currency>R$</Currency>
        <Price>
          {price}
        </Price>
        <PerMonth>/Mês</PerMonth>
      </PlanPriceContent>

      <ActionButton
        onClick={() => {
          setIsLoading(true);
          action(id, originalType).finally(() => setIsLoading(false));
        }}
        disabled={isLoading}>
        {isLoading ? <Ring size={20} color="#fff" /> : `Mudar para ${type}`}
      </ActionButton>

      {
        resources &&
        resources.map((resource, index) => (
          <ResourcesContent key={index}>
            {`${resource}`}
            <DoneAllIcon />
          </ResourcesContent>
        ))
      }
    </Container>
  )
}

export default PlanCard;