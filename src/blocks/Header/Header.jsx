import React from "react";

import PreferencesTabType from "../../enums/PreferencesTabType";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export function Header({ activeTab, setActiveTab }) {
  const tabEntries = Object.entries(PreferencesTabType);
  const tabIndex = tabEntries.findIndex(([_, value]) => value === activeTab);

  const handleTabChange = (event, newIndex) => {
    setActiveTab(tabEntries[newIndex][1]);
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-300 bg-white ps-2">
      <div style={{ overflowX: 'auto', flex: 1 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ minHeight: 0 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabEntries.map(([key, value], idx) => (
            <Tab
              key={value}
              label={value}
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                minHeight: 0,
                minWidth: 0,
                textTransform: 'none',
              }}
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
}
