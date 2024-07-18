import { createMuiTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';

// Define additional properties
const themeExtension = {
  // Add your new properties here
  palette: {
    primary: {
      main: orange[500], // Change primary color to orange
    },
    // Add more palette overrides if needed
  },
  // You can add more overrides like typography, spacing, etc.
};

// Create a new theme by merging with the default theme
const theme = createMuiTheme({
  ...themeExtension,
});

// Use the theme in your application
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your components */}
    </ThemeProvider>
  );
}
export default theme;