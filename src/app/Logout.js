import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Logout() {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    // You can redirect the user to a specific page after logout if needed
    // Example: router.push('/login');
  };

  return (
    <Button
      color="inherit"
      sx={{ color: "red", backgroundColor: "white", fontWeight: "bold" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
