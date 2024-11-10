import RegisterList from "./components/auth/register/RegisterList";

export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-white h-full text-gray-700 p-8">
      <RegisterList />
    </div>
  );
}
