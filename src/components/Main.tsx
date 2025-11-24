import { useEffect } from "react";
import usePromptStore, { type IPrompt } from "../stores/prompt.store";
import { reqAllPrompt } from "../apis/content";
import axios from "axios";

export default function Main() {
  const {
    setNewPrompt,
    setSystemPromptGuard,
    prompts,
    setPrompts,
    selectProject,
  } = usePromptStore((state) => state);

  const reqFirst = async () => {
    const res = await reqAllPrompt(selectProject.id!);
    console.log(res, "읭?");
    setPrompts(res);
  };

  const clickPromptCard = async (prompt: IPrompt) => {
    console.log(prompt, "??");
    setNewPrompt({ ...prompt });
  };

  useEffect(() => {
    console.log("Main 커넥");
    reqFirst();
  }, []);

  return (
    <div
      style={{
        flex: 0.4,
        display: "flex",
        flexDirection: "column",
        gap: 8,

        position: "sticky",
        top: 80, // 상단에서 16px 떨어진 위치에 붙어있기
        alignSelf: "flex-start", // flex 안에서 높이 늘어나는 거 방지
      }}
    >
      <span
        style={{
          display: "flex",
          fontSize: 16,
          fontWeight: 500,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 5,
        }}
      >
        ㅎㅇㅎㅇ! 현재까지 생성한 프롬포트입니다
      </span>

      {prompts &&
        prompts.length > 0 &&
        prompts.map((item, i) => {
          return (
            <div
              className="card"
              onClick={() => {
                clickPromptCard(item);
                setSystemPromptGuard(true);
              }}
              style={{
                backgroundColor: "#131212",
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 4,
                borderRadius: 8,
              }}
              key={i}
            >
              <span>{item.name}</span>
              <button
                onClick={async () => {
                  await axios.delete(
                    "https://n8n.imagineline.com/webhook/projects/prompts",
                    {
                      data: {
                        promptId: item.id,
                      },
                    }
                  );
                  await reqFirst();
                }}
              >
                X
              </button>
              {/* <span>{item.LLM}</span> */}
              {/* <span>{item.Model}</span> */}
              {/* <span>{item.status}</span> */}
              {/* <span>{item.createdTime.split("T")[0]}</span> */}
            </div>
          );
        })}
    </div>
  );
}
