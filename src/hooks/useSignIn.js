import { useMutation } from "@apollo/client";
import { GET_AUTHORIZATION } from "../qraphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_AUTHORIZATION);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { credentials: { username, password } } });
    return response;
  };

  return [signIn, result];
};

export default useSignIn;