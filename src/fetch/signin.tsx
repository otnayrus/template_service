interface FetchSigninProps {
  email: string
  password: string
}

const FetchSignin = async ({
  email,
  password,
}: FetchSigninProps) :Promise<any> => {
  const response = await fetch("http://localhost:8001/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()
  return data
}

export default FetchSignin
