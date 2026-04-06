import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800">
            שלום, {user?.name} 👋
          </h1>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            התנתקות
          </button>
        </div>
        <p className="text-gray-500">הדשבורד בבנייה...</p>
      </div>
    </div>
  );
};

export default Dashboard;
