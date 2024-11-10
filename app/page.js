import LoginNumber from "./components/auth/login/LoginNumber";
import RegisterNumber from "./components/auth/register/RegisterNumber";

export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-white h-full text-gray-700 p-8">
      <RegisterNumber />
      <LoginNumber />
    </div>
  );
}