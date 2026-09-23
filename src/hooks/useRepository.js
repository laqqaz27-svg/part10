import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
    },
  });

  return {
    repository: data ? data.repository : undefined,
    loading,
    error,
  };
};

export default useRepository;