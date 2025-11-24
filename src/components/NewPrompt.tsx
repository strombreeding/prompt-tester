import axios from "axios";
import usePromptStore from "../stores/prompt.store";
import useRouteStore from "../stores/route.store";
import { geminiModels, gptModels } from "../assets/models";
import { useRef, useState } from "react";
import { reqAllPrompt } from "../apis/content";

export default function NewPrompt() {
  const {
    newPropmt,
    setSelectPrompt,
    setNewPrompt,
    selectProject,
    setPrompts,
    systemPromptGuard,
    setSystemPromptGuard,
  } = usePromptStore((state) => state);
  const { goback, setRoute } = useRouteStore((state) => state);
  const [geminiSelected, setGeminiSelected] = useState(geminiModels[0]);
  const [gptSelected, setGptSelected] = useState(gptModels[0]);

  const [promptValue, setPromptValue] = useState("");

  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "column", flex: 1 }}>
      <span style={{ fontSize: 24, fontWeight: 700 }}>프롬포트이름</span>
      <input
        onChange={(e) => {
          setNewPrompt({ name: e.currentTarget.value });
        }}
        type="text"
        placeholder="Threads_테더그로우_비난용"
        value={newPropmt.name}
      />

      <div style={{ fontSize: 24, fontWeight: 700 }}>
        LLM : {newPropmt?.llm}
      </div>
      <div style={{ display: "flex", gap: 15 }}>
        <button
          onClick={() => {
            setNewPrompt({ llm: "GPT", model: gptModels[0].toLowerCase() });
          }}
        >
          GPT
        </button>
        {newPropmt.llm === "GPT" && (
          <select
            value={gptSelected}
            onChange={(e) => {
              const v = e.target.value;
              setGptSelected(v);
              setNewPrompt({ model: v });
            }}
            style={{ padding: 8 }}
          >
            <optgroup label="Gpt">
              {gptModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </optgroup>
          </select>
        )}

        <button
          onClick={() => {
            setNewPrompt({ llm: "GEMINI", model: geminiModels[0] });
          }}
          style={{ backgroundColor: "#087ed2" }}
        >
          GEMINI
        </button>
        {newPropmt.llm === "GEMINI" && (
          <select
            defaultValue={geminiSelected}
            value={geminiSelected}
            onChange={(e) => {
              const v = e.target.value;
              setGeminiSelected(v);
              setNewPrompt({ model: v });
            }}
            style={{ padding: 8 }}
          >
            <optgroup label="Gpt">
              {geminiModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </optgroup>
          </select>
        )}
      </div>

      <div>플랫폼 : {newPropmt?.platform}</div>
      <div style={{ display: "flex", gap: 15 }}>
        <button
          onClick={() => {
            setNewPrompt({ platform: "Threads" });
          }}
        >
          Threads
        </button>
        <button
          onClick={() => {
            setNewPrompt({ platform: "X" });
          }}
        >
          X
        </button>
        <button
          onClick={() => {
            setNewPrompt({ platform: "Instagram" });
          }}
        >
          Instagram(미지원)
        </button>
        <button
          onClick={() => {
            setNewPrompt({ platform: "Youtube" });
          }}
        >
          Youtube(미지원)
        </button>
      </div>

      <div>폼타입 : {newPropmt?.formType}</div>
      <div style={{ display: "flex", gap: 15 }}>
        <button
          style={{ padding: 6 }}
          onClick={() => {
            setNewPrompt({ formType: "text" });
          }}
        >
          텍스트
        </button>
        <button
          style={{ padding: 6 }}
          onClick={() => {
            setNewPrompt({ formType: "carousel" });
          }}
        >
          인스타캐러셀(미지원)
        </button>
        <button
          style={{ padding: 6 }}
          onClick={() => {
            setNewPrompt({ formType: "shortform" });
          }}
        >
          유튜브숏폼(미지원)
        </button>
        <button
          style={{ padding: 6 }}
          onClick={() => {
            setNewPrompt({ formType: "longform" });
          }}
        >
          유튜브롱폼(미지원)
        </button>
      </div>

      <div>Const System 프롬포트</div>
      <textarea
        onChange={(e) => {
          setNewPrompt({ constantSystem: e.currentTarget.value });
        }}
        onFocus={() => {
          if (systemPromptGuard) {
            setSystemPromptGuard(false);
            window.alert(
              "이 프롬프트는 constant 시스템프롬프트입니다. 바꾸시면 곤란하긴해요.."
            );
          }
        }}
        style={{ width: "100%", height: 400 }}
        value={newPropmt.constantSystem}
      />

      <div>System 프롬포트</div>
      <textarea
        onChange={(e) => {
          setNewPrompt({ system: e.currentTarget.value });
        }}
        style={{ width: "100%", height: 400 }}
        value={newPropmt.system}
      />

      <div>프롬포트</div>
      <textarea
        onChange={(e) => {
          setNewPrompt({ ask: e.currentTarget.value });
        }}
        style={{ width: "100%", height: 400 }}
        value={newPropmt.ask}
      />

      <div>컨텐츠 타입</div>
      <input
        onChange={(e) => {
          setNewPrompt({ contentType: e.currentTarget.value });
        }}
        type="text"
        placeholder="사자성어 or 속담"
        value={newPropmt.contentType}
      />

      <br />
      <br />
      <button
        onClick={async () => {
          if (Object.keys(newPropmt).length < 9) {
            return window.alert("다 채워주세요.");
          }
          const res = await axios.post(
            "https://n8n.imagineline.com/webhook/content/new",
            {
              ...newPropmt,
            }
          );
          setPromptValue(JSON.stringify(res.data[0], null, 2));
        }}
      >
        새 값 뽑기
      </button>

      <div>결과</div>
      <textarea
        readOnly
        value={promptValue}
        style={{ width: "100%", minHeight: 400 }}
      />

      <button
        onClick={async () => {
          console.log(Object.keys(newPropmt).length);
          if (Object.keys(newPropmt).length < 9) {
            return window.alert("다 채워주세요.");
          }
          const res = await axios.post(
            "https://n8n.imagineline.com/webhook/prompts/create",
            {
              data: newPropmt,
              businessId: selectProject.id,
            }
          );
          console.log(res.data);
          window.alert("발행완료.");
          setSelectPrompt(res.data.fields);
          goback();
          const res2 = await reqAllPrompt(selectProject.id!);
          setPrompts(res2);
          setRoute("main");
        }}
      >
        프롬포트 DB 저장
      </button>
      <br />
    </div>
  );
}
