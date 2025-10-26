// app/page.tsx - Update home page colors
export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-primary-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            Rx
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to Rule Engine
            </h1>
            <p className="text-primary-600 font-medium">
              NCPDP Pharmacy Routing Management System
            </p>
          </div>
        </div>
        <p className="text-gray-600">
          Manage pharmacy clients and their NCPDP routing rules (BIN, PCN, Group Numbers) efficiently.
        </p>
      </div>
    </div>
  );
}