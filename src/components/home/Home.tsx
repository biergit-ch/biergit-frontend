import React, { useState } from 'react';
import { useAuth0 } from '../../auth/auth0-spa';

import { Loading } from '../../common/components/Loading';
import Message from '../message/Message';
import { LandingPage } from '../landing/LandingPage';

const Home: React.FC = () => {
  const { loading, isAuthenticated } = useAuth0();
  const [error] = useState<string | undefined>();

  return (
    <div style={{ height: '100%' }}>
      {error && <Message message={error} />}
      {loading ? <Loading /> : !isAuthenticated && <LandingPage />}
    </div>
  );
};

export default Home;
