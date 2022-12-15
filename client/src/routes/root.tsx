import initialize from 'header/initialize';
import React from 'react';
import { Outlet } from 'react-router-dom';

import SidebarContainer from '../layout/Sidebar';

initialize();

function Root() {
  return (
    <div id="VehicleDemoApp" className="flex flex-row gap-4">
      <SidebarContainer />
      <div id="content">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;