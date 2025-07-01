import React, { useState } from "react";

import { Fab } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import MainCanvas from "../../blocks/MainCanvas/MainCanvas";
import LoadingOverlay from "../../blocks/Overlays/LoadingOverlay";
import PreferencesOverlay from "../../blocks/Overlays/PreferencesOverlay";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <div className="relative w-screen h-screen">
      {loading ? (
        <LoadingOverlay />
      ) : (
        <Fab
          color="primary"
          aria-label="preferences"
          onClick={() => setShowPreferences(true)}
          sx={{
            position: "absolute",
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            backgroundColor: (theme) => theme.palette.common.white,
            color: (theme) => theme.palette.primary.main,
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.grey[100],
            },
          }}
        >
          <SettingsOutlinedIcon />
        </Fab>
      )}

      <MainCanvas onLoaded={() => setLoading(false)} />
      <PreferencesOverlay
        showPreferences={showPreferences}
        setShowPreferences={setShowPreferences}
      />
    </div>
  );
}
