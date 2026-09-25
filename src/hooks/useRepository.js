import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_REPOSITORY,
    {
      variables: {
        repositoryId: id,
        first: 3,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading &&
      data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        repositoryId: id,
        first: 3,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;