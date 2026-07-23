import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/" element={<h1>Dashboard</h1>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
