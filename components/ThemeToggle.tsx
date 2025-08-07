'use client';

import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeStore } from '../store/themeStore';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeStore();

  return (
    <Tooltip title={`${mode === 'light' ? 'Koyu' : 'Açık'} temaya geç`}>
      <IconButton onClick={toggleMode} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}
