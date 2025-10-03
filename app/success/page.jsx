// app/success/page.jsx
import { Suspense } from "react";
import SuccessPage from "./SuccessPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading your success page...</p>}>
      <SuccessPage />
    </Suspense>
  );
}
