import MenuBar from "./components/layout/MenuBar";
import WorkSpace from "./components/layout/WorkSpase";
import ProjectPicker from "./components/elements/ProjectPicker";
import MenuItemsList from "./components/layout/MenuItemsList";
import Logo from "./components/elements/Logo";

function App() {
  return (
    <div className="grid grid-cols-3+9 h-[100vh] text-gray-500">
      <MenuBar>
        <ProjectPicker>
          {[{ item: "Project1" }, { item: "Project2" }, { item: "Project3" }]}
        </ProjectPicker>
        <MenuItemsList>
          {[
            { item: "Tasks", svg: "src/assets/tasks.svg", qty: 5 },
            {
              item: "Notifications",
              svg: "src/assets/notification.svg",
              qty: 7,
            },
            { item: "Analytics", svg: "src/assets/analytics.svg" },
            { item: "Team", svg: "src/assets/team.svg", qty: 2 },
          ]}
        </MenuItemsList>
        <Logo />
      </MenuBar>
      <WorkSpace />
    </div>
  );
}

export default App;
