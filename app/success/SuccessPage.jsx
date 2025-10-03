// app/success/page.jsx
import { Suspense } from "react";
import SuccessPage from "./page";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading your success page...</p>}>
      <SuccessPage />
    </Suspense>
  );
}
