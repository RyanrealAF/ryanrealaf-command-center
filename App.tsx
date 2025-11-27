import React, { useState } from 'react';
import Layout from './components/Layout';
import Manifesto from './components/Manifesto';
import Protocols from './components/Protocols'; // Assuming this component exists
import Archive from './components/Archive'; // Assuming this component exists
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.MANIFESTO);

  const renderView = () => {
    switch (currentView) {
      case ViewState.MANIFESTO:
        return <Manifesto />;
      case ViewState.PROTOCOLS:
        return <Protocols />;
      case ViewState.ARCHIVE:
        return <Archive />;
      default:
        return <Manifesto />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}