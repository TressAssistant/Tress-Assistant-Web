import React, { useState } from "react";

import { Header, SuperHeader } from "../../Header";

import PreferencesTabType from "../../../enums/PreferencesTabType";

import AppearanceTab from "../../Preferences/AppearanceTab/AppearanceTab";
import ModelingTab from "../../Preferences/ModelingTab/ModelingTab";
import EnvironmentTab from "../../Preferences/EnvironmentTab/EnvironmentTab";
import RenderingTab from "../../Preferences/RenderingTab/RenderingTab";
import ToolTab from "../../Preferences/ToolTab";
import AboutTab from "../../Preferences/AboutTab";

export default function PreferencesOverlay({ showPreferences, setShowPreferences }) {
  const [activeTab, setActiveTab] = useState(PreferencesTabType.Appearance);

  const renderTabContent = () => {
    switch (activeTab) {
      case PreferencesTabType.Appearance:
        return <AppearanceTab />;
      case PreferencesTabType.Modeling:
        return <ModelingTab />;
      case PreferencesTabType.Environment:
        return <EnvironmentTab />;
      case PreferencesTabType.Rendering:
        return <RenderingTab />;
      case PreferencesTabType.Tools:
        return <ToolTab />;
      case PreferencesTabType.About:
        return <AboutTab />;
      default:
        return null;
    }
  };

  return (
    <div
      className={[
        "fixed top-0 right-0 h-full",
        "w-full max-w-xs sm:max-w-md",
        "bg-white/90 backdrop-blur-md shadow-lg z-50",
        "transition-transform duration-300",
        showPreferences ? "translate-x-0" : "translate-x-full",
      ].join(" ")}
      style={{ willChange: "transform" }}
    >
      <SuperHeader onClose={() => setShowPreferences(false)} />

      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="px-4 py-4 overflow-y-auto h-[calc(100vh-90px)] outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0">
        {renderTabContent()}
      </div>
    </div>
  );
}
