import React, { useMemo, useState, useEffect } from "react";

export default function ProfilePage() {
//   Mock user data
  
    const user = {
    name: "Maggie Trebilcock",
    email: "trebim2@rpi.edu",
    cohort: "2023",
    majors: ["Computer Science"],
    minors: "N/A",
    pathway: "Philosophy & Logic",
    semesters: ["SPRING 2025"],
    degreePlans: ["Plan A", "Plan B"],
  };

  return (
    <div className="flex-grow p-6 bg-[#0e291f] text-[#f3efe9] min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: avatar, edit button, friends column */}
        <aside className="col-span-4 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-[#f3efe9] mb-4 shadow-inner" />
          <button className="px-4 py-2 rounded-md bg-[#f3efe9] text-[#0e291f] font-medium mb-6">
            Edit Profile
          </button>

          <div className="w-full mt-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-[#e6e1d9]" />
              <span className="uppercase text-sm tracking-wider text-[#e6e1d9] w-24 text-left">
                my friends
              </span>
            </div>
            <div className="ml-6 mt-4 h-48 border-l border-[#e6e1d9]" />
          </div>
        </aside>

        {/* RIGHT COLUMN: user info, majors, semesters, degree plans */}
        <main className="col-span-8">
          <h1 className="text-4xl font-semibold mb-2">{user.name}</h1>
          <div className="text-sm text-[#c9d9c8] mb-4">
            <div>{user.email}</div>
            <div className="mt-2">Cohort: <span className="font-medium">{user.cohort}</span></div>
          </div>

          <div className="bg-[#0f3a2f] border border-[#154f3f] rounded-md p-4 mb-6 max-w-xl">
            <h3 className="text-sm text-[#bfe3c6] font-semibold mb-2">Major(s):</h3>
            <div className="text-base">{user.majors.join(", ")}</div>
            <div className="text-xs text-[#9ecaa8] mt-1">Systems and Software</div>
          </div>

          <div className="text-sm mb-6 max-w-xl">
            <div>Minor(s): <span className="font-medium">{user.minors}</span></div>
            <div className="mt-2">HASS Pathway: <span className="font-medium">{user.pathway}</span></div>
          </div>

          <section className="mb-6 max-w-2xl">
            <h4 className="text-sm uppercase tracking-wider text-[#d6ead6] font-medium mb-2">My Semesters:</h4>
            <div className="text-xs text-[#bcd6c3] mb-3">{user.semesters[0]}</div>
            <div className="flex items-center gap-3">
              <div className="w-28 h-12 bg-[#f3efe9] rounded-md" />
              <div className="w-28 h-12 bg-[#f3efe9] rounded-md" />
              <div className="w-28 h-12 bg-[#f3efe9] rounded-md" />
              <div className="w-10 h-12 bg-[#f3efe9] rounded-md" />
            </div>
          </section>

          <section className="max-w-2xl">
            <h4 className="text-sm uppercase tracking-wider text-[#d6ead6] font-medium mb-2">My Degree Plans:</h4>
            <div className="flex gap-4">
              <div className="w-36 h-12 bg-[#f3efe9] rounded-md" />
              <div className="w-36 h-12 bg-[#f3efe9] rounded-md" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

