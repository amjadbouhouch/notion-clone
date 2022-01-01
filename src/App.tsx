import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AppContext } from "./contexts/AppContext";
import usePages from "./hooks/usePages";
import Header from "./Layout/Header";
import DataBase from "./Layout/DataBase";
import SideBar from "./Layout/SideBar";

function App() {
  const props = usePages();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSideBar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <AppContext.Provider value={props}>
      <BrowserRouter>
        <div className="w-screen flex flex-1 h-screen text-sm">
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
                <Header />

                <DataBase />
              </div>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
