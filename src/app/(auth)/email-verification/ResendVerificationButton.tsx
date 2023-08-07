"use client";

import Button from "@/components/controls/Button";
import { sendMail } from "@/lib/user";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * Send again
 * @returns
 */
const ResendEmailButton = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);
  const onSend = async () => {
    setLoading(true);
    const data = await sendMail(email!);
    if (data) {
      toast.success(data.message);
    }
    setLoading(false);
  };
  return (
    <Button loading={loading} disabled={loading} onClick={onSend}>
      Resend verification email
    </Button>
  );
};

export default ResendEmailButton;
