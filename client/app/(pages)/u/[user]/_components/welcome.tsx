import React from "react";

export default function Welcome({ name }: { name: string }) {
  return (
    <div>
      <p>Wellcome, {name}</p>
      <p>Let&apos;s get started by creating or joining an Organization</p>
    </div>
  );
}
