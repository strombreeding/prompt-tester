import Main from "./components/Main";
import useRouteStore from "./stores/route.store";
import PromptDetail from "./components/PromptDetail";
import NewPrompt from "./components/NewPrompt";
import UpdatePrompt from "./components/UpdatePrompt";
import ProjectList from "./components/ProjectList";
import NewProject from "./components/NewProject";
import usePromptStore from "./stores/prompt.store";

export type Routes =
  | "selectProject"
  | "main"
  | "promptDetail"
  | "promptUpdate"
  | "newPrompt"
  | "newProject"
  | "updatePrompt";

function App() {
  const { route, goback } = useRouteStore((state) => state);
  const { selectProject } = usePromptStore((state) => state);
  console.log(route, "현재라우트");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90vw",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "sticky",
          top: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000000e5",
          padding: 25,
        }}
      >
        <span
          onClick={() => {
            goback();
          }}
          style={{ fontSize: 18, fontWeight: 600 }}
        >
          뒤로
        </span>
        <span style={{ fontSize: 24, fontWeight: 800 }}>
          {selectProject.businessName || "SaaS 가즈앗"}
        </span>
        <span style={{ fontSize: 24, fontWeight: 800 }}></span>
      </div>
      {/* 프로젝트 선택 */}
      {route[route.length - 1] === "selectProject" && (
        <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <ProjectList />
        </div>
      )}

      {/* 프로젝트 생성 */}
      {route[route.length - 1] === "newProject" && (
        <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <NewProject />
        </div>
      )}

      {/* 메인 */}
      {route[route.length - 1] === "main" && (
        <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <NewPrompt />
          <Main />
        </div>
      )}

      {/* 프롬포트 디테일 */}
      {route[route.length - 1] === "promptDetail" && <PromptDetail />}

      {/* new Prompt */}

      {route[route.length - 1] === "newPrompt" && <NewPrompt />}

      {/* update Prompt */}
      {route[route.length - 1] === "updatePrompt" && <UpdatePrompt />}
    </div>
  );
}

export default App;
