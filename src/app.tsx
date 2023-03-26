import { Route, Routes } from 'react-router-dom';
import { DashboardPage, HomePage, TodoPage, NotFoundPage } from 'pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />}>
        <Route path="/todos">
          <Route index element={<TodoPage />} />
        </Route>
      </Route>

      <Route path="/login" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
