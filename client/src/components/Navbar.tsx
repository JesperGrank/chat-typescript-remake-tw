import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="flex justify-center bg-black p-5 text-skyOrange">
        <ul className="hover:underline hover:text-white">
        <li><Link to="/">HOME</Link></li>
        </ul>
    </nav>
  )
}
