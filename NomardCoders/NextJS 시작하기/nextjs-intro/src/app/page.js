"use client"

import NavBar from "../components/NavBar"
export default function Home() {
  return (
    <div>
      <NavBar />
      <h1 className="active"> Hello</h1>
      <style jsx> {`
      .active {
        color: tomato;
      }
    `}</style>
    </div>
  );
}