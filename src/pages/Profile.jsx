import Sidebar from "../components/Sidebar";

export default function Profile() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="bg-white p-10 rounded-3xl shadow-sm max-w-3xl">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-4xl font-bold text-purple-700">
              S
            </div>

            <div>
              <h1 className="text-3xl font-bold">Sarah Johnson</h1>
              <p className="text-gray-500">
                sarah@example.com
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-bold text-xl mb-3">Theme</h2>

            <select className="border p-3 rounded-xl">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <button className="bg-red-500 text-white px-6 py-3 rounded-xl">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}