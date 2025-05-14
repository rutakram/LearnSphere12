import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={`https://media.istockphoto.com/id/1368151370/photo/user-typing-login-and-password-cyber-security-concept.jpg?s=612x612&w=0&k=20&c=hZ14F6Fa4edYWwg0BduAj0is8gdcORsBBHpQcQbAPKc=`}
      formType="login"
    />
  )
}

export default Login