import axios from "axios";
import usePromptStore from "../stores/prompt.store";
import { useEffect } from "react";
import useRouteStore from "../stores/route.store";

export default function ProjectList() {
  const { projects, setProjects, setSelectProject } = usePromptStore(
    (state) => state
  );
  const { setRoute } = useRouteStore((state) => state);

  const reqProjects = async () => {
    const res = await axios.get("https://n8n.imagineline.com/webhook/projects");
    console.log(res.data, "뭐 안옴?");
    setProjects(res.data);
  };

  useEffect(() => {
    reqProjects();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: 30,
        gap: 20,
      }}
    >
      <button
        onClick={() => {
          setRoute("newProject");
        }}
      >
        새 프로젝트 생성
      </button>
      {projects.map((item, i) => {
        return (
          <div
            onClick={() => {
              setRoute("main");
              setSelectProject(item);
            }}
            className="card"
            key={i}
            style={{
              display: "flex",
              width: "40vw",
              padding: 15,
              borderRadius: 5,
              backgroundColor: i % 2 === 0 ? "#110e0e" : "#3a3a3add",
            }}
          >
            <span>{item.businessName}</span>
          </div>
        );
      })}
    </div>
  );
}
