const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

// ------------------------------------------------------------------------------

export const paths = {
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    patients: {
      root: `${ROOTS.DASHBOARD}/patients`,
    }
  },
};
