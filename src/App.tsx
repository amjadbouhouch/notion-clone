import React, { Suspense, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import FallBackSuspense from "./components/FallBackSuspense";
import { AppContext } from "./contexts/AppContext";
import usePages from "./hooks/usePages";
import MainLayout from "./Layout/MainLayout";
import SideBar from "./Layout/SideBar";

function App() {
  const props = usePages();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSideBar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <Suspense fallback={<FallBackSuspense />}>
      <AppContext.Provider value={props}>
        <BrowserRouter>
          <div className="w-screen flex flex-1 h-screen">
            {/* Side bar */}
            <SideBar
              isSidebarOpen={isSidebarOpen}
              toggleSideBar={toggleSideBar}
            />

            <Switch>
              <Route exact path="/">
                <Redirect to={`/${props.pages[0]._id}`} />
              </Route>
              <Route path={`/:id`}>
                {/* Main page header + page content */}
                <MainLayout
                  isSidebarOpen={isSidebarOpen}
                  toggleSideBar={toggleSideBar}
                />
              </Route>
              <Route exact path="/**">
                <Redirect to="/" />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </Suspense>
  );
}

export default App;
