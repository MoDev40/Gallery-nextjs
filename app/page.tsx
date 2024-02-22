import { Suspense } from "react";
import Photos from "./_component/Photos";
export default async function Home() {
  return (
    <div className="w-full md:w-[1120px] md:mx-auto p-4 my-10">
      <Suspense>
      <Photos/>
      </Suspense>
    </div>
  );
}
