import React, { useState, useEffect } from 'react';

// MUI Components
import Button from '@mui/material/Button';

// Components
import DisplaySubHeader from '../../../components/Display/DisplaySubHeader';
import DisplayModal from '../../../components/Display/DisplayModal';

// Content
import AboutContent from '../../../contents/About.mdx';
import PrivacyPolicyContent from '../../../contents/PrivacyPolicy.mdx';
import CreditsContent from '../../../contents/Credits.mdx';
import LicenseContent from '../../../contents/License.mdx';
import HelpContent from '../../../contents/help.mdx';

export default function AboutTab() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  const handleOpenPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const handleClosePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  const handleOpenCreditsModal = () => {
    setIsCreditsModalOpen(true);
  };

  const handleCloseCreditsModal = () => {
    setIsCreditsModalOpen(false);
  };

  const handleOpenLicenseModal = () => {
    setIsLicenseModalOpen(true);
  };

  const handleCloseLicenseModal = () => {
    setIsLicenseModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center">
        <img
          src="/images/logo-with-text-white.png"
          alt="Logo"
          style={{
            maxWidth: '300px',
            maxHeight: '300px',
            width: '100%',
            height: 'auto'
          }}
        />
      </div>

      <DisplaySubHeader text="About" />
      <div className="prose prose-neutral max-w-none">
        <AboutContent />
      </div>

      <DisplaySubHeader text="Help" className="mt-4" />
      <div className="prose prose-neutral max-w-none">
        <HelpContent />
      </div>

      <DisplaySubHeader text="More Information" className="mt-4" />
      <div className="max-w-none mt-4 flex gap-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenPrivacyModal}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Privacy Policy
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenCreditsModal}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Credits
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenLicenseModal}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          License
        </Button>
      </div>

      {/* Privacy Policy Modal */}
      <DisplayModal
        isOpen={isPrivacyModalOpen}
        onClose={handleClosePrivacyModal}
        title="Privacy Policy"
      >
        <div className="prose prose-neutral max-w-none">
          <PrivacyPolicyContent />
        </div>
      </DisplayModal>

      {/* Credits Modal */}
      <DisplayModal
        isOpen={isCreditsModalOpen}
        onClose={handleCloseCreditsModal}
        title="Credits & Attributions"
      >
        <div className="prose prose-neutral max-w-none">
          <CreditsContent />
        </div>
      </DisplayModal>

      {/* License Modal */}
      <DisplayModal
        isOpen={isLicenseModalOpen}
        onClose={handleCloseLicenseModal}
        title="License Information"
      >
        <div className="prose prose-neutral max-w-none">
          <LicenseContent />
        </div>
      </DisplayModal>

      <div className="prose prose-neutral max-w-none mt-6 text-center font-semibold">
        Made with ❤️ by &nbsp;
        <a href="https://www.stewebb.net" target="_blank" rel="noopener noreferrer">
          Steven Webb
        </a>
      </div>
    </div>
  );
}