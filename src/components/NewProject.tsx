import axios from "axios";
import usePromptStore from "../stores/prompt.store";
import useRouteStore from "../stores/route.store";
import { useState } from "react";

export default function NewProject() {
  const { goback, setRoute } = useRouteStore((state) => state);
  const { setSelectProject } = usePromptStore((state) => state);
  const [projectName, setProjectName] = useState("");

  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "column", flex: 1 }}>
      <span style={{ fontSize: 24, fontWeight: 700 }}>프롬포트이름</span>
      <input
        onChange={(e) => {
          setProjectName(e.currentTarget.value);
        }}
        type="text"
        placeholder="MaPot"
      />

      <br />

      <button
        onClick={async () => {
          const res = await axios.post(
            "https://n8n.imagineline.com/webhook/projects",
            {
              projectName,
            }
          );

          console.log(res.data.id);
          if (res.data.id == null) {
            alert("생성중 오류 발생했네요");
            return;
          }
          setSelectProject({ id: res.data.id });
          goback();
          setRoute("main");
        }}
      >
        생성
      </button>
      <br />
    </div>
  );
}
