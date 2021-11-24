import React from "react";
import Text from "./Text";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../qraphql/queries";

const RepositoryDetails = () => {
  const { id } = useParams();
  const repository = useQuery(GET_REPOSITORY, {variables: { id } });

  if (repository.loading) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <RepositoryItem repository={repository.data.repository} detailed={true} />
  );
};

export default RepositoryDetails;
