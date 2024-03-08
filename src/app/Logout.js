import { Button } from "@mui/material";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  return (
    <Button
      color="inherit"
      sx={{ color: "red", backgroundColor: "white", fontWeight: "bold" }}
      onClick={() => router.push("/")}
    >
      Logout
    </Button>
  );
}
