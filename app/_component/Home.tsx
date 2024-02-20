'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateImage from "./CreateImage";

function HomePage() {

return (
    <div className="w-[1120px] mx-auto p-10">
    <Button variant="outline" className="rounded-sm"><Link href="/api/auth/signin">Sign with google</Link></Button>
    <CreateImage/>
  </div>
)
}

export default HomePage