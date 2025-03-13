import React from "react";

// You do not have to import this file in anywhere. It's automatically imported byself.
declare module "@mui/material/styles" {
  // You can change "subtitle3" name with that you defined in your "theme.js" named of variant's name.
  interface TypographyVariants {
    navitem: React.CSSProperties;
    caption2: React.CSSProperties;
    caption3: React.CSSProperties;
    textbutton: React.CSSProperties;
  }

  // Allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    navitem?: React.CSSProperties;
    caption2?: React.CSSProperties;
    caption3?: React.CSSProperties;
    textbutton: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    navitem: true;
    caption2: true;
    caption3: true;
    textbutton: true;
  }
}
