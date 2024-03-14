import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Sidebar from "@/components/Sidebar"

describe("Sidebar", () => {
  it("renders a sidebar with plenty of navigation list", () => {
    render(<Sidebar />)

    // Check if specific links are present in the rendered sidebar
    const usersLink = screen.getByText("Users")
    const signInLink = screen.getByText("Sign In")
    const signUpLink = screen.getByText("Sign Up")

    expect(usersLink).toBeInTheDocument()
    expect(signInLink).toBeInTheDocument()
    expect(signUpLink).toBeInTheDocument()
    
  })
})
