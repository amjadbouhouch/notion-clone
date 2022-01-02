import React, { Suspense, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import FallBackSuspense from "./components/FallBackSuspense";
import { AppContext } from "./contexts/AppContext";
import MainLayout from "./Layout/MainLayout";
import SideBar from "./Layout/SideBar";
import { Page } from "./types";
import { generatePage } from "./utils";
const FAKE_DATA = Array.from({ length: 10 }).map(generatePage);
function App() {
  const [pages, setPages] = useState<Page[]>(FAKE_DATA);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSideBar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <Suspense fallback={<FallBackSuspense />}>
      <AppContext.Provider value={{ pages }}>
        <BrowserRouter>
          <div className="flex flex-1 w-screen h-screen">
            {/* Side bar */}
            <SideBar
              isSidebarOpen={isSidebarOpen}
              toggleSideBar={toggleSideBar}
            />

            <Switch>
              <Route exact path="/">
                <Redirect to={`/${pages[0]._id}`} />
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
