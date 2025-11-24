import axios from "axios";
import usePromptStore from "../stores/prompt.store";
import { reqGetContentsByPrompt } from "../apis/content";
import useRouteStore from "../stores/route.store";

export default function PromptDetail() {
  const { promptValues, selectPrompt, setPromptValues } = usePromptStore(
    (state) => state
  );
  const { setRoute } = useRouteStore((state) => state);
  return (
    <div style={{ width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
      <div style={{ margin: "16px 0px 16px 0px" }}>
        <span>프롬포트 디테일즈! 프롬포트 결과물들 입니다.</span>
      </div>
      <div style={{ gap: 10, display: "flex" }}>
        <button
          onClick={() => {
            setRoute("updatePrompt");
          }}
        >
          수정
        </button>
        <button
          onClick={async () => {
            const res = await axios.post(
              "https://n8n.imagineline.com/webhook/content/new",
              {
                promptId: selectPrompt.id,
              }
            );

            console.log(res.data);
          }}
        >
          새 값 뽑기
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
          width: "100%",
          boxSizing: "border-box",
          alignItems: "start",
        }}
      >
        {promptValues.map((item, i) => (
          <div
            key={item.id ?? i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              background: "gray",
              padding: 10,
              borderRadius: 8,
              boxSizing: "border-box",

              // ✅ 이게 진짜 중요: grid 아이템이 컨테이너보다 커지지 못하게
              minWidth: 0,
            }}
          >
            <textarea
              readOnly
              value={item.text}
              style={{
                width: "100%",
                minWidth: 0, // ✅ textarea가 셀을 밀어내는 걸 방지
                minHeight: 300,
                boxSizing: "border-box",
                resize: "vertical",
                // ✅ 긴 텍스트 때문에 최소폭 커지는 케이스 방지
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
              onClick={async () => {
                const confirm = window.confirm("복사하시겠습니까?");
                if (confirm) {
                  await navigator.clipboard.writeText(item.text);
                }
              }}
            />

            <span>{item.review}</span>
            <span>{item.createdTime.split("T")[0]}</span>
            {item.judge === "ready" ? (
              <>
                <button
                  onClick={async () => {
                    const confirm =
                      window.confirm("이러면 큐스택에 올라갑니다?");
                    if (confirm) {
                      // 이제 이건 싫다고 airtable에 넣어야함.
                      await axios.post(
                        "https://n8n.imagineline.com/webhook/content/judge",
                        { contentId: item.id, pass: true, reason: "합격" }
                      );
                      const contentValues = await reqGetContentsByPrompt(
                        selectPrompt.promptId
                      );
                      setPromptValues(contentValues);

                      window.alert(`확인~ `);
                    }
                  }}
                  style={{ backgroundColor: "green" }}
                >
                  좋아
                </button>
                <button
                  onClick={async () => {
                    const reason = window.prompt("왜 싫어?");
                    if (reason) {
                      // 이제 이건 싫다고 airtable에 넣어야함.
                      await axios.post(
                        "https://n8n.imagineline.com/webhook/content/judge",
                        { contentId: item.id, pass: false, reason }
                      );
                      const contentValues = await reqGetContentsByPrompt(
                        selectPrompt!.promptId
                      );
                      setPromptValues(contentValues);
                      window.alert(`확인~ `);
                    }
                  }}
                  style={{ backgroundColor: "red" }}
                >
                  싫어
                </button>
              </>
            ) : (
              <div
                style={{
                  backgroundColor:
                    item.judge === "fail" ? "#ff000083" : "#00913ce0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 6,
                  borderRadius: 5,
                }}
              >
                {item.judge === "fail"
                  ? "불합격 : " + item.judegeReason
                  : "합격"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 

*/
