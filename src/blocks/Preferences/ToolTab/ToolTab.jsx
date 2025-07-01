import React, { useState } from 'react';

// MUI Components
import Button from '@mui/material/Button';
import RotateCcwIcon from '@mui/icons-material/RotateLeft';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

// Stores
import useAppearanceStore from '../../../stores/appearanceStore';
import useModelingStore from '../../../stores/modelingStore';
import useEnvironmentStore from '../../../stores/environmentStore';
import useRenderingStore from '../../../stores/renderingStore';

// Components
import DisplaySubHeader from '../../../components/Display/DisplaySubHeader';
import DisplaySectionLabel from '../../../components/Display/DisplaySectionLabel';
import DefaultValue from '../../../contents/DefaultValue.mdx';
import DisplayModal from '../../../components/Display/DisplayModal/DisplayModal';

export default function ToolTab() {
  const { reset: resetAppearance } = useAppearanceStore();
  const { reset: resetModeling } = useModelingStore();
  const { reset: resetEnvironment } = useEnvironmentStore();
  const { reset: resetRendering } = useRenderingStore();

  const [checked, setChecked] = useState({
    all: true,
    appearance: true,
    environment: true,
    modeling: true,
    rendering: true,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [defaultModalOpen, setDefaultModalOpen] = useState(false);

  const handleChange = (event) => {
    const { name, checked: isChecked } = event.target;
    if (name === 'all') {
      setChecked({
        all: isChecked,
        appearance: isChecked,
        environment: isChecked,
        modeling: isChecked,
        rendering: isChecked,
      });
    } else {
      const newChecked = {
        ...checked,
        [name]: isChecked,
      };
      newChecked.all = newChecked.appearance && newChecked.environment && newChecked.modeling && newChecked.rendering;
      setChecked(newChecked);
    }
  };

  const handleResetSelected = (e) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    if (checked.appearance) resetAppearance();
    if (checked.environment) resetEnvironment();
    if (checked.modeling) resetModeling();
    if (checked.rendering) resetRendering();
    setDialogOpen(false);
  };

  return (
    <div>
      <DisplaySubHeader text="Reset Preferences" />
      <DisplaySectionLabel title="Select Preferences to Reset" />

      <div className="bg-white px-4 py-2 rounded-lg mb-3">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={checked.all} onChange={handleChange} name="all" />}
            label={<Typography fontWeight="bold">All</Typography>}
          />
          <FormControlLabel
            control={<Checkbox checked={checked.appearance} onChange={handleChange} name="appearance" />}
            label="Appearance"
          />
          <FormControlLabel
            control={<Checkbox checked={checked.environment} onChange={handleChange} name="environment" />}
            label="Environment"
          />
          <FormControlLabel
            control={<Checkbox checked={checked.modeling} onChange={handleChange} name="modeling" />}
            label="Model and View"
          />
          <FormControlLabel
            control={<Checkbox checked={checked.rendering} onChange={handleChange} name="rendering" />}
            label="Rendering"
          />
        </FormGroup>
      </div>
      <Button
        variant="contained"
        color="primary"
        href="#"
        onClick={handleResetSelected}
        startIcon={<RotateCcwIcon />}
        sx={{
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        Reset Selected
      </Button>

      <Button
        variant="outlined"
        color="primary"
        sx={{
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 'bold',
          ml: 2,
        }}
        onClick={() => setDefaultModalOpen(true)}
      >
        View Default Values
      </Button>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Reset</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reset the selected preferences?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="inherit"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogConfirm}
            color="error"
            variant="contained"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <DisplayModal
        isOpen={defaultModalOpen}
        onClose={() => setDefaultModalOpen(false)}
        title="Default Values"
      >
        <div className="prose prose-neutral max-w-none">
          <DefaultValue />
        </div>
      </DisplayModal>
    </div>
  );
}