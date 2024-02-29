import { Route, Routes } from "react-router-dom";
import Error from "./views/error/error";
import Create from "./views/create/create";
import Detail from "./views/detail/detail";
import Home from "./views/home/home";
import Landing from "./views/landing/landing";
import Activities from "./views/activities/activities";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
