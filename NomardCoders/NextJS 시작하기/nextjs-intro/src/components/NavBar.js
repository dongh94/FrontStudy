"use client"
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NavBar() {
  const pathname = usePathname()
  const router = useRouter();
  console.log(pathname)
  return (
    <nav>
      <Link className={pathname === "/" ? "active" : ""} href="/">
        <span>Home</span>
      </Link>
      <Link className={pathname === "/about" ? "active" : ""} href="/about">
        <span>About Us</span>
      </Link>

      <style jsx global> {`
      
      .active {
        color : yellow;
      }

      nav {
        background-color: tomato;
      }
    `}</style>
    </nav>
    
  )
}