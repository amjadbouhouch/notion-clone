import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import FallBackSuspense from "./components/FallBackSuspense";
import { AppContext } from "./contexts/AppContext";
import usePages from "./hooks/usePages";
import Header from "./Layout/Header";
import SideBar from "./Layout/SideBar";
const PageContent = lazy(() => import("./Layout/PageContent"));

function App() {
  const props = usePages();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSideBar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <Suspense fallback={<FallBackSuspense />}>
      <AppContext.Provider value={props}>
        <BrowserRouter>
          <div className="w-screen flex flex-1 h-screen">
            <SideBar
              isSidebarOpen={isSidebarOpen}
              toggleSideBar={toggleSideBar}
            />

            <Switch>
              <Route exact path="/">
                <Redirect to={`/${props.pages[0]._id}`} />
              </Route>
              <Route path={`/:id`}>
                <div className="flex flex-1 flex-col">
                  <Header
                    isSidebarOpen={isSidebarOpen}
                    toggleSideBar={toggleSideBar}
                  />
                  <PageContent />
                </div>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </Suspense>
  );
}

export default App;
