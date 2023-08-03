import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"


export default function LogoutButton() {

    const logout = () => {
        signOut(auth)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        logout()
    }

    return (
        <form onSubmit={handleSubmit}>
            <button style={button} type="submit">
                Logout
            </button>
        </form>
    )
}

// !CSS
const button: React.CSSProperties = {
    padding: "0.5rem",
    background: "none",
    border: "2px solid #fff",
    color: "white",
    fontSize: "1rem",
    backgroundColor: "#000",
    borderRadius: "0.5rem",
    cursor: "pointer",
}