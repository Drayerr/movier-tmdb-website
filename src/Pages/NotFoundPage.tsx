// import { Container } from './styles'

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>🫤 Sorry... Page not found</h1>
      <Link to={"/"}>
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
