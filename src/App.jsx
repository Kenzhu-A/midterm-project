import AppRouter from "./routes/AppRouter";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}
