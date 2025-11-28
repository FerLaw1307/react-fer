import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import TabsExperiment from "../pages/Experiments/Tabs";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="experiments">
            <Route path="tabs" element={<TabsExperiment />} />
            <Route path="tabs/:id" element={<TabsExperiment />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
