"use client";

import { useEffect, useState } from "react";
import { Quicksand } from 'next/font/google';
import Logo from "../../../public/img/home-logo.png";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth";
import HomeVector from "../../../public/img/home-vector.png";
import { IoIosSearch } from "react-icons/io";


const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });

interface Submission {
  id: number;
  name: string;
  email: string;
  occupation: string;
  message: string;
  created_at: string;
}

export default function SubmissionsDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  console.log("Session:", session, "Pending:", isPending);


  useEffect(() => {
    if (!session && !session) {
      router.push("/admin/login");
    }
  }, [session, isPending, router])

  useEffect(() => {
    fetch("/admin/api/submissions")
      .then((r) => r.json())
      .then((data) => { setSubmissions(data); setLoading(false); })
      .catch(() => { setError("Failed to load submissions."); setLoading(false); });
  }, []);

  
  
  if (!session) {
    return null; // or a loading spinner
  }

  if (isPending) {
    return <p className="p-8 text-gray-500">Loading...</p>;
  }
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/admin/login");
  }

  if (loading) return <p className="p-8 text-gray-500">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="relative min-h-screen bg-[#F8F6F5]">
      <Image src={HomeVector} alt="Home Vector" width={300} height={60} className="absolute top-0 left-0 z-0 pointer-events-none" />
      
      <div className="relative z-10 p-8">
      <div className={`${quicksand.className}   `}>
       
        <div className="flex mb-4 gap-3 justify-between ">
          <Image src={Logo} alt="Meisie Logo" width={120} height={120} className="mb-4 z-10" />

          {/* <h1>You are signed in as {<span className="authClient">{session.user.email}</span>}</h1> */}
          <Button onClick={handleSignOut} className="rounded-3xl bg-[#4B2E38] text-[#E9B8B2]">Sign Out</Button>
        </div>

       

        {/* Title centred, search bar pinned to the right */}
        <div className="mb-4 grid grid-cols-3 items-center gap-4">
          {/* Left: empty spacer to balance the search bar */}
          <div />
          {/* Centre: title */}
          <h1 className={`${quicksand.className} text-2xl font-bold text-gray-800 text-center whitespace-nowrap`}>
            Waitlist Submissions <span className="text-gray-400 font-normal">({submissions.length})</span>
          </h1>
          {/* Right: search bar */}
          <div className="flex items-center gap-2 justify-end">
            <IoIosSearch className="text-[#4B2E38]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email..."
              className={`${quicksand.className} w-full max-w-sm border border-gray-300 bg-white rounded-3xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#4B2E38]`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 z-10">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#4B2E38] text-[#E9B8B2] uppercase text-xs tracking-wider z-10">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Occupation</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(() => {
                const filtered = submissions.filter((s) =>
                  s.email.toLowerCase().includes(searchQuery.toLowerCase())
                );
                return filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      {searchQuery ? `No results for "${searchQuery}".` : "No submissions yet."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s.id} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{s.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                      <td className="px-4 py-3 text-gray-600">{s.email}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{s.occupation}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{s.message}</td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                );
              })()}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}