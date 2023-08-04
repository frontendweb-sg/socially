"use client";

import Button from "@/components/controls/Button";

/**
 * Send again
 * @returns
 */
const ResendEmailButton = ({ email }: { email: string }) => {
  const onSend = async () => {
    const response = await fetch(process.env.NEXTAUTH_URL + "/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  };
  return <Button onClick={onSend}>Resend verification email</Button>;
};

export default ResendEmailButton;
