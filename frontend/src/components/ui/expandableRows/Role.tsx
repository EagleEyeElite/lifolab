import React from "react";

export default function Role({ role }: {
  role?: string;
}) {
  if (!role) return null;
  return (
    <span className={`text-sm text-black font-heading`}>
      {role}
    </span>
  );
};
