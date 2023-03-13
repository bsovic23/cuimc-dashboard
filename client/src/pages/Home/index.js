import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_PX } from '../../utils/queries';

import PxList from '../../components/PxList';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PX);
  
  const participants = data?.participants || [];
  console.log(participants);

  return (
    <main>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PxList participants={participants} title="All Participant " />
        )}
      </div>
    </main>
  );
};

export default Home;