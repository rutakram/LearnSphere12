import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={`https://cdn.dribbble.com/userupload/18025563/file/original-8921532f920ced8a0e45d580cba5c49f.png?resize=400x0`}
      formType="signup"
    />
  )
}

export default Signup