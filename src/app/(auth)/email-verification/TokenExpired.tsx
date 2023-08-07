import Typography from "@/components/controls/Typography";
import { FaEnvelope } from "react-icons/fa";
import ResendEmail from "./ResendEmail";

const TokenExpired = () => {
  return (
    <div className="token-expired">
      <div className="email-icon">
        <FaEnvelope size={50} />
      </div>
      <Typography variant="h5">Verification Link expired</Typography>
      <Typography variant="body2">
        Looks like the verification link has expired. not to warry, we can send
        the link agai.
      </Typography>
      <ResendEmail />
    </div>
  );
};

export default TokenExpired;
