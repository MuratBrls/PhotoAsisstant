import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { GearCheck } from './pages/GearCheck';
import { ShootPlanner } from './pages/ShootPlanner';
import { SettingsWizard } from './pages/SettingsWizard';
import { PackList } from './pages/PackList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="gear" element={<GearCheck />} />
          <Route path="planner" element={<ShootPlanner />} />
          <Route path="settings" element={<SettingsWizard />} />
          <Route path="packing" element={<PackList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;