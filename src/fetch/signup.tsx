interface FetchSignupProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const FetchSignup = async ({
  name,
  email,
  password,
  confirmPassword,
}: FetchSignupProps) :Promise<any> => {
  // check whether password and confirmPassword are the same
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }
  const response = await fetch("http://localhost:8001/users", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()
  return data
}

export default FetchSignup
