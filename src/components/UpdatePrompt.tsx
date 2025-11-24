import axios from "axios";
import usePromptStore from "../stores/prompt.store";
import { useEffect, useState } from "react";
import useRouteStore from "../stores/route.store";
import { geminiModels, gptModels } from "../assets/models";

export default function UpdatePrompt() {
  const { selectPrompt, setSelectPrompt } = usePromptStore((state) => state);
  const { goback } = useRouteStore((state) => state);
  const [geminiSelected, setGeminiSelected] = useState(
    geminiModels.includes(selectPrompt.model || "")
      ? selectPrompt.model
      : geminiModels[0]
  );
  const [gptSelected, setGptSelected] = useState(
    gptModels.includes(selectPrompt.model?.toUpperCase() || "")
      ? selectPrompt.model
      : gptModels[0]
  );

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
      <span>새로운 프롬포트 만들기</span>

      <span style={{ fontSize: 24, fontWeight: 700 }}>프롬포트이름</span>
      <input
        onChange={(e) => {
          setSelectPrompt({ name: e.currentTarget.value });
        }}
        type="text"
        placeholder="Threads_테더그로우_비난용"
        defaultValue={selectPrompt.name}
      />

      <div style={{ fontSize: 24, fontWeight: 700 }}>
        LLM : {selectPrompt.llm}
      </div>
      <div style={{ display: "flex", gap: 15 }}>
        <button
          onClick={() => {
            setSelectPrompt({ llm: "GPT" });
          }}
        >
          GPT
        </button>

        {selectPrompt.llm === "GPT" && (
          <select
            value={gptSelected}
            onChange={(e) => {
              const v = e.target.value;
              setGptSelected(v);
              setSelectPrompt({ model: v });
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
            setSelectPrompt({ llm: "GEMINI" });
          }}
          style={{ backgroundColor: "#087ed2" }}
        >
          GEMINI
        </button>
        {selectPrompt.llm === "GEMINI" && (
          <select
            defaultValue={geminiSelected}
            value={geminiSelected}
            onChange={(e) => {
              const v = e.target.value;
              setGeminiSelected(v);
              setSelectPrompt({ model: v });
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

      <div>플랫폼 : {selectPrompt?.platform}</div>
      <div style={{ display: "flex", gap: 15 }}>
        <button
          onClick={() => {
            setSelectPrompt({ platform: "Threads" });
          }}
        >
          Threads
        </button>
        <button
          onClick={() => {
            setSelectPrompt({ platform: "X" });
          }}
        >
          X
        </button>
        <button
          onClick={() => {
            setSelectPrompt({ platform: "Instagram" });
          }}
        >
          Instagram(미지원)
        </button>
        <button
          onClick={() => {
            setSelectPrompt({ platform: "Youtube" });
          }}
        >
          Youtube(미지원)
        </button>
      </div>

      <div>폼타입 : {selectPrompt?.formType}</div>
      <div style={{ display: "flex", gap: 15 }}>
        <button
          style={{ padding: 6 }}
          onClick={() => {
            setSelectPrompt({ formType: "text" });
          }}
        >
          텍스트
        </button>
        <button
          style={{ padding: 6 }}
          onClick={() => {
            setSelectPrompt({ formType: "carousel" });
          }}
        >
          인스타캐러셀(미지원)
        </button>
        <button
          style={{ padding: 6 }}
          onClick={() => {
            setSelectPrompt({ formType: "shortform" });
          }}
        >
          유튜브숏폼(미지원)
        </button>
        <button
          style={{ padding: 6 }}
          onClick={() => {
            setSelectPrompt({ formType: "longform" });
          }}
        >
          유튜브롱폼(미지원)
        </button>
      </div>

      <div>System 프롬포트</div>
      <textarea
        onChange={(e) => {
          setSelectPrompt({ system: e.currentTarget.value });
        }}
        style={{ width: "100%", height: 400 }}
        defaultValue={selectPrompt.system}
      />

      <div>프롬포트</div>
      <textarea
        onChange={(e) => {
          setSelectPrompt({ ask: e.currentTarget.value });
        }}
        style={{ width: "100%", height: 400 }}
        defaultValue={selectPrompt.ask}
      />

      <div>컨텐츠 타입</div>
      <input
        onChange={(e) => {
          setSelectPrompt({ contentType: e.currentTarget.value });
        }}
        type="text"
        placeholder="사자성어 or 속담"
        defaultValue={selectPrompt.contentType}
      />

      <br />
      <br />
      <button
        onClick={async () => {
          const res = await axios.post(
            "https://n8n.imagineline.com/webhook/prompts/update",
            {
              data: { ...selectPrompt, ...(selectPrompt.content ?? []) },
              id: selectPrompt.id,
            }
          );
          setSelectPrompt({ ...res.data.fields });
          goback();
        }}
      >
        발행
      </button>
      <br />
    </div>
  );
}
